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
  // console.log({ idValues });

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
      // console.log({ index, id, checkSum, freeSpace });
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
        // console.log({ index, nextId, checkSum });
      }
      index++;
    }

    left++;
  }

  return checkSum;
}

function solveDataB(data) {
  // console.log(data);
  const idValues = [];
  let id = 0;
  for (let i = 0; i < data.length; i += 2) {
    const freeSpace = parseInt(data[i + 1] ?? "0");
    const numIds = parseInt(data[i]);
    idValues.push([id++, numIds, freeSpace, [], numIds]);
  }
  // console.log({ idValues });

  //reorder the right hand side until all free space is used
  for (let j = idValues.length - 1; j > 0; --j) {
    const [id, numOfIds, freeSpace, captured] = idValues[j];
    for (let i = 0; i < j; ++i) {
      const [otherId, otherNumOfIds, otherFreeSpace, otherCaptured] =
        idValues[i];
      if (numOfIds <= otherFreeSpace) {
        //zero these as they've moved
        idValues[j][1] = 0;
        //subtract from the capturing group that will allow these freeloaders
        idValues[i][2] -= numOfIds;
        otherCaptured.push([id, numOfIds]);
        break;
      }
    }
  }

  let checkSum = 0n;

  //pts to next file block to use to fill in
  let index = 0;

  // console.log(idValues);

  for (let left = 0; left < idValues.length; ++left) {
    let [id, numOfIds, freeSpace, captured, originalNum] = idValues[left];

    if (numOfIds > 0) {
      for (let i = 0; i < numOfIds; ++i) {
        checkSum += BigInt(index * id);
        // console.log({ index, id, checkSum, freeSpace });
        index++;
      }
    } else {
      //tricky edge condition to remember where the number that moved
      // leaves an empty space equivalent to how much was there
      for (let i = 0; i < originalNum; ++i) {
        // console.log({ index });
        index++;
      }
    }

    if (captured.length) {
      for (let i = 0; i < captured.length; ++i) {
        const [innerId, innerNum] = captured[i];
        for (let j = 0; j < innerNum; ++j) {
          checkSum += BigInt(index * innerId);
          // console.log({ index, innerId, innerNum, checkSum });
          index++;
        }
      }
    }

    if (freeSpace > 0) {
      for (let i = 0; i < freeSpace; ++i) {
        // console.log({ index, checkSum });
        index++;
      }
    }
  }

  return checkSum;
}

async function solveAdventPuzzle() {
  const file = currInputPath + "09.txt";
  const data = fs.readFileSync(file).toString();

  let sum = solveData(data);
  let sumB = solveDataB(data);
  console.log({ sum, sumB });
}
solveAdventPuzzle();
