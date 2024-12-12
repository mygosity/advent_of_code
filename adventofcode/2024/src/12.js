const currInputPath = paths.adventOfCode + "/2024/inputs/";
console.log(`\n******************\nLoaded 2024/12.js`);
console.log(`******************\n`);

function getSides(marked, directions) {
  let sides = 0;

  const validTileMap = new Set();
  for (const [x, y, directionIndex] of marked) {
    const key = x + "|" + y + "|" + directionIndex;
    validTileMap.add(key);
  }

  const seen = new Set();
  //group all the marked points with the directions included to add up the sides
  for (const [x, y, directionIndex] of marked) {
    const key = x + "|" + y + "|" + directionIndex;
    if (seen.has(key)) continue;

    const stack = [[x, y, directionIndex]];
    const group = new Set();
    while (stack.length) {
      const [cx, cy, di] = stack.pop();
      const key = cx + "|" + cy + "|" + di;
      if (seen.has(key)) continue;
      seen.add(key);
      group.add(key);

      switch (directionIndex) {
        case 0:
        case 2: {
          for (const [dx, dy] of [directions[1], directions[3]]) {
            const nx = dx + cx;
            const ny = dy + cy;
            const nkey = nx + "|" + ny + "|" + di;
            if (!validTileMap.has(nkey)) continue;
            stack.push([nx, ny, di]);
          }
          break;
        }
        case 1:
        case 3: {
          for (const [dx, dy] of [directions[0], directions[2]]) {
            const nx = dx + cx;
            const ny = dy + cy;
            const nkey = nx + "|" + ny + "|" + di;
            if (!validTileMap.has(nkey)) continue;
            stack.push([nx, ny, di]);
          }
          break;
        }
      }
    }
    sides += 1;
  }

  return sides;
}

function solve(grid) {
  let sum = 0n;

  const directions = [
    [0, -1], //0 - up
    [1, 0], //1 - right
    [0, 1], //2 - down
    [-1, 0], //3 - left
  ];

  const v = new Set();
  function getMetrics(x, y, c) {
    const key = x + y * grid[y].length;
    if (v.has(key)) return [0, 0, []];
    v.add(key);

    let perimeter = 0;
    let area = 0;
    const marked = [];

    for (let i = 0; i < directions.length; ++i) {
      const [dx, dy] = directions[i];
      const nx = dx + x;
      const ny = dy + y;
      if (grid[ny]?.[nx] == null || grid[ny][nx] !== c) {
        perimeter++;
        marked.push([x, y, i]);
        continue;
      }
    }

    for (const [dx, dy] of directions) {
      const nx = dx + x;
      const ny = dy + y;
      if (grid[ny]?.[nx] == null || grid[ny][nx] !== c) {
        continue;
      }
      const [nextPerimeter, nextArea, nextMarked] = getMetrics(nx, ny, c);
      perimeter += nextPerimeter;
      area += nextArea;
      marked.push(...nextMarked);
    }
    return [perimeter, area + 1, marked];
  }

  for (let y = 0; y < grid.length; ++y) {
    for (let x = 0; x < grid[y].length; ++x) {
      const key = x + y * grid[y].length;
      if (v.has(key)) continue;
      const [p, a, marked] = getMetrics(x, y, grid[y][x]);
      // console.log({ externalTiles });
      const s = getSides(marked, directions);
      // console.log({ s, p, a, c: grid[y][x] });
      sum += BigInt(s) * BigInt(a);
    }
  }

  return sum;
}

async function solveAdventPuzzle() {
  const file = currInputPath + "12.txt";
  const data = fs.readFileSync(file).toString();

  const lines = data.split("\n");

  const grid = new Array(lines.length);
  let y = 0;
  for (const line of lines) {
    grid[y] = [];
    for (const c of line.split("")) {
      grid[y].push(c);
    }
    y++;
  }

  let sum = solve(grid);
  console.log({
    sum, //
    // sumB: solveB(grid),
  });
}
solveAdventPuzzle();
