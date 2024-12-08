const currPath = global.root + "/adventofcode/2024/";
console.log(`\n******************\nLoaded 2024/01.js`);
console.log(`******************\n`);

async function solveAdventPuzzle01() {
  const file = currPath + "01.txt";
  const data = fs.readFileSync(file).toString();
  const lines = data.split("\n");

  const list1 = [];
  const list2 = [];

  for (const line of lines) {
    const [left, right] = line.split("   ");
    list1.push(parseInt(left));
    list2.push(parseInt(right));
  }

  list1.sort((x, y) => x - y);
  list2.sort((x, y) => x - y);

  let total = 0;
  for (let i = 0; i < list1.length; ++i) {
    total += Math.abs(list1[i] - list2[i]);
  }

  const freq = {};
  for (const num of list2) {
    freq[num] = freq[num] || 0;
    freq[num]++;
  }
  let similarities = 0;
  for (let i = 0; i < list1.length; ++i) {
    const c = list1[i];
    similarities += c * (freq[c] ?? 0);
  }
  console.log({ total, similarities });
}
solveAdventPuzzle01();
