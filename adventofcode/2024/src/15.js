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

function solveB(grid, instructions) {
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

  //always check from left side of brackets vertically
  function isVerticallyAllowed(dx, dy, wx, wy) {
    const nx = wx + dx;
    const ny = wy + dy;
    const ox = wx + 1; //always choose the left side of this wall before invoking

    let canMove = true;
    const abovePart1 = grid[ny]?.[nx];
    const abovePart2 = grid[ny]?.[ox];
    if (abovePart1 == null || abovePart1 === "#") return false;
    if (abovePart2 == null || abovePart2 === "#") return false;
    if (abovePart1 === "." && abovePart2 === ".") return true;

    if (abovePart1 === "]") {
      canMove = canMove && isVerticallyAllowed(dx, dy, nx - 1, ny);
    }
    if (abovePart1 === "[") {
      canMove = canMove && isVerticallyAllowed(dx, dy, nx, ny);
    }
    if (abovePart2 === "[") {
      canMove = canMove && isVerticallyAllowed(dx, dy, ox, ny);
    }
    return canMove;
  }

  function pushWall(dx, dy, wx, wy) {
    const currentPart = grid[wy][wx];
    if (currentPart !== "[" && currentPart !== "]") return;

    if (dy === 0) {
      const nx = wx + dx * 2;
      const ny = wy + dy * 2;
      if (grid[ny]?.[nx] == null || grid[ny]?.[nx] === "#") return;
      if (grid[ny]?.[nx] === "[" || grid[ny]?.[nx] === "]") {
        pushWall(dx, dy, nx, ny);
      }
      if (grid[ny]?.[nx] === ".") {
        const backPart = grid[wy + dy][wx + dx];
        grid[ny][nx] = backPart;
        grid[wy + dy][wx + dx] = currentPart;
        grid[wy][wx] = ".";
        return;
      }
      return;
    }

    //handling up/down
    //a check elsewhere will make sure this can move
    const nx = wx + dx;
    const ny = wy + dy;

    const ox = currentPart === "[" ? nx + 1 : nx - 1;
    const verticalPart1 = grid[ny]?.[nx];
    const verticalPart2 = grid[ny]?.[ox];
    if (verticalPart1 == null || verticalPart1 === "#") return;
    if (verticalPart2 == null || verticalPart2 === "#") return;

    if (verticalPart1 === "[" || verticalPart1 === "]") {
      pushWall(dx, dy, nx, ny);
    }

    if (verticalPart2 === "[" || verticalPart2 === "]") {
      pushWall(dx, dy, ox, ny);
    }

    if (grid[ny]?.[nx] === ".") {
      grid[ny][nx] = currentPart;
      grid[ny][ox] = currentPart === "[" ? "]" : "[";
      grid[wy][wx] = ".";
      grid[wy][ox] = ".";
    }
  }

  function processMove(dx, dy) {
    const [cx, cy] = robotPosition;
    let nx = dx + cx;
    const ny = dy + cy;

    if (grid[ny]?.[nx] == null || grid[ny]?.[nx] === "#") return;

    //handle wall here
    if (grid[ny]?.[nx] === "[" || grid[ny]?.[nx] === "]") {
      if (dy === 0) {
        pushWall(dx, dy, nx, ny);
      } else {
        //  [] case 1 (straight vertical)
        //  []
        // [][] case 2 (jagged vertical)
        //  []
        if (
          isVerticallyAllowed(dx, dy, grid[ny]?.[nx] === "]" ? nx - 1 : nx, ny)
        ) {
          pushWall(dx, dy, nx, ny);
        }
      }
    }
    if (grid[ny]?.[nx] === ".") {
      grid[ny][nx] = "@";
      robotPosition = [nx, ny];
      grid[cy][cx] = ".";
      return;
    }
  }

  let count = 0;
  for (const i of instructions) {
    // if (count++ > 10000) break;
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
    // console.log({ i, count });
    // print(grid);
  }
  for (let y = 0; y < grid.length; ++y) {
    for (let x = 0; x < grid[y].length; ++x) {
      if (grid[y][x] === "[" && grid[y][x + 1] === "]") {
        sum += BigInt(y * 100 + x);
      }
    }
  }
  return sum;
}

function solveA(grid, instructions) {
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

  const gridA = [];
  const gridB = [];
  let y = 0;
  let isMappingGrid = true;
  const instructions = [];
  for (const line of lines) {
    if (line === "") {
      isMappingGrid = false;
      continue;
    }
    if (isMappingGrid) {
      gridA[y] = [];
      gridB[y] = [];
      for (const c of line.split("")) {
        gridA[y].push(c);
        if (c === "@") {
          gridB[y].push(c);
          gridB[y].push(".");
          continue;
        }
        if (c === "O") {
          gridB[y].push("[");
          gridB[y].push("]");
          continue;
        }
        gridB[y].push(c);
        gridB[y].push(c);
      }
      y++;
      continue;
    }
    instructions.push(...line.split(""));
  }
  // console.log(instructions);
  // part a = 1568399, part b = 1575877
  console.log({
    answerA: solveA(gridA, instructions),
    answerB: solveB(gridB, instructions),
  });
}
solveAdventPuzzle();
