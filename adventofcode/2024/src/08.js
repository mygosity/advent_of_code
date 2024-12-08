const currInputPath = paths.adventOfCode + "/2024/inputs/";
const testOutputPath = paths.testOutputs + "/adventofcode/";
console.log(`\n******************\nLoaded 2024/08.js`);
console.log(`******************\n`);

function printOutput(output, uniquesMap) {
  for (const key in uniquesMap) {
    const keyNum = parseInt(key);
    const x = key % output.length;
    const y = Math.floor(key / output[0].length);
    output[y][x] = "#";
  }

  let testOutputString = "";
  for (let y = 0; y < output.length; ++y) {
    for (let x = 0; x < output[y].length; ++x) {
      testOutputString += output[y][x];
    }
    testOutputString += "\n";
  }
  fs.writeFileSync(testOutputPath + "08.txt", testOutputString);
}

function findAntennas(c, list, grid, uniquesMap) {
  const m = grid.length;
  const n = grid[0].length;

  // sort left to right, bottom to top
  list.sort((x, y) => x[0] - y[0] || x[1] - y[1]);

  for (let i = 0; i < list.length; ++i) {
    for (let j = i + 1; j < list.length; ++j) {
      const [ax, ay] = list[i];
      const [bx, by] = list[j];

      const akey = ax + ay * n;
      const bkey = bx + by * n;
      uniquesMap[akey] = 1;
      uniquesMap[bkey] = 1;

      //this is positive and can be zero
      const xDiff = bx - ax;
      const yDiff = Math.abs(by - ay);

      if (xDiff === 0) {
        const [topX, topY] = by > ay ? list[j] : list[i];
        const [bottomX, bottomY] = by > ay ? list[i] : list[j];
        for (let y = bottomY + yDiff; y < m; ++y) {
          const key = bx + y * n;
          uniquesMap[key] = 1;
        }
        for (let y = topY - yDiff; y >= 0; --y) {
          const key = bx + y * n;
          uniquesMap[key] = 1;
        }
        continue;
      }

      const gradient = (by - ay) / (bx - ax);
      let nextX = bx + xDiff;
      //need to remember that the positive plane is down when graphing y/x unlike the number line
      let nextY = by + (gradient > 0 ? yDiff : -yDiff);

      while (nextX < n && nextX >= 0 && nextY >= 0 && nextY < m) {
        const key = nextX + nextY * n;
        uniquesMap[key] = 1;
        nextX = nextX + xDiff;
        nextY = nextY + (gradient > 0 ? yDiff : -yDiff);
      }

      nextX = ax - xDiff;
      nextY = ay + (gradient > 0 ? -yDiff : yDiff);
      while (nextX < n && nextX >= 0 && nextY >= 0 && nextY < m) {
        const key = nextX + nextY * n;
        uniquesMap[key] = 1;
        nextX = nextX - xDiff;
        nextY = nextY + (gradient > 0 ? -yDiff : yDiff);
      }
    }
  }
  return uniquesMap;
}

function solve(grid) {
  const m = grid.length;
  const n = grid[0].length;

  const groups = {};

  for (let y = 0; y < m; ++y) {
    for (let x = 0; x < n; ++x) {
      const c = grid[y][x];
      if (c === ".") continue;
      groups[c] = groups[c] || [];
      groups[c].push([x, y]);
    }
  }

  // console.log({ groups });
  const uniquesMap = {};
  for (const c in groups) {
    findAntennas(c, groups[c], grid, uniquesMap);
  }

  const testOutput = [];
  for (let y = 0; y < m; ++y) {
    testOutput[y] = [];
    for (let x = 0; x < n; ++x) {
      testOutput[y][x] = grid[y][x];
    }
  }
  // console.log(testOutput);

  printOutput(testOutput, uniquesMap);
  return Object.keys(uniquesMap).length;
}

async function solveAdventPuzzle() {
  const file = currInputPath + "08.txt";
  const data = fs.readFileSync(file).toString();

  const lines = data.split("\n");

  let possibles = 0n;
  const grid = new Array(lines.length).fill(0).map(() => new Array());

  let y = 0;
  for (const line of lines) {
    const nextLine = line.split("");
    for (let x = 0; x < nextLine.length; ++x) {
      grid[y][x] = nextLine[x];
    }
    // console.log({ nextLine });
    ++y;
  }

  const result = solve(grid);
  console.log({ possibles, result });
}
solveAdventPuzzle();
