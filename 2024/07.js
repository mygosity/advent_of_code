const currPath = global.root + "/2024/";
console.log(`loaded 2024/07.js`, { global, currPath });

function canEquate(target, nums) {
  // console.log(nums);
  const cache = {};
  function test(i, val) {
    if (i === nums.length) {
      // console.log({ target, val });
      return val === target;
    }
    const key = i + "|" + val;
    if (cache[key] != null) return cache[key];
    let output = test(i + 1, nums[i] * val) || test(i + 1, nums[i] + val);
    //concat the rest of the result
    const concatValueInt = parseInt(val.toString() + nums[i].toString());
    if (!isNaN(concatValueInt)) {
      // console.log({ concatValueInt, i, nums, val, target });
      output = output || test(i + 1, BigInt(concatValueInt));
    }
    return (cache[key] = output);
  }
  return test(1, nums[0]);
}

async function solveAdventPuzzle() {
  const file = currPath + "07.txt";
  const data = fs.readFileSync(file).toString();
  // console.log(data);
  const parseAble = data.split("\n");

  let possibles = 0n;
  for (const line of parseAble) {
    let [equals, rest] = line.split(":");
    const vals = rest
      .split(" ")
      .filter((x) => !!x)
      .map((x) => BigInt(parseInt(x)));
    equals = BigInt(parseInt(equals));

    // console.log({ equals, vals });
    if (canEquate(equals, vals)) {
      // console.log(equals);
      possibles += equals;
    }
    // break;
  }
  console.log({ possibles });
}
solveAdventPuzzle();
