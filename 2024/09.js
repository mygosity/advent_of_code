const currPath = global.root + "/2024/";
console.log(`\n******************\nLoaded 2024/09.js`);
console.log(`******************\n`);

async function solveAdventPuzzle() {
  const file = currPath + "09.txt";
  const data = fs.readFileSync(file).toString();

  const lines = data.split("\n");

  let possibles = 0n;
  for (const line of lines) {
  }
  console.log({ possibles });
}
solveAdventPuzzle();
