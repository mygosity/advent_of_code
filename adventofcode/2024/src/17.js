const currInputPath = paths.adventOfCode + "/2024/inputs/";
const fileTargetNumber = 17;
console.log(`\n******************\nLoaded 2024/${fileTargetNumber}.js`);
console.log(`******************\n`);

function print(data) {
  let o = "";
  // o += grid[y].join("") + "\n";
  console.log(o);
}

function bigIntPow(base, exponent) {
  let result = 1n;
  let currentBase = base;
  let currentExponent = exponent;

  while (currentExponent > 0n) {
    if (currentExponent % 2n === 1n) {
      result *= currentBase;
    }
    currentBase *= currentBase;
    currentExponent /= 2n;
  }
  return result;
}

function getComboOperand(operand, a, b, c) {
  switch (operand) {
    case 4n:
      return a;
    case 5n:
      return b;
    case 6n:
      return c;
    case 7n: {
      console.log("should never happen!!!");
      break;
    }
  }
  return operand;
}

function solve(a, b, c, program) {
  let o = "";
  a = BigInt(a);
  b = BigInt(b);
  c = BigInt(c);
  // program = program.map(BigInt);

  console.log({ a, b, c, program });

  const output = [];

  for (let i = 0; i < program.length; i += 2) {
    const opcode = program[i];
    let operand = BigInt(program[i + 1] ?? 0);

    // console.log({ i, opcode, operand });
    switch (opcode) {
      case 0: {
        const combo = getComboOperand(operand, a, b, c);
        const power = bigIntPow(2n, combo);
        const prevA = a;
        a = a / power;
        // console.log(`opcode 0`, { opcode, operand, combo, power, prevA });
        break;
      }
      case 1: {
        const prevB = a;
        b = b ^ operand;
        // console.log(`opcode 1:`, { opcode, operand, prevB, b });
        break;
      }
      case 2: {
        const combo = getComboOperand(operand, a, b, c);
        const prevB = b;
        b = combo % 8n;
        // console.log(`2`, { operand, combo });
        // console.log(`opcode 2:`, { opcode, operand, combo, prevB, b });
        break;
      }
      case 3: {
        if (a !== 0n) {
          i = Number(operand) - 2;
          // console.log(`opcode 3: moved operation to i: ${i}`);
          continue;
        }
        break;
      }
      case 4: {
        const prevB = b;
        const prevC = c;
        b = b ^ c;
        // console.log(`opcode 4:`, { opcode, operand, prevB, prevC, b });
        break;
      }
      case 5: {
        const combo = getComboOperand(operand, a, b, c);
        output.push(combo % 8n);
        // console.log(`5`,{ operand, combo });
        // console.log(`opcode 5:`, { opcode, operand, combo, val: combo % 8n });
        break;
      }
      case 6: {
        const combo = getComboOperand(operand, a, b, c);
        const power = bigIntPow(2n, combo);
        const prevB = b;
        b = a / power;
        // console.log(`6`, { operand, combo });
        // console.log(`opcode 6`, { opcode, operand, combo, power, prevB, b });
        break;
      }
      case 7: {
        const combo = getComboOperand(operand, a, b, c);
        const power = bigIntPow(2n, combo);
        const prevC = c;
        c = a / power;
        // console.log(`opcode 7`, { opcode, operand, combo, power, prevC, c });
        break;
      }
    }
  }

  console.log({ a, b, c, program, o: output.join(",") });
  return output.join(",");
}

async function solveAdventPuzzle() {
  const file = currInputPath + fileTargetNumber + ".txt";
  const data = fs.readFileSync(file).toString();

  const [rawA, rawB, rawC, _, rawProgram] = data.split("\n");
  const [_a, a] = rawA.split(": ").map(Number);
  const [_b, b] = rawB.split(": ").map(Number);
  const [_c, c] = rawC.split(": ").map(Number);
  const [_p, programStr] = rawProgram.split(": ");
  const program = programStr.split(",").map(Number);

  const answer = solve(a, b, c, program);
  console.log({ partA: answer });
}
solveAdventPuzzle();
