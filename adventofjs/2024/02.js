function createFrame(names) {
  // Code here
  const longestLength = names.reduce((p, c) => Math.max(p, c.length), 0);

  function getBorder(len) {
    let o = "";
    for (let i = 0; i < len + 4; i++) {
      o += "*";
    }
    return o;
  }

  function getEmptyLineAsArray(len) {
    let o = [];
    for (let i = 0; i < len + 4; i++) {
      o[i] = " ";
    }
    o[0] = "*";
    o[o.length - 1] = "*";
    return o;
  }

  let output = getBorder(longestLength) + "\n";

  for (const word of names) {
    const arr = getEmptyLineAsArray(longestLength);
    for (let i = 0; i < word.length; ++i) {
      arr[i + 2] = word[i];
    }
    output += arr.join("") + "\n";
  }
  output += getBorder(longestLength);
  return output;
}

console.log(createFrame(["a", "b", "midori"]));
