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

const getTargetPath = (input) => {
  return global.root + `/2024/${input.toString().padStart(2, "0")}.js`;
};

const evaluatePuzzle = (puzzleNumber) => {
  eval(getStringFromFilePath(getTargetPath(puzzleNumber)));
};

async function main() {
  const currentDefaultTest = 3;
  eval(getStringFromFilePath(getTargetPath(currentDefaultTest)));

  readline.on("line", async (input) => {
    try {
      const possibleNumber = parseInt(input);
      if (input === "") {
        evaluatePuzzle(currentDefaultTest);
      } else if (!isNaN(possibleNumber) && possibleNumber >= 0) {
        evaluatePuzzle(possibleNumber);
      } else {
        eval(input);
      }
    } catch (error) {
      console.log(error);
    }
    readline.prompt();
  });
}
console.log(`advent_of_code:: started`);
main();
console.log(`advent_of_code:: ended`);
