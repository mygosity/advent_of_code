const currPath = global.root + "/2024/";
console.log(`loaded 2024/06.js`, { global, currPath });

function testPath(grid, sx, sy, directionIndex) {
  const v = new Array(grid.length)
    .fill(0)
    .map(() =>
      new Array(grid[0].length).fill(0).map(() => new Array(4).fill(0))
    );

  const directions = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
  ];

  let q = [[sx, sy, directionIndex]];
  while (q.length) {
    const [x, y, directionIndex] = q.pop();

    if (v[y][x][directionIndex]) {
      return true;
    }
    v[y][x][directionIndex] = 1;

    for (let i = 0; i <= 3; ++i) {
      const di = (directionIndex + i) % 4;
      const [dx, dy] = directions[di];
      const nx = dx + x;
      const ny = dy + y;
      if (grid[ny]?.[nx] == null) {
        return false;
      }
      if (grid[ny][nx] === "#") {
        continue;
      }
      q.push([nx, ny, di]);
      break;
    }
  }
  return false;
}

function constructVisitedAndCompleteGrid(grid) {
  const v = new Array(grid.length * grid[0].length)
    .fill(0)
    .map(() => new Array(4).fill(0));

  const directions = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
  ];

  const visitedMap = new Array(grid[0].length)
    .fill(0)
    .map(() => new Array(grid.length).fill(0));

  function search(sx, sy, directionIndex) {
    let q = [[sx, sy, directionIndex, [0]]];
    while (q.length) {
      const [x, y, directionIndex] = q.pop();

      if (grid[y]?.[x] == null || grid[y]?.[x] === "#") {
        continue;
      }

      const key = x + y * grid[y].length;
      if (v[key][directionIndex]) {
        continue;
      }
      v[key][directionIndex] = 1;
      visitedMap[y][x] = 1;

      for (let i = 0; i <= 3; ++i) {
        const di = (directionIndex + i) % 4;
        const [dx, dy] = directions[di];
        const nx = dx + x;
        const ny = dy + y;
        if (grid[ny]?.[nx] == null) return;
        if (grid[ny][nx] === "#") {
          continue;
        }

        q.push([nx, ny, di]);
        break;
      }
    }
  }

  let guardPosition = [];
  for (let y = 0; y < grid.length; ++y) {
    for (let x = 0; x < grid[y].length; ++x) {
      if (grid[y][x] === "^") {
        grid[y][x] = ".";
        search(x, y, 0);
        guardPosition = [x, y];
        break;
      }
    }
  }
  return { visitedMap, guardPosition };
}

function solveGrid(grid) {
  const {
    visitedMap,
    guardPosition: [gx, gy],
  } = constructVisitedAndCompleteGrid(grid);
  let timeLoops = 0;
  let size = 0;

  for (let y = 0; y < visitedMap.length; ++y) {
    for (let x = 0; x < visitedMap[y].length; ++x) {
      if (visitedMap[y][x] === 0) continue;
      size++;
      if (x === gx && y === gy) {
        continue;
      }
      grid[y][x] = "#";
      if (testPath(grid, gx, gy, 0)) {
        timeLoops++;
      }
      grid[y][x] = ".";
    }
  }
  console.log({ size, timeLoops });
}

async function solveAdventPuzzle() {
  const file = currPath + "06.txt";
  const data = fs.readFileSync(file).toString();
  const lines = data.split("\n");

  const grid = new Array(lines.length).fill(0).map(() => new Array().fill("."));

  let y = 0;
  for (const line of lines) {
    const nextLine = line.split("");
    for (let x = 0; x < nextLine.length; ++x) {
      const c = nextLine[x];
      grid[y][x] = c;
    }
    y++;
  }
  solveGrid(grid);
}

solveAdventPuzzle();
