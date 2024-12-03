const currPath = global.root + "/2024/";
console.log(`loaded 2024/03.js`, { global, currPath });

function solve(data) {
  let total = 0;
  let enabled = true;

  //for comparison to alt solution
  const matchList = [];
  for (let i = 3; i < data.length; ++i) {
    if (
      data[i] === "(" &&
      data[i - 1] === "l" &&
      data[i - 2] === "u" &&
      data[i - 3] === "m"
    ) {
      //max block next
      const nextBlock = data.substring(i + 1, i + 9);
      if (nextBlock.indexOf(",") === -1 || nextBlock.indexOf(")") === -1) {
        continue;
      }
      const [numbers, random] = nextBlock.split(")");
      const [x, y] = numbers.split(",");
      // console.log({ x, y });
      if (enabled) total += parseInt(x) * parseInt(y);
      matchList.push([parseInt(x), parseInt(y)]);
    } else if (
      data[i] === ")" &&
      data[i - 1] === "(" &&
      data[i - 2] === "o" &&
      data[i - 3] === "d"
    ) {
      enabled = true;
      // console.log("enabled");
    } else if (
      data[i] === ")" &&
      data[i - 1] === "(" &&
      data[i - 2] === "t" &&
      data[i - 3] === "'" &&
      data[i - 4] === "n" &&
      data[i - 5] === "o" &&
      data[i - 6] === "d"
    ) {
      enabled = false;
      // console.log("disabled");
    }
  }
  //a) 166630675
  //b) 93465710
  console.log({ matchList, total });
  return matchList;
}

async function solveAdventPuzzle03() {
  const file = currPath + "03.txt";
  const data = fs.readFileSync(file).toString();
  // console.log(data);
  // const parseAble = data.split("\n");
  // console.log({
  //   len: parseAble.length,
  // });

  const listA = solve(data);
  const listB = solveBetter(data);

  // console.log({ listALen: listA.length, listBLen: listB.length });
  const map = {};
  for (const [x, y] of listA) {
    map[x] = map[x] || {};
    map[x][y] = 1;
  }

  for (const [x, y] of listB) {
    if (!map[x]?.[y]) {
      console.log(`extra value found: mul(${x},${y})`);
    }
  }

  //   console.log({ safe });
}
solveAdventPuzzle03();

function solveBetter(data) {
  const regexpMatchMult = /mul\(\d{1,3},\d{1,3}\)*/g;
  // const matches = data.match(regexpMatchMult);

  const matchList = [];
  while ((match = regexpMatchMult.exec(data)) !== null) {
    // console.log(`Matched: "${match[0]}" at index ${match.index}`);
    matchList.push([match[0], match.index]);
  }

  let doOrNotList = [];
  const regexpMatchDo = /do\(\)*/g;
  while ((match = regexpMatchDo.exec(data)) !== null) {
    // console.log(`Matched: "${match[0]}" at index ${match.index}`);
    doOrNotList.push([match[0], match.index]);
  }

  const regexpMatchDont = /don't\(\)*/g;
  while ((match = regexpMatchDont.exec(data)) !== null) {
    // console.log(`Matched: "${match[0]}" at index ${match.index}`);
    doOrNotList.push([match[0], match.index]);
  }
  doOrNotList = doOrNotList
    .sort(([_, x], [__, y]) => x - y)
    .map(([val, priority]) => [val === "do()", priority]);

  // console.log({ matchList, doOrNotList });
  const comparisonList = [];

  let total = 0;
  let doIndex = 0;
  let shouldAddTotal = true;
  for (const [match, index] of matchList) {
    if (doOrNotList?.[doIndex]?.[1] < index) {
      doIndex++;
      shouldAddTotal = doOrNotList[doIndex]?.[1] === true;
    }
    if (true || shouldAddTotal) {
      const [_, right] = match.split("(");
      const [numbers, __] = right.split(")");
      const [x, y] = numbers.split(",");
      total += parseInt(x) * parseInt(y);
      comparisonList.push([parseInt(x), parseInt(y)]);
    }
  }
  //a) 166630675
  //b) 93465710
  // answer for a) 171309157
  // answer for b) 1167717;
  console.log(`regexp`, { comparisonList, total });
  return comparisonList;
}
