const currPath = global.root + "/adventofcode/2024/";
console.log(`\n******************\nLoaded 2024/11.js`);
console.log(`******************\n`);

async function solveAdventPuzzle() {
  const file = currPath + "11.txt";
  const data = fs.readFileSync(file).toString();

  const lines = data.split("\n");

  let possibles = 0n;
  for (const line of lines) {
  }
  console.log({ possibles });
}
solveAdventPuzzle();