const currInputPath = paths.adventOfCode + "/2024/inputs/";
console.log(`\n******************\nLoaded 2024/09.js`);
console.log(`******************\n`);

function solveData(data) {
  // console.log(data);
  const idValues = [];
  let id = 0;
  for (let i = 0; i < data.length; i += 2) {
    const freeSpace = parseInt(data[i + 1] ?? "0");
    const numIds = parseInt(data[i]);
    idValues.push([id++, numIds, freeSpace]);
  }
  console.log({ idValues });

  let checkSum = 0n;

  let left = 0;
  //pts to next file block to use to fill in
  let right = idValues.length - 1;
  let index = 0;

  while (left < idValues.length) {
    let [id, numOfIds, freeSpace] = idValues[left];

    let snapShottedIndex = index;
    for (let i = 0; i < numOfIds; ++i) {
      index = snapShottedIndex + i;
      checkSum += BigInt(index * id);
      console.log({ index, id, checkSum, freeSpace });
    }

    if (numOfIds > 0) {
      index++;
    }

    idValues[left][1] = 0;
    numOfIds = 0;

    if (freeSpace > 0) {
      function getNextIdFromRight() {
        while (right >= 0 && idValues[right][1] === 0) {
          right--;
        }
        if (!idValues[right]) return 0;
        const nextId = idValues[right][0];
        idValues[right][1]--;
        return nextId;
      }

      snapShottedIndex = index;
      for (let i = 0; i < freeSpace; ++i) {
        index = snapShottedIndex + i;
        const nextId = getNextIdFromRight();
        checkSum += BigInt(index * nextId);
        console.log({ index, nextId, checkSum });
      }
      index++;
    }

    left++;
  }

  return checkSum;
}

async function solveAdventPuzzle() {
  const file = currInputPath + "09.txt";
  const data = fs.readFileSync(file).toString();

  let sum = solveData(data);
  console.log({ sum });
}
solveAdventPuzzle();
