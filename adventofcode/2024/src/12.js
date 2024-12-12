const currInputPath = paths.adventOfCode + "/2024/inputs/";
console.log(`\n******************\nLoaded 2024/12.js`);
console.log(`******************\n`);

function solve(grid) {
  let sum = 0n;

  const directions = [
    [0, 1],
    [0, -1],
    [-1, 0],
    [1, 0],
  ];

  const v = new Set();
  function getMetrics(x, y, c) {
    const key = x + y * grid[y].length;
    if (v.has(key)) return [0, 0];
    v.add(key);

    let sides = 0;
    let perimeter = 0;
    let area = 0;

    for (const [dx, dy] of directions) {
      const nx = dx + x;
      const ny = dy + y;
      if (grid[ny]?.[nx] == null) continue;
      if (grid[ny][nx] !== c) continue;
      sides++;
      const [nextPerimeter, nextArea] = getMetrics(nx, ny, c);
      perimeter += nextPerimeter;
      area += nextArea;
    }
    return [4 - sides + perimeter, area + 1];
  }

  for (let y = 0; y < grid.length; ++y) {
    for (let x = 0; x < grid[y].length; ++x) {
      const key = x + y * grid[y].length;
      if (v.has(key)) continue;
      const [p, a] = getMetrics(x, y, grid[y][x]);
      // console.log({ p, a, c: grid[y][x] });
      sum += BigInt(p) * BigInt(a);
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
  console.log({ sum });
}
solveAdventPuzzle();
