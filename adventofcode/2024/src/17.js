const currInputPath = paths.adventOfCode + "/2024/inputs/";
console.log(`\n******************\nLoaded 2024/17.js`);
console.log(`******************\n`);

async function solveAdventPuzzle() {
  const file = currInputPath + "17.txt";
  const data = fs.readFileSync(file).toString();

  const lines = data.split("\n");

  for (const line of lines) {
  }

  let sum = 0n;
  console.log({ sum });
}
solveAdventPuzzle();
