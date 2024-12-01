const currPath = global.root + "/2024/";
console.log(`loaded 2024/02.js`, { global, currPath });

async function solveAdventPuzzle02() {
  const file = currPath + "02.txt";
  const data = fs.readFileSync(file).toString();
  console.log(data);
  const parseAble = data.split("\n");
  console.log({
    len: parseAble.length,
  });

  for (const line of parseAble) {
    const [left, right] = line.split("   ");
    console.log({ left, right });
  }
}
solveAdventPuzzle02();
