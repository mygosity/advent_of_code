const currPath = global.root + "/2024/";
console.log(`loaded 2024/07.js`, { global, currPath });

async function solveAdventPuzzle() {
  const file = currPath + "15.txt";
  const data = fs.readFileSync(file).toString();

  const lines = data.split("\n");

  let possibles = 0n;
  for (const line of lines) {
  }
  console.log({ possibles });
}
solveAdventPuzzle();
