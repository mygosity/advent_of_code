const currInputPath = paths.adventOfCode + "/2024/inputs/";
const fileTargetNumber = 15;
console.log(`\n******************\nLoaded 2024/${fileTargetNumber}.js`);
console.log(`******************\n`);

function print(grid) {
  let o = "";
  for (let y = 0; y < grid.length; ++y) {
    o += grid[y].join("") + "\n";
  }
  console.log(o);
}

function solve(grid, instructions) {
  let sum = 0n;

  let robotPosition = [];
  for (let y = 0; y < grid.length; ++y) {
    for (let x = 0; x < grid[y].length; ++x) {
      if (grid[y][x] === "@") {
        robotPosition = [x, y];
        break;
      }
    }
  }

  function pushWall(dx, dy, wx, wy) {
    const nx = wx + dx;
    const ny = wy + dy;
    if (grid[ny]?.[nx] == null || grid[ny]?.[nx] === "#") return;
    if (grid[ny]?.[nx] === "O") {
      pushWall(dx, dy, nx, ny);
    }
    if (grid[ny]?.[nx] === ".") {
      grid[ny][nx] = "O";
      grid[wy][wx] = ".";
      return;
    }
  }

  function processMove(dx, dy) {
    const [cx, cy] = robotPosition;
    const nx = dx + cx;
    const ny = dy + cy;
    if (grid[ny]?.[nx] == null || grid[ny]?.[nx] === "#") return;

    //handle wall here
    if (grid[ny]?.[nx] === "O") {
      pushWall(dx, dy, nx, ny);
    }

    if (grid[ny]?.[nx] === ".") {
      grid[ny][nx] = "@";
      robotPosition = [nx, ny];
      grid[cy][cx] = ".";
      return;
    }
  }

  for (const i of instructions) {
    switch (i) {
      case "^": {
        processMove(0, -1);
        break;
      }
      case "v": {
        processMove(0, 1);
        break;
      }
      case "<": {
        processMove(-1, 0);
        break;
      }
      case ">": {
        processMove(1, 0);
        break;
      }
    }
  }
  print(grid);
  for (let y = 0; y < grid.length; ++y) {
    for (let x = 0; x < grid[y].length; ++x) {
      if (grid[y][x] === "O") {
        sum += BigInt(y * 100 + x);
      }
    }
  }
  return sum;
}

async function solveAdventPuzzle() {
  const file = currInputPath + fileTargetNumber + ".txt";
  const data = fs.readFileSync(file).toString();

  const lines = data.split("\n");

  const grid = [];
  let y = 0;
  let isMappingGrid = true;
  const instructions = [];
  for (const line of lines) {
    if (line === "") {
      isMappingGrid = false;
      continue;
    }
    if (isMappingGrid) {
      grid[y] = [];
      for (const c of line.split("")) {
        grid[y].push(c);
      }
      y++;
      continue;
    }
    instructions.push(...line.split(""));
  }
  console.log(instructions);

  console.log({ answer: solve(grid, instructions) });
}
solveAdventPuzzle();
