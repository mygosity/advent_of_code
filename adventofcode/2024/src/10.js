const currInputPath = paths.adventOfCode + "/2024/inputs/";
console.log(`\n******************\nLoaded 2024/10.js`);
console.log(`******************\n`);

function solveCombos(grid) {
  let sum = 0n;

  const directions = [
    [0, 1],
    [0, -1],
    [-1, 0],
    [1, 0],
  ];

  function search(x, y) {
    let v = new Set();
    let ninesFound = 0;
    let q = [[x, y, x + y * grid[0].length + ""]];
    while (q.length) {
      const [x, y] = q.pop();
      if (grid[y][x] === 9) {
        ninesFound++;
        continue;
      }

      for (const [dx, dy] of directions) {
        const nx = dx + x;
        const ny = dy + y;
        if (grid[ny]?.[nx] == null) continue;
        if (grid[ny][nx] !== grid[y][x] + 1) continue;
        q.push([nx, ny]);
      }
    }

    return ninesFound;
  }

  for (let y = 0; y < grid.length; ++y) {
    for (let x = 0; x < grid[y].length; ++x) {
      if (grid[y][x] !== 0) continue;
      sum += BigInt(search(x, y));
    }
  }

  return sum;
}

function solve(grid) {
  let sum = 0n;

  const directions = [
    [0, 1],
    [0, -1],
    [-1, 0],
    [1, 0],
  ];
  function search(x, y) {
    let v = new Set();
    let ninesFound = 0;
    let q = [[x, y]];
    while (q.length) {
      const [x, y] = q.pop();
      const key = x + y * grid[0].length;
      if (v.has(key)) continue;
      v.add(key);

      if (grid[y][x] === 9) {
        ninesFound++;
        continue;
      }

      for (const [dx, dy] of directions) {
        const nx = dx + x;
        const ny = dy + y;
        if (grid[ny]?.[nx] == null) continue;
        if (grid[ny][nx] !== grid[y][x] + 1) continue;
        q.push([nx, ny]);
      }
    }

    return ninesFound;
  }

  for (let y = 0; y < grid.length; ++y) {
    for (let x = 0; x < grid[y].length; ++x) {
      if (grid[y][x] !== 0) continue;
      sum += BigInt(search(x, y));
    }
  }

  return sum;
}

async function solveAdventPuzzle() {
  const file = currInputPath + "10.txt";
  const data = fs.readFileSync(file).toString();

  const lines = data.split("\n");

  const grid = [];
  let y = 0;
  for (const line of lines) {
    grid[y] = [];
    let x = 0;
    for (const valStr of line) {
      const val = parseInt(valStr);
      // console.log({ x, y });
      grid[y][x] = val;
      x++;
    }
    y++;
  }
  const sum = solve(grid);
  const sumB = solveCombos(grid);
  console.log({ sum, sumB });
}
solveAdventPuzzle();
