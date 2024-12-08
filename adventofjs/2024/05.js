/**
 * @param {{ type: 'I' | 'R', size: number }[]} shoes
 * @returns {number[]} Available shoes
 */
function organizeShoes(shoes) {
  const output = [];
  const map = {};
  for (const { type, size } of shoes) {
    map[size] = map[size] || { I: 0, R: 0 };
    map[size][type]++;
  }
  for (const size in map) {
    const numSize = parseInt(size);
    const { I, R } = map[size];
    for (let i = 0; i < Math.min(I, R); ++i) {
      output.push(numSize);
    }
  }
  return output;
}

console.log({
  test: organizeShoes([
    { type: "I", size: 38 },
    { type: "R", size: 38 },
    { type: "I", size: 38 },
    { type: "I", size: 38 },
    { type: "R", size: 38 },
  ]),
  test2: organizeShoes([
    { type: "I", size: 38 },
    { type: "R", size: 38 },
    { type: "R", size: 42 },
    { type: "I", size: 41 },
    { type: "I", size: 42 },
  ]),
  test3: organizeShoes([
    { type: "I", size: 38 },
    { type: "R", size: 36 },
    { type: "R", size: 42 },
    { type: "I", size: 41 },
    { type: "I", size: 43 },
  ]),
});
