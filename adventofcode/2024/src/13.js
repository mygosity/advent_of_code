const currInputPath = paths.adventOfCode + "/2024/inputs/";
console.log(`\n******************\nLoaded 2024/13.js`);
console.log(`******************\n`);

async function solveAdventPuzzle() {
  const file = currInputPath + "13.txt";
  const data = fs.readFileSync(file).toString();

  const lines = data.split("\n");

  let possibles = 0n;
  for (const line of lines) {
  }
  console.log({ possibles });
}
solveAdventPuzzle();
