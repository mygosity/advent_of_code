const currPath = global.root + "/2024/";
console.log(`loaded 2024/06.js`, { global, currPath });

async function solveAdventPuzzle() {
  const file = currPath + "06.txt";
  const data = fs.readFileSync(file).toString();
  // console.log(data);
  const parseAble = data.split("\n");

  const grid = new Array(parseAble.length)
    .fill(0)
    .map(() => new Array().fill("."));

  let y = 0;
  for (const line of parseAble) {
    const nextLine = line.split("");
    for (let x = 0; x < nextLine.length; ++x) {
      const c = nextLine[x];
      grid[y][x] = c;
    }
    y++;
    // console.log(nextLine);
  }
  const v = new Array(grid.length * grid[0].length)
    .fill(0)
    .map(() => new Array(4).fill(0));
  const directions = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
  ];

  const count = new Array(grid.length * grid[0].length).fill(0);

  function search(x, y, directionIndex) {
    let q = [[x, y, directionIndex]];
    while (q.length) {
      const [x, y, directionIndex] = q.pop();

      if (grid[y]?.[x] == null || grid[y]?.[x] === "#") {
        continue;
      }

      const key = x + y * grid[y].length;
      if (v[key][directionIndex]) continue;
      v[key][directionIndex] = 1;
      count[key] = 1;

      for (let i = 0; i <= 3; ++i) {
        const di = (directionIndex + i) % 4;
        const [dx, dy] = directions[di];
        const nx = dx + x;
        const ny = dy + y;
        if (grid[ny]?.[nx] == null) return;
        if (grid[ny][nx] === "#") continue;
        q.push([nx, ny, di]);
        break;
      }
    }
  }

  for (let y = 0; y < grid.length; ++y) {
    for (let x = 0; x < grid[y].length; ++x) {
      if (grid[y][x] === "^") {
        grid[y][x] = ".";
        search(x, y, 0);
        break;
      }
    }
  }
  console.log({ vsize: count.reduce((p, c) => p + c, 0) });
}
solveAdventPuzzle();
