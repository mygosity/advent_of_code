const currPath = global.root + "/2024/";
console.log(`loaded 2024/02.js`, { global, currPath });

function isSafe(nums) {
  let diff = nums[1] - nums[0];
  if (Math.abs(diff) > 3 || diff === 0) {
    return false;
  }
  for (let i = 2; i < nums.length; ++i) {
    const nextDiff = nums[i] - nums[i - 1];
    if (
      (nextDiff > 0 && diff < 0) ||
      (diff > 0 && nextDiff < 0) ||
      nextDiff === 0
    ) {
      return false;
    }
    if (Math.abs(nextDiff) > 3) return false;
  }
  return true;
}

async function solveAdventPuzzle02() {
  const file = currPath + "02.txt";
  const data = fs.readFileSync(file).toString();
  console.log(data);
  const parseAble = data.split("\n");
  console.log({
    len: parseAble.length,
  });

  let safe = 0;
  const specialList = [];

  for (const line of parseAble) {
    const nums = line.split(" ").map((x) => Number(x));
    // The levels are either all increasing or all decreasing.
    // Any two adjacent levels differ by at least one and at most three.
    // console.log({ nums });
    if (isSafe(nums)) {
      safe++;
    } else {
      specialList.push(nums);
    }
  }

  for (const nums of specialList) {
    for (let i = 0; i < nums.length; ++i) {
      const next = [...nums];
      next.splice(i, 1);
      if (isSafe(next)) {
        safe++;
        break;
      }
    }
  }
  console.log({ safe, len: specialList.length });
}
solveAdventPuzzle02();
