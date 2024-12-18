const currInputPath = paths.adventOfCode + "/2024/inputs/";
console.log(`\n******************\nLoaded 2024/04.js`);
console.log(`******************\n`);

function findXmas(grid) {
  let total = 0;
  const directions = [
    [0, 1], //right
    [0, -1], //left
    [1, 0], //down
    [-1, 0], //up
    [1, 1], //BR
    [-1, -1], //TL
    [-1, 1], //BL
    [1, -1], //TR
  ];

  function search(x, y, i, [dx, dy]) {
    if (i === 0 && grid[y][x] !== "X") {
      return;
    }
    if (i === 1 && grid[y][x] !== "M") {
      return;
    }
    if (i === 2 && grid[y][x] !== "A") {
      return;
    }
    if (i === 3) {
      if (grid[y][x] === "S") {
        total++;
      }
      return;
    }
    const nx = x + dx;
    const ny = y + dy;
    if (!grid[ny]?.[nx]) return;
    search(nx, ny, i + 1, [dx, dy]);
  }

  for (let y = 0; y < grid.length; ++y) {
    for (let x = 0; x < grid[y].length; ++x) {
      if (grid[y][x] === "X") {
        for (const direction of directions) {
          search(x, y, 0, direction);
        }
      }
    }
  }
  return total;
}

function findMasMas(grid) {
  let total = 0;

  for (let y = 0; y < grid.length; ++y) {
    for (let x = 0; x < grid[y].length; ++x) {
      if (grid[y][x] === "A") {
        //corners just need to be M and S but opposites cannot be the same chr
        const topLeftBottomRight = grid[y - 1]?.[x - 1] + grid[y + 1]?.[x + 1];
        const bottomLeftTopRight = grid[y + 1]?.[x - 1] + grid[y - 1]?.[x + 1];
        const isValidTL =
          topLeftBottomRight === "MS" || topLeftBottomRight === "SM";
        const isValidBL =
          bottomLeftTopRight === "MS" || bottomLeftTopRight === "SM";
        if (isValidBL && isValidTL) {
          total++;
        }
      }
    }
  }
  return total;
}

async function solveAdventPuzzle04() {
  const file = currInputPath + "04.txt";
  const data = fs.readFileSync(file).toString();
  const lines = data.split("\n");

  const grid = new Array(lines.length).fill(0).map(() => []);
  for (let y = 0; y < lines.length; ++y) {
    const line = lines[y];
    for (let x = 0; x < line.length; ++x) {
      grid[y][x] = line[x];
    }
  }

  let totalXmas = findXmas(grid);
  let totalMasMas = findMasMas(grid);

  console.log({ totalXmas, totalMasMas });
}
solveAdventPuzzle04();
