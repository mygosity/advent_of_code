const currPath = global.root + "/2024/";
console.log(`loaded 2024/07.js`, { global, currPath });

async function solveAdventPuzzle() {
  const file = currPath + "07.txt";
  const data = fs.readFileSync(file).toString();
  // console.log(data);
  const parseAble = data.split("\n");

  for (const line of parseAble) {
  }
  console.log({ total, incorrectTotal });
}
solveAdventPuzzle();
