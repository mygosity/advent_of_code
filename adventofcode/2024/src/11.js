const currInputPath = paths.adventOfCode + "/2024/inputs/";
console.log(`\n******************\nLoaded 2024/11.js`);
console.log(`******************\n`);

function solve(data) {
  let stones = data.split(" ");
  console.log({ stones });

  for (let i = 0; i < 25; ++i) {
    let nextSet = [];
    for (const stoneStr of stones) {
      // console.log({ stoneStr });

      if (stoneStr === "0") {
        nextSet.push("1");
        continue;
      }

      if (stoneStr.length % 2 === 0) {
        const firstPart = stoneStr.substring(0, stoneStr.length >> 1);
        let secondPart = stoneStr.substring(stoneStr.length >> 1);
        let secondIndex = 0;
        while (
          secondIndex < secondPart.length - 1 &&
          secondPart[secondIndex] === "0"
        ) {
          secondIndex++;
        }
        secondPart = secondPart.substring(secondIndex);
        // console.log({ firstPart, secondPart });
        nextSet.push(firstPart, secondPart);
        continue;
      }

      const nextNum = (BigInt(stoneStr) * BigInt(2024)).toString();
      nextSet.push(nextNum);
    }
    stones = nextSet;
    console.log({ i });
    // console.log({ i });
  }
  return stones.length;
}

async function solveAdventPuzzle() {
  const file = currInputPath + "11.txt";
  const data = fs.readFileSync(file).toString();

  let sum = solve(data);
  console.log({ sum });
}
solveAdventPuzzle();
