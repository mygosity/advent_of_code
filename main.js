const fs = require("fs");
const rl = require("readline");
const readline = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const global = {
  root: require("path").resolve(__dirname, "./"),
};

const getStringFromFilePath = (filePath) => {
  return fs.readFileSync(filePath).toString();
};

const getTargetPathForAdventOfCode = (year, input) => {
  return global.root + `/${year}/${input.toString().padStart(2, "0")}.js`;
};

const getTargetPathForAdventOfJS = (year, input) => {
  return (
    global.root + `/adventofjs/${year}/${input.toString().padStart(2, "0")}.js`
  );
};

const evaluatePuzzle = (puzzleNumber, type) => {
  switch (type) {
    case "js": {
      eval(
        getStringFromFilePath(getTargetPathForAdventOfJS("2024", puzzleNumber))
      );
      break;
    }
    case "code":
    default: {
      eval(
        getStringFromFilePath(
          getTargetPathForAdventOfCode("2024", puzzleNumber)
        )
      );
    }
  }
};

async function main() {
  let puzzleType = "code";
  const currentDefaultTest = 8;
  evaluatePuzzle(currentDefaultTest);

  let instructions = `\nType a number to target that day's solution, or just hit enter and target the default which is : ${currentDefaultTest}`;
  instructions += `\nSelect the challenge type by typing js for advent of js or code for advent of code\n`;
  console.log(instructions);

  readline.on("line", async (input) => {
    try {
      const possibleNumber = parseInt(input);
      if (input === "") {
        evaluatePuzzle(currentDefaultTest, puzzleType);
      } else if (input === "js") {
        puzzleType = "js";
        console.log("swapped to advent of js!");
      } else if (input === "code") {
        puzzleType = "code";
        console.log("swapped to advent of code!");
      } else if (!isNaN(possibleNumber) && possibleNumber >= 0) {
        evaluatePuzzle(possibleNumber, puzzleType);
      } else if (input === "help") {
        console.log(instructions);
      } else {
        eval(input);
      }
    } catch (error) {
      console.log(error);
    }
    readline.prompt();
  });
}
main();
