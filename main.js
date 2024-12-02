const fs = require("fs");
const rl = require("readline");
const readline = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const global = {
  root: require("path").resolve(__dirname, "./"),
};

async function main() {
  const curr = {
    1: global.root + "/2024/01.js", //
    2: global.root + "/2024/02.js",
  };
  const currentDefaultTest = 2;
  eval(fs.readFileSync(curr[currentDefaultTest]).toString());

  readline.on("line", async (input) => {
    try {
      const possibleNumber = parseInt(input);
      if (input === "") {
        eval(fs.readFileSync(curr[currentDefaultTest]).toString());
      } else if (
        !isNaN(possibleNumber) &&
        possibleNumber >= 0 &&
        curr[possibleNumber]
      ) {
        eval(fs.readFileSync(curr[possibleNumber]).toString());
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
