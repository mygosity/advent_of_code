const currInputPath = paths.adventOfCode + "/2024/inputs/";
const fileTargetNumber = 20;
console.log(`\n******************\nLoaded 2024/${fileTargetNumber}.js`);
console.log(`******************\n`);

function solve(data) {
  let sum = 0n;
  return sum;
}

async function solveAdventPuzzle() {
  const file = currInputPath + fileTargetNumber + ".txt";
  const data = fs.readFileSync(file).toString();

  const lines = data.split("\n");

  for (const line of lines) {
  }

  const sum = solve(data);
  console.log({ sum });
}
solveAdventPuzzle();
