const currPath = global.root + "/adventofcode/2024/";
console.log(`\n******************\nLoaded 2024/05.js`);
console.log(`******************\n`);

async function solveAdventPuzzle() {
  const file = currPath + "05.txt";
  const data = fs.readFileSync(file).toString();
  const lines = data.split("\n");

  const rules = [];
  const lists = [];

  let isRule = true;
  for (const line of lines) {
    if (line.replace(new RegExp(" ", "g"), "") === "") {
      isRule = false;
      continue;
    }
    if (isRule) {
      rules.push(line.split("|").map((x) => parseInt(x)));
    } else {
      lists.push(line.split(",").map((x) => parseInt(x)));
    }
  }
  //   console.log(rules);
  const graph = {};
  for (const [to, from] of rules) {
    graph[from] = graph[from] || [];
    graph[from].push(to);
  }

  let total = 0;
  let incorrectTotal = 0;
  for (const line of lists) {
    const compare = line
      .map((x) => x)
      .sort((x, y) => {
        if (graph[x].includes(y)) {
          return 1;
        }
        if (graph[y].includes(x)) {
          return -1;
        }
        return 0;
      });

    if (compare.join("") === line.join("")) {
      total += compare[compare.length >> 1];
    } else {
      incorrectTotal += compare[compare.length >> 1];
    }
  }
  console.log({ total, incorrectTotal });
}
solveAdventPuzzle();
