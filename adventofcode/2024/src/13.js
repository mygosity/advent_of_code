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
  return [BigInt(ax), BigInt(ay)];
}

function solve(data) {
  let sum = 0n;
  let mathsSum = 0n;

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

  function maths(ax, ay, bx, by, tx, ty) {
    //Cax + Dbx = tx;
    //Cay + Dby = ty;

    //C = (tx - Dbx) / ax
    //C = (ty - Dby) / ay
    //(ty - Dby) / ay = (tx - Dbx) / ax
    //(ty - Dby) * ax = (tx - Dbx) * ay
    //ax * ty - ax * Dby = ay * tx - ay * Dbx
    //ax * ty - ay * tx = ax * Dby - ay * Dbx
    //D(ax * by - ay * bx) = ax * ty - ay * tx;
    //D = (ax * ty - ay * tx) / (ax * by - ay * bx)
    //save this formula

    //isolate C like we did for D
    //D = (tx - Cax) / bx
    //D = (ty - Cay) / by
    //(ty - Cay) / by = (tx - Cax) / bx
    //bx(ty - Cay) = by(tx - Cax)
    //bx * ty - bx * Cay = by * tx - by * Cax
    //bx * ty - by * tx = bx * Cay - by * Cax
    //bx * ty - by * tx = C(ay * bx - ax * by)
    //bx * ty - by * tx = -C(ax * by - ay * bx) //negative flip this so it matches the other denominator
    //-C = (bx * ty - by * tx) / (ax * by - ay * bx)
    //C = by * tx - bx * ty / (ax * by - ay * bx)

    let det = ax * by - ay * bx;
    let C = (tx * by - ty * bx) / det;
    let D = (ax * ty - ay * tx) / det;

    if (C * ax + D * bx > tx || C * ay + D * by > ty) return 0;
    if (C * ax + D * bx !== tx || C * ay + D * by !== ty) {
      //due to rounding error, we still need to use the old solution to find solve the small errors
      const cache = {};
      const remainingSum = dfs(
        cache,
        C * ax + D * bx,
        C * ay + D * by,
        ax,
        ay,
        bx,
        by,
        tx,
        ty
      );
      if (remainingSum === Infinity) return 0;
      return C * 3n + D + BigInt(remainingSum);
    }
    const answer = C * 3n + D;
    return answer;
  }

  for (const puzzleSet of data) {
    let [lineAStr, lineBStr, prizeLocationStr] = puzzleSet;
    const [ax, ay] = extractCoordinates(lineAStr.split(":")[1], "+");
    const [bx, by] = extractCoordinates(lineBStr.split(":")[1], "+");
    let [tx, ty] = extractCoordinates(prizeLocationStr.split(":")[1], "=");
    // 38839n answer without huge number
    // 75200131617108n answer for huge number
    tx += 10000000000000n;
    ty += 10000000000000n;

    // console.log({ ax, ay, bx, by, tx, ty });

    const cache = {};
    // const other = dfs(cache, 0n, 0n, ax, ay, bx, by, tx, ty);
    // sum += BigInt(other === Infinity ? 0 : other);

    const answer = maths(ax, ay, bx, by, tx, ty);
    mathsSum += BigInt(answer === Infinity ? 0 : answer);
    // console.log({ maths: answer, dfs: other });
  }
  console.log({ mathsSum, sum });
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
  const sum = solve(puzzles);
}
solveAdventPuzzle();
