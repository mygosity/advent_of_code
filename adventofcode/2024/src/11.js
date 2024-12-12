const currInputPath = paths.adventOfCode + "/2024/inputs/";
console.log(`\n******************\nLoaded 2024/11.js`);
console.log(`******************\n`);

function solveByTabulationOptimized(data, targetIterations) {
  const stones = data.split(" ");

  let prevDp = new Map();
  for (const stone of stones) {
    prevDp.set(stone, (prevDp.get(stone) || 0n) + 1n);
  }

  for (let i = 0; i < targetIterations; i++) {
    let nextDp = new Map();

    for (const [stoneStr, count] of prevDp.entries()) {
      let nextStates;
      if (stoneStr === "0") {
        nextStates = ["1"];
      } else if (stoneStr.length % 2 === 0) {
        const half = stoneStr.length >> 1;
        let firstPart = stoneStr.substring(0, half);
        let secondPart = stoneStr.substring(half);

        let secondIndex = 0;
        while (
          secondIndex < secondPart.length - 1 &&
          secondPart[secondIndex] === "0"
        ) {
          secondIndex++;
        }
        secondPart = secondPart.substring(secondIndex);

        nextStates = [firstPart, secondPart];
      } else {
        const nextNum = (BigInt(stoneStr) * 2024n).toString();
        nextStates = [nextNum];
      }

      for (const ns of nextStates) {
        nextDp.set(ns, (nextDp.get(ns) || 0n) + count);
      }
    }
    prevDp = nextDp;
  }

  let totalSum = 0n;
  for (const val of prevDp.values()) {
    totalSum += val;
  }

  return totalSum;
}

function solveByTabulation(data, targetIterations) {
  const stones = data.split(" ");

  let dp = [new Map()];
  for (const stone of stones) {
    dp[0].set(stone, (dp[0].get(stone) || 0n) + 1n);
  }

  for (let i = 0; i < targetIterations; i++) {
    dp[i + 1] = new Map();

    for (const [stoneStr, count] of dp[i].entries()) {
      let nextStates;
      if (stoneStr === "0") {
        nextStates = ["1"];
      } else if (stoneStr.length % 2 === 0) {
        const half = stoneStr.length >> 1;
        let firstPart = stoneStr.substring(0, half);
        let secondPart = stoneStr.substring(half);

        let secondIndex = 0;
        while (
          secondIndex < secondPart.length - 1 &&
          secondPart[secondIndex] === "0"
        ) {
          secondIndex++;
        }
        secondPart = secondPart.substring(secondIndex);

        nextStates = [firstPart, secondPart];
      } else {
        const nextNum = (BigInt(stoneStr) * 2024n).toString();
        nextStates = [nextNum];
      }

      for (const ns of nextStates) {
        dp[i + 1].set(ns, (dp[i + 1].get(ns) || 0n) + count);
      }
    }
  }

  let totalSum = 0n;
  for (const val of dp[targetIterations].values()) {
    totalSum += val;
  }

  return totalSum;
}

function solve(data, targetIterations) {
  let stones = data.split(" ");
  // console.log({ stones });

  const cache = {};
  let totalSum = 0n;

  function dfs(stoneStr, i) {
    if (i === targetIterations) {
      return 1n;
    }
    if (cache[stoneStr]?.[i] != null) {
      return cache[stoneStr][i];
    }
    cache[stoneStr] = cache[stoneStr] || {};
    let currSum = 0n;

    if (stoneStr === "0") {
      currSum += dfs("1", i + 1);
    } else if (stoneStr.length % 2 === 0) {
      const firstPart = stoneStr.substring(0, stoneStr.length >> 1);
      let secondPart = stoneStr.substring(stoneStr.length >> 1);
      let secondIndex = 0;
      while (
        secondIndex < secondPart.length - 1 &&
        secondPart[secondIndex] === "0"
      ) {
        secondIndex++;
      }
      secondPart = secondPart.substring(secondIndex);
      currSum += dfs(firstPart, i + 1);
      currSum += dfs(secondPart, i + 1);
    } else {
      const nextNum = (BigInt(stoneStr) * BigInt(2024)).toString();
      currSum += dfs(nextNum, i + 1);
    }
    return (cache[stoneStr][i] = currSum);
  }

  for (const stone of stones) {
    totalSum += dfs(stone, 0);
  }

  return totalSum;
}

async function solveAdventPuzzle() {
  const file = currInputPath + "11.txt";
  const data = fs.readFileSync(file).toString();

  const smallIterations = 25;
  const bigIterations = 75;
  const challengeIterations = 100;
  console.log({
    sumA: solve(data, smallIterations), //runs out of memory at 5003
    sumB: solveByTabulation(data, bigIterations), //runs out of memory at 13666
    sumC: solveByTabulationOptimized(data, challengeIterations), //can solve +50000
  });
}
solveAdventPuzzle();
