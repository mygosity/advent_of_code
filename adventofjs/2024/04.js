/**
 * @param {number} height - Height of the tree
 * @param {string} ornament - Symbol to draw
 * @returns {string} Drawn tree
 */
function createXmasTree(height, ornament) {
  /* Code here */
  let output = "";

  function getArrForLine(len) {
    let o = "";
    for (let i = 0; i < len; ++i) {
      o += "_";
    }
    return o.split("");
  }

  const lineLength = height * 2 - 1;
  const middle = Math.floor(lineLength / 2);

  for (let i = 0; i < height; ++i) {
    const nextLineArr = getArrForLine(lineLength);
    nextLineArr[middle] = ornament;
    let left = middle - 1;
    let right = middle + 1;
    for (let j = 0; j < i; ++j) {
      nextLineArr[left] = ornament;
      nextLineArr[right] = ornament;
      left--;
      right++;
    }
    output += nextLineArr.join("") + "\n";
  }

  const trunk = getArrForLine(lineLength);
  trunk[middle] = "#";
  output += trunk.join("") + "\n";
  output += trunk.join("");

  return output;
}

console.log(createXmasTree(5, "*"));
