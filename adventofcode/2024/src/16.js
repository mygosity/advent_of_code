const currInputPath = paths.adventOfCode + "/2024/inputs/";
const fileTargetNumber = 16;
console.log(`\n******************\nLoaded 2024/${fileTargetNumber}.js`);
console.log(`******************\n`);

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
  let sum = 0n;

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
  pq.enqueue([...start, 0], 0);
  const v = new Set();

  while (pq.size()) {
    const { element, priority: points } = pq.dequeue();
    const [cx, cy, di] = element;
    const key = cx + cy * grid[0].length + "|" + di;
    if (v.has(key)) continue;
    v.add(key);

    if (grid[cy]?.[cx] === "E") {
      return points;
    }

    let [dx, dy] = directions[di];
    let nx = dx + cx;
    let ny = dy + cy;
    if (grid[ny]?.[nx] === "." || grid[ny]?.[nx] === "E") {
      pq.enqueue([nx, ny, di], points + 1);
    }

    for (const nextDirection of [di - 1, di + 1]) {
      const nextIndex = (nextDirection + directions.length) % 4;
      dx = directions[nextIndex][0];
      dy = directions[nextIndex][1];
      pq.enqueue([cx, cy, nextIndex], points + 1000);
    }
  }

  return sum;
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

  const sum = solve(grid);
  console.log({ sum });
}
solveAdventPuzzle();
