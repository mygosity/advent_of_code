const currInputPath = paths.adventOfCode + "/2024/inputs/";
console.log(`\n******************\nLoaded 2024/12.js`);
console.log(`******************\n`);

function solve(data) {
  let sum = 0n;
  return sum;
}

async function solveAdventPuzzle() {
  const file = currInputPath + "12.txt";
  const data = fs.readFileSync(file).toString();

  const lines = data.split("\n");

  for (const line of lines) {
  }

  let sum = solve(data);
  console.log({ sum });
}
solveAdventPuzzle();
