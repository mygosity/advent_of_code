const currPath = global.root + "/2024/";
console.log(`loaded 2024/12.js`, { global, currPath });

async function solveAdventPuzzle() {
  const file = currPath + "12.txt";
  const data = fs.readFileSync(file).toString();
  // console.log(data);
  const parseAble = data.split("\n");

  let possibles = 0n;
  for (const line of parseAble) {
    // let [equals, rest] = line.split(":");
    // break;
  }
  console.log({ possibles });
}
solveAdventPuzzle();
