const currInputPath = paths.adventOfCode + "/2024/inputs/";
console.log(`\n******************\nLoaded 2024/11.js`);
console.log(`******************\n`);

function solve(data) {
  let stones = data.split(" ");
  // console.log({ stones });

  const cache = {};
  let totalSum = 0n;
  const targetIterations = 75;

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

  let sum = solve(data);
  console.log({ sum });
}
solveAdventPuzzle();
