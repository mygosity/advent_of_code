const currPath = global.root + "/2024/";
console.log(`\n******************\nLoaded 2024/03.js`);
console.log(`******************\n`);

function solve(data) {
  let aTotal = 0;
  let bTotal = 0;
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
      aTotal += parseInt(x) * parseInt(y);
      if (enabled) bTotal += parseInt(x) * parseInt(y);
      matchList.push([parseInt(x), parseInt(y)]);
    } else if (
      data[i] === ")" &&
      data[i - 1] === "(" &&
      data[i - 2] === "o" &&
      data[i - 3] === "d"
    ) {
      enabled = true;
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
    }
  }
  //a) 166630675
  //b) 93465710
  console.log(`bruteF`, { aTotal, bTotal });
  return matchList;
}

async function solveAdventPuzzle03() {
  const file = currPath + "03.txt";
  const data = fs.readFileSync(file).toString();

  const listA = solve(data);
  const listB = solveWithRegexp(data);

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
}
solveAdventPuzzle03();

function solveWithRegexp(data) {
  const regexpMatchMult = /mul\(\d{1,3},\d{1,3}\)/g;
  // const matches = data.match(regexpMatchMult);

  const matchList = [];
  while ((match = regexpMatchMult.exec(data)) !== null) {
    // console.log(`Matched: "${match[0]}" at index ${match.index}`);
    matchList.push([match[0], match.index]);
  }

  let doOrNotList = [];
  const regexpMatchDo = /do\(\)/g;
  while ((match = regexpMatchDo.exec(data)) !== null) {
    // console.log(`Matched: "${match[0]}" at index ${match.index}`);
    doOrNotList.push([match[0], match.index]);
  }

  const regexpMatchDont = /don't\(\)/g;
  while ((match = regexpMatchDont.exec(data)) !== null) {
    // console.log(`Matched: "${match[0]}" at index ${match.index}`);
    doOrNotList.push([match[0], match.index]);
  }

  doOrNotList = doOrNotList
    .sort(([_, x], [__, y]) => x - y)
    .map(([val, index]) => {
      return {
        should: val === "do()",
        index,
      };
    });

  const comparisonList = [];

  let aTotal = 0;
  let bTotal = 0;
  let listIndex = 0;
  let shouldAddTotal = true;

  for (const [match, index] of matchList) {
    while (
      listIndex < doOrNotList.length &&
      doOrNotList[listIndex].index < index
    ) {
      shouldAddTotal = doOrNotList[listIndex].should;
      listIndex++;
    }

    const [_, right] = match.split("mul(");
    const [numbers, __] = right.split(")");
    const [x, y] = numbers.split(",");
    aTotal += parseInt(x) * parseInt(y);

    if (shouldAddTotal) {
      bTotal += parseInt(x) * parseInt(y);
      comparisonList.push([parseInt(x), parseInt(y)]);
    }
  }
  //a) 166630675
  //b) 93465710
  // answer for a) 166630675
  // answer for b) 91744951;
  console.log(`regexp`, { aTotal, bTotal });
  return comparisonList;
}
