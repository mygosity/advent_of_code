const currInputPath = paths.adventOfCode + "/2024/inputs/";
const fileTargetNumber = 14;
console.log(`\n******************\nLoaded 2024/${fileTargetNumber}.js`);
console.log(`******************\n`);

function autoWrap(value, maxLen) {
  return value >= 0 ? value % maxLen : ((value % maxLen) + maxLen) % maxLen;
}

function print(grid, time) {
  let line = "";
  for (let y = 0; y < grid.length; ++y) {
    line += grid[y].join("") + "\n";
  }
  console.log(line, { time });
  // fs.writeFileSync("problem14|" + time + "robotsim.txt", line);
}

function solve(data) {
  const height = 103;
  const width = 101;

  const middleVertical = Math.floor(height / 2);
  const middleHorizontal = Math.floor(width / 2);

  console.log({
    middleVertical,
    middleHorizontal,
  });

  let topLeft = 0;
  let topRight = 0;
  let bottomLeft = 0;
  let bottomRight = 0;

  for (let timeElapsed = 1; timeElapsed <= 10000; ++timeElapsed) {
    const grid = new Array(height)
      .fill(0)
      .map(() => new Array(width).fill("_"));

    let shouldPrint = false;

    for (const [px, py, vx, vy] of data) {
      const nx = autoWrap(px + vx * timeElapsed, width);
      const ny = autoWrap(py + vy * timeElapsed, height);
      // console.log({ px, py, vx, vy, nx, ny });
      grid[ny][nx] = "R";
      if (timeElapsed === 100) {
        if (nx === middleHorizontal || ny === middleVertical) continue;
        if (nx < middleHorizontal && ny < middleVertical) {
          topLeft++;
          continue;
        }
        if (nx > middleHorizontal && ny < middleVertical) {
          topRight++;
          continue;
        }
        if (nx < middleHorizontal && ny > middleVertical) {
          bottomLeft++;
          continue;
        }
        if (nx > middleHorizontal && ny > middleVertical) {
          bottomRight++;
          continue;
        }
      }
    }
    let maxConnection = 0;
    let searches = 0;
    let v = new Set();

    const directions = [
      [0, -1], //up
      [0, 1], //down
      [-1, 0], //left
      [1, 0], //right
      [-1, -1], //top left
      [1, -1], //top right
      [1, 1], //bottom right
      [-1, 1], //bottom left
    ];

    function search(x, y) {
      let sum = 0;
      const stack = [[x, y]];
      while (stack.length) {
        const [cx, cy] = stack.pop();
        if (grid[cy][cx] !== "R") continue;

        const ckey = cx + cy * width;
        if (v.has(ckey)) continue;
        v.add(ckey);
        sum++;
        for (const [dx, dy] of directions) {
          const nx = dx + cx;
          const ny = dy + cy;
          if (grid[ny]?.[nx] !== "R") continue;
          stack.push([nx, ny]);
        }
      }
      return sum;
    }

    for (let y = 0; y < height; ++y) {
      for (let x = 0; x < width; ++x) {
        const key = x + y * width;
        if (v.has(key)) continue;
        searches++;
        maxConnection = Math.max(maxConnection, search(x, y));
      }
    }

    // console.log({ maxConnection, searches });

    //used a graph search to determine if there is a likely event of a tree appearing
    shouldPrint = maxConnection > 100;
    //7572
    if (shouldPrint) print(grid, timeElapsed);
  }

  console.log({
    topLeft,
    topRight,
    bottomLeft,
    bottomRight,
    total: data.length,
  });

  //221616000n
  const sum = BigInt(
    BigInt(topLeft) *
      BigInt(topRight) *
      BigInt(bottomLeft) *
      BigInt(bottomRight)
  );
  return sum;
}

async function solveAdventPuzzle() {
  const file = currInputPath + fileTargetNumber + ".txt";
  const data = fs.readFileSync(file).toString();

  const lines = data.split("\n");

  const robots = [];
  for (const line of lines) {
    const [positionString, velocityString] = line.split(" ");
    const [_p, position] = positionString.split("=");
    const [px, py] = position.split(",").map((x) => parseInt(x));

    const [_v, velocity] = velocityString.split("=");
    const [vx, vy] = velocity.split(",").map((x) => parseInt(x));
    // console.log({ px, py, vx, vy });
    robots.push([px, py, vx, vy]);
  }

  const sum = solve(robots);
  console.log({ sum });
}
solveAdventPuzzle();
