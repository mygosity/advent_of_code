const currInputPath = paths.adventOfCode + "/2024/inputs/";
const fileTargetNumber = 13;
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

function extractCoordinates(line, char) {
  const [axSet, aySet] = line.split(",");
  const [_a, axStr] = axSet.split(char);
  const [__a, ayStr] = aySet.split(char);
  const ax = parseInt(axStr);
  const ay = parseInt(ayStr);
  return [BigInt(ax), BigInt(ay)];
}

function solve(data) {
  let sum = 0n;

  function dfs(cache, x, y, ax, ay, bx, by, tx, ty) {
    if (x > tx && y > ty) {
      return Infinity;
    }
    if (x === tx && y === ty) {
      return 0;
    }
    const key = x + "|" + y;
    if (cache[key] != null) {
      return cache[key];
    }
    const cost = Math.min(
      3 + dfs(cache, x + ax, y + ay, ax, ay, bx, by, tx, ty),
      1 + dfs(cache, x + bx, y + by, ax, ay, bx, by, tx, ty)
    );
    return (cache[key] = cost);
  }

  function mapAllFactors(ax, ay, bx, by, tx, ty) {
    const cache = {};
    const pq = new MinPriorityQueue();
    pq.enqueue([ax, ay], 3);
    pq.enqueue([bx, by], 1);
    while (pq.size()) {
      const { element, priority } = pq.dequeue();
      const [cx, cy] = element;
      if (cx === tx && cy === ty) {
        return priority;
      }
      if (cache[cx]?.[cy] != null || cx > tx || cy > ty) {
        continue;
      }
      if (
        (cx > ax && cx % ax === 0n && cy % ay === 0n) ||
        (cx > bx && cx % bx === 0n && cy % by === 0n) ||
        (cx > ax + bx && cx % (ax + bx) === 0n && cy % (ay + by) === 0n)
      ) {
        continue;
      }
      if (cx > ax && cx > bx) {
        let nx = cx;
        let ny = cy;
        while (nx % 10n === 0n && ny % 10n === 0n) {
          nx /= 10n;
          ny /= 10n;
        }
        if (cache[nx]?.[ny] != null) {
          continue;
        }
      }

      cache[cx] = cache[cx] || {};
      cache[cx][cy] = priority;
      pq.enqueue([cx + ax, cy + ay], priority + 3);
      pq.enqueue([cx + bx, cy + by], priority + 1);
    }
    // console.log(cache, tx, ty);
    let combos = 0;
    for (const x in cache) {
      for (const y in cache[x]) {
        combos++;
        // 1 164 183
      }
    }
    console.log({ cache, combos });
    return 0;
  }

  for (const puzzleSet of data) {
    let [lineAStr, lineBStr, prizeLocationStr] = puzzleSet;
    const [ax, ay] = extractCoordinates(lineAStr.split(":")[1], "+");
    const [bx, by] = extractCoordinates(lineBStr.split(":")[1], "+");
    let [tx, ty] = extractCoordinates(prizeLocationStr.split(":")[1], "=");
    // tx += 10000000000000n;
    // ty += 10000000000000n;
    tx += 84000n;
    ty += 54000n;

    // console.log({ ax, ay, bx, by, tx, ty });

    const cache = {};
    const other = dfs(cache, 0n, 0n, ax, ay, bx, by, tx, ty);
    sum += BigInt(other === Infinity ? 0 : other);

    // const answer = mapAllFactors(ax, ay, bx, by, tx, ty);
  }

  return sum;
}

async function solveAdventPuzzle() {
  const file = currInputPath + fileTargetNumber + ".txt";
  const data = fs.readFileSync(file).toString();

  const lines = data.split("\n");

  const puzzles = [];
  let puzzleIndex = 0;
  for (const line of lines) {
    puzzles[puzzleIndex] = puzzles[puzzleIndex] || [];
    if (line === "") {
      puzzleIndex++;
      continue;
    }
    puzzles[puzzleIndex].push(line);
  }
  // console.log(puzzles);

  const sum = solve(puzzles);
  console.log({ sum });
}
solveAdventPuzzle();
