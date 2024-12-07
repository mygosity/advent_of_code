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

const getTargetPath = (year, input) => {
  return global.root + `/${year}/${input.toString().padStart(2, "0")}.js`;
};

const evaluatePuzzle = (puzzleNumber) => {
  eval(getStringFromFilePath(getTargetPath("2024", puzzleNumber)));
};

async function main() {
  const currentDefaultTest = 8;
  evaluatePuzzle(currentDefaultTest);

  const instructions = `\nType a number to target that day's solution, or just hit enter and target the default which is : ${currentDefaultTest}\n`;
  console.log(instructions);

  readline.on("line", async (input) => {
    try {
      const possibleNumber = parseInt(input);
      if (input === "") {
        evaluatePuzzle(currentDefaultTest);
      } else if (!isNaN(possibleNumber) && possibleNumber >= 0) {
        evaluatePuzzle(possibleNumber);
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
