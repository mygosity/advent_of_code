const currInputPath = paths.adventOfCode + "/2024/inputs/";
const fileTargetNumber = 16;
console.log(`\n******************\nLoaded 2024/${fileTargetNumber}.js`);
console.log(`******************\n`);

function print(grid) {
  let o = "";
  for (let y = 0; y < grid.length; ++y) {
    o += grid[y].join("") + "\n";
  }
  console.log(o);
}

function MinPriorityQueue(options) {
  this.list = [];
  if (options?.compare) {
    this.compare = options.compare; //TODO:: implement compare option later
  }
}

MinPriorityQueue.prototype.front = function () {
  return this.list[0];
};

MinPriorityQueue.prototype.size = function () {
  return this.list.length;
};

MinPriorityQueue.prototype.getParentIndex = function (i) {
  return (i - 1) >> 1;
};

MinPriorityQueue.prototype.swap = function (i, j) {
  const tmp = this.list[i];
  this.list[i] = this.list[j];
  this.list[j] = tmp;
};

MinPriorityQueue.prototype._internalGetNextIndexAfterSwap = function (
  i,
  direction = "u"
) {
  const root = this.list[i].priority;
  const leftIndex = i * 2 + 1;
  const left = this.list[leftIndex]?.priority ?? Infinity;
  const rightIndex = i * 2 + 2;
  const right = this.list[rightIndex]?.priority ?? Infinity;
  if (left < root && left < right) {
    this.swap(i, leftIndex);
    return direction === "u" ? this.getParentIndex(i) : leftIndex;
  } else if (right < root) {
    this.swap(i, rightIndex);
    return direction === "u" ? this.getParentIndex(i) : rightIndex;
  }
  return direction === "u" ? -1 : this.list.length;
};

MinPriorityQueue.prototype.enqueue = function (element, priority) {
  const data = { element, priority };
  this.list.push(data);
  let i = this.getParentIndex(this.list.length - 1);
  while (i >= 0) {
    i = this._internalGetNextIndexAfterSwap(i, "u");
  }
};

MinPriorityQueue.prototype.dequeue = function () {
  this.swap(0, this.list.length - 1);
  const dequeued = this.list.pop();
  let i = 0;
  while (i < this.list.length) {
    i = this._internalGetNextIndexAfterSwap(i, "d");
  }
  return dequeued;
};

MinPriorityQueue.prototype.print = function () {
  console.log(this.list);
};

function solve(grid) {
  let bestPathPoints;

  let start = [];

  for (let y = 0; y < grid.length; ++y) {
    for (let x = 0; x < grid[y].length; ++x) {
      if (grid[y][x] === "S") {
        start = [x, y];
      }
    }
  }

  const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];

  const pq = new MinPriorityQueue();
  pq.enqueue([...start, 0, ""], 0);
  const v = new Set();
  let bestTrail = "";

  while (pq.size()) {
    const { element, priority: points } = pq.dequeue();
    const [cx, cy, di, trail] = element;
    const key = cx + cy * grid[0].length + "," + di;
    if (v.has(key)) continue;
    v.add(key);

    if (grid[cy]?.[cx] === "E") {
      bestPathPoints = points;
      bestTrail = trail;
      break;
    }

    let [dx, dy] = directions[di];
    let nx = dx + cx;
    let ny = dy + cy;
    if (grid[ny]?.[nx] === "." || grid[ny]?.[nx] === "E") {
      const nextTrail =
        trail +
        "|" +
        (nx + ny * grid[0].length) +
        "," +
        di +
        "," +
        (points + 1);
      pq.enqueue([nx, ny, di, nextTrail], points + 1);
    }

    for (const nextDirection of [di - 1, di + 1]) {
      const nextIndex = (nextDirection + 4) % 4;
      dx = directions[nextIndex][0];
      dy = directions[nextIndex][1];
      pq.enqueue([cx, cy, nextIndex, trail], points + 1000);
    }
  }

  return { bestPathPoints, bestTrail };
}

