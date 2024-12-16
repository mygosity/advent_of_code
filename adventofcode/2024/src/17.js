const currInputPath = paths.adventOfCode + "/2024/inputs/";
const fileTargetNumber = 17;
console.log(`\n******************\nLoaded 2024/${fileTargetNumber}.js`);
console.log(`******************\n`);

function print(grid) {
  let o = "";
  for (let y = 0; y < grid.length; ++y) {
    o += grid[y].join("") + "\n";
  }
  console.log(o);
}

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
