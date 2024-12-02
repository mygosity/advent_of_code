const currPath = global.root + "/2024/";
console.log(`loaded 2024/02.js`, { global, currPath });

function isSafe(nums) {
  let prevDiff = null;
  for (let i = 1; i < nums.length; ++i) {
    const diff = nums[i] - nums[i - 1];
    if (Math.abs(diff) > 3 || diff === 0) {
      return false;
    }
    if (prevDiff != null && prevDiff * diff < 0) {
      return false;
    }
    prevDiff = diff;
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

  searching: for (const line of parseAble) {
    const nums = line.split(" ").map((x) => Number(x));
    // The levels are either all increasing or all decreasing.
    // Any two adjacent levels differ by at least one and at most three.
    // console.log({ nums });

    //20 19 21 22 23 24
    //21 27 23 22 21 20
    if (isSafe(nums)) {
      safe++;
    } else {
      //part 2: if we can remove one to make it safe, count it
      for (let i = 0; i < nums.length; ++i) {
        const nextTest = [...nums];
        nextTest.splice(i, 1);
        if (isSafe(nextTest)) {
          safe++;
          continue searching;
        }
      }
    }
  }
  //answers are 252 and 324
  console.log({ safe });
}
solveAdventPuzzle02();