function solveB(grid, { bestPathPoints, bestTrail }) {
  let start = [];
  let end = [];

  for (let y = 0; y < grid.length; ++y) {
    for (let x = 0; x < grid[y].length; ++x) {
      if (grid[y][x] === "S") {
        start = [x, y];
      } else if (grid[y][x] === "E") {
        end = [x, y];
      }
    }
  }

  const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];

  const trails = [];
  const n = grid[0].length;

  const pq = new MinPriorityQueue();
  pq.enqueue([...start, 0, 0, `${start[0] + start[1] * n}`], 0);
  const v = new Map();

  // const bestPathMap = new Map();
  // for (const str of bestTrail.split("|")) {
  //   if (str === "") continue;
  //   const [coordKey, directionIndex, points] = str.split(",");
  //   bestPathMap.set(coordKey + "," + directionIndex, { points, trails: [] });
  // }

  function getDistanceFromEnd(x, y, ox, oy) {
    const distance =
      Math.abs(oy - y) * Math.abs(oy - y) + Math.abs(ox - x) * Math.abs(ox - x);
    return distance;
  }

  while (pq.size()) {
    const { element, priority } = pq.dequeue();
    const [cx, cy, di, points, trail] = element;

    if (points > bestPathPoints) continue;

    const key = cx + cy * n + "," + di;
    if (v.has(key)) {
      if (v.get(key).points < points) continue;
      if (v.get(key).points === points) {
        v.get(key).trails.add(trail);
        // console.log({ cx, cy, key, points });
        // continue;
      }
    } else {
      v.set(key, { points, trails: new Set([trail]) });
    }

    if (grid[cy]?.[cx] === "E") {
      trails.push(trail);
      continue;
    }

    let [dx, dy] = directions[di];
    let nx = dx + cx;
    let ny = dy + cy;
    if (grid[ny]?.[nx] === "." || grid[ny]?.[nx] === "E") {
      pq.enqueue(
        [nx, ny, di, points + 1, trail + "|" + (nx + ny * n) + "," + di],
        points + 1
        // getDistanceFromEnd(nx, ny, ...end)
      );
    }

    for (const nextDirection of [di - 1, di + 1]) {
      const nextIndex = (nextDirection + 4) % 4;
      dx = directions[nextIndex][0];
      dy = directions[nextIndex][1];
      pq.enqueue(
        [cx, cy, nextIndex, points + 1000, trail],
        points + 1000
        // getDistanceFromEnd(nx, ny, ...end)
      );
    }
  }

  let bestPath = new Set();
  let uniqs = new Set();
  for (const trail in trails) {
    for (const c of trails[trail].split("|")) {
      // const [coord] = c.split(",");
      if (c === "") continue;
      // console.log(c);
      uniqs.add(c.split(",")[0]);
      bestPath.add(c);
    }
  }

  // console.log({ trails, v });
  for (const [key, value] of v) {
    if (value.trails.size === 1 || !bestPath.has(key)) continue;
    console.log({ key, vs: value.trails.size });
    for (const set of value.trails) {
      for (const c of set.split("|")) {
        if (c === "") continue;
        uniqs.add(c.split(",")[0]);
      }
    }
    // console.log({ trailsLen: value.trails });
  }

  // console.log(uniqs);
  console.log({ uniqSize: uniqs.size });

  for (const cs of uniqs) {
    if (cs === "") continue;
    const [c] = cs.split(",");
    const cn = Number(c);
    const x = cn % grid[0].length;
    const y = Math.floor(cn / grid[0].length);
    grid[y][x] = "O";
  }
  print(grid);
  return uniqs.size;
}

async function solveAdventPuzzle() {
  const file = currInputPath + fileTargetNumber + ".txt";
  const data = fs.readFileSync(file).toString();

  const lines = data.split("\n");
  const grid = new Array(lines.length);
  let y = 0;
  for (const line of lines) {
    grid[y] = [];
    for (const c of line.split("")) {
      grid[y].push(c);
    }
    y++;
  }

  console.log({ part1: solve(grid), part2: solveB(grid, solve(grid)) });
}
solveAdventPuzzle();
