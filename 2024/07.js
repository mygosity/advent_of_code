const currPath = global.root + "/2024/";
console.log(`\n******************\nLoaded 2024/07.js`);
console.log(`******************\n`);

function canEquate(target, nums) {
  const cache = {};

  function dfs(i, val) {
    if (i === nums.length) {
      return val === target;
    }
    const key = i + "|" + val;
    if (cache[key] != null) return cache[key];
    let output = dfs(i + 1, nums[i] * val) || dfs(i + 1, nums[i] + val);
    //concat the rest of the result
    const concatValueInt = parseInt(val.toString() + nums[i].toString());
    output = output || dfs(i + 1, BigInt(concatValueInt));
    return (cache[key] = output);
  }

  return dfs(1, nums[0]);
}

async function solveAdventPuzzle() {
  const file = currPath + "07.txt";
  const data = fs.readFileSync(file).toString();
  const lines = data.split("\n");

  let possibles = 0n;
  for (const line of lines) {
    let [equals, rest] = line.split(":");
    const vals = rest
      .split(" ")
      .filter((x) => !!x)
      .map((x) => BigInt(parseInt(x)));
    equals = BigInt(parseInt(equals));

    if (canEquate(equals, vals)) {
      possibles += equals;
    }
  }
  console.log({ possibles });
}
solveAdventPuzzle();
