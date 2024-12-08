/** @param {string[]} gifts
 *  @returns {boolean} True if the gift is inside the box
 */
function inBox(box) {
  for (let y = 1; y < box.length - 1; ++y) {
    for (let x = 1; x < box[y].length - 1; ++x) {
      if (box[y][x] === "*") return true;
    }
  }
  return false;
}

console.log({
  test: inBox(["###", "#*#", "###"]),
  test2: inBox(["####", "#* #", "#  #", "####"]),
  test3: inBox(["#####", "#   #", "#  #*", "#####"]),
  test4: inBox(["#####", "#   #", "#   #", "#   #", "#####"]),
});
