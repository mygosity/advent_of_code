const currInputPath = paths.adventOfCode + "/2024/inputs/";
const fileTargetNumber = 13;
console.log(`\n******************\nLoaded 2024/${fileTargetNumber}.js`);
console.log(`******************\n`);

function extractCoordinates(line, char) {
  const [axSet, aySet] = line.split(",");
  const [_a, axStr] = axSet.split(char);
  const [__a, ayStr] = aySet.split(char);
  const ax = parseInt(axStr);
  const ay = parseInt(ayStr);
  return [ax, ay];
}

function solve(data) {
  let sum = 0n;

  function dfs(cache, x, y, ax, ay, bx, by, tx, ty) {
    if (x > tx && y > ty) {
      return Infinity;
    }
    if (x === tx && y === ty) {
      return 0;
    }
    const key = x + "|" + y;
    if (cache[key] != null) {
      return cache[key];
    }
    const cost = Math.min(
      3 + dfs(cache, x + ax, y + ay, ax, ay, bx, by, tx, ty),
      1 + dfs(cache, x + bx, y + by, ax, ay, bx, by, tx, ty)
    );
    return (cache[key] = cost);
  }

  for (const puzzleSet of data) {
    let [lineAStr, lineBStr, prizeLocationStr] = puzzleSet;
    const [ax, ay] = extractCoordinates(lineAStr.split(":")[1], "+");
    const [bx, by] = extractCoordinates(lineBStr.split(":")[1], "+");
    const [tx, ty] = extractCoordinates(prizeLocationStr.split(":")[1], "=");

    // console.log({ ax, ay, bx, by, tx, ty });

    const cache = {};
    const answer = dfs(cache, 0, 0, ax, ay, bx, by, tx, ty);
    sum += BigInt(answer === Infinity ? 0 : answer);
  }

  return sum;
}

async function solveAdventPuzzle() {
  const file = currInputPath + fileTargetNumber + ".txt";
  const data = fs.readFileSync(file).toString();

  const lines = data.split("\n");

  const puzzles = [];
  let puzzleIndex = 0;
  for (const line of lines) {
    puzzles[puzzleIndex] = puzzles[puzzleIndex] || [];
    if (line === "") {
      puzzleIndex++;
      continue;
    }
    puzzles[puzzleIndex].push(line);
  }
  // console.log(puzzles);

  const sum = solve(puzzles);
  console.log({ sum });
}
solveAdventPuzzle();
