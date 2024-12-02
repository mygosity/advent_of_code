const currPath = global.root + "/2024/";
console.log(`loaded 2024/03.js`, { global, currPath });

async function solveAdventPuzzle03() {
  const file = currPath + "03.txt";
  const data = fs.readFileSync(file).toString();
  console.log(data);
  const parseAble = data.split("\n");
  console.log({
    len: parseAble.length,
  });

  searching: for (const line of parseAble) {
    const nums = line.split(" ").map((x) => Number(x));
  }
  //   console.log({ safe });
}
solveAdventPuzzle03();
