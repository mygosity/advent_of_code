/** @param {string} packages with parentheses
 *  @returns {string} Fixed and sorted packages
 */
function fixPackages(packages) {
  // Code here
  let output = "";
  let foundBracket = false;
  const stack = [];

  for (let i = 0; i < packages.length; ++i) {
    if (packages[i] === "(") {
      foundBracket = true;
    }

    if (!foundBracket) {
      output += packages[i];
      continue;
    }

    if (packages[i] !== ")") {
      stack.push(packages[i]);
      continue;
    }

    let buffer = "";
    while (stack[stack.length - 1] !== "(") {
      buffer = buffer + stack.pop();
    }
    stack.pop();

    if (stack.length) {
      stack.push(...buffer.split(""));
    } else {
      output += buffer;
      foundBracket = false;
    }
  }
  return output;
}

console.log({
  test: fixPackages("a(cb)de"),
  test2: fixPackages("a(bc(def)g)h"),
  test3: fixPackages("abc(def(gh)i)jk"),
  test4: fixPackages("a(b(c))e"),
});
