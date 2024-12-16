const fs = require("fs");
const rl = require("readline");
const readline = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const root = require("path").resolve(__dirname, "./");
const paths = {
  root,
  adventOfCode: root + "/adventofcode",
  adventOfJs: root + "/adventofjs",
  testOutputs: root + "/testoutputs",
};
const global = {
  defaults: {
    year: 2024,
    puzzleType: "code",
    challengeLevel: { code: 17, js: 9 },
  },
};

const getStringFromFilePath = (filePath) => {
  return fs.readFileSync(filePath).toString();
};

const getTargetPathForAdventOfCode = (year, input) => {
  return (
    paths.adventOfCode + `/${year}/src/${input.toString().padStart(2, "0")}.js`
  );
};

const getTargetPathForAdventOfJS = (year, input) => {
  return paths.adventOfJs + `/${year}/${input.toString().padStart(2, "0")}.js`;
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
  const { puzzleType, challengeLevel } = global.defaults;
  const currentDefaultTest = challengeLevel[puzzleType];
  evaluatePuzzle(currentDefaultTest, puzzleType);

  let instructions = `\nType a number to target that day's solution, or just hit enter and target the default which is : ${currentDefaultTest} and type: advent of ${puzzleType}`;
  instructions += `\nSelect the challenge type by typing js for advent of js or code for advent of code\n`;
  console.log(instructions);

  readline.on("line", async (input) => {
    try {
      const possibleNumber = parseInt(input);
      if (input === "") {
        evaluatePuzzle(currentDefaultTest, puzzleType);
      } else if (input === "js") {
        global.defaults.puzzleType = "js";
        console.log("swapped to advent of js!");
      } else if (input === "code") {
        global.defaults.puzzleType = "code";
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
