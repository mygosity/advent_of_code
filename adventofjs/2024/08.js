/**
 * @param {number[]} indices - The reno indices
 * @param {number} length - The length of the race
 * @returns {string} The reno race
 */
function drawRace(indices, length) {
  // Code here
  const numLanes = indices.length;

  const drawLane = (len, prefixLength, position, laneNumber) => {
    const o = [];
    for (let i = 0; i < prefixLength; ++i) {
      o[i] = " ";
    }

    for (let i = 0 + prefixLength; i < len + prefixLength; ++i) {
      o[i] = "~";
    }

    if (position !== 0) {
      if (position > 0) {
        o[prefixLength + position] = "r";
      } else {
        o[o.length + position] = "r";
      }
    }

    o.push(" ");
    o.push("/");
    o.push(laneNumber + 1);
    return o;
  };

  let output = "";
  for (let i = 0; i < indices.length; ++i) {
    const laneArr = drawLane(length, numLanes - 1 - i, indices[i], i);
    output += laneArr.join("");
    if (i !== indices.length - 1) {
      output += "\n";
    }
  }

  return output;
}

console.log(drawRace([0, 5, -3], 10));
/*
  ~~~~~~~~~~ /1
 ~~~~~r~~~~ /2
~~~~~~~r~~ /3
*/

console.log(drawRace([2, -1, 0, 5], 8));
/*
   ~~r~~~~~ /1
  ~~~~~~~r /2
 ~~~~~~~~ /3
~~~~~r~~ /4
*/

console.log(drawRace([3, 7, -2], 12));
/*
  ~~~r~~~~~~~~ /1
 ~~~~~~~~r~~~ /2
~~~~~~~~~r~~ /3
*/
