const currPath = global.root + "/2024/";
console.log(`loaded 2024/04.js`, { global, currPath });

async function solveAdventPuzzle04() {
  const file = currPath + "04.txt";
  const data = fs.readFileSync(file).toString();
  // console.log(data);
  // const parseAble = data.split("\n");
}
solveAdventPuzzle04();
