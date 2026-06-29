export function normalizeLine(line: string): string {
  return line.trim().toLowerCase().replace(/\s+/g, " ");
}

export function compareOutputs(actual: string, expected: string): boolean {
  const actualLines = actual
    .split("\n")
    .map(normalizeLine)
    .filter((l) => l !== "");
  const expectedLines = expected
    .split("\n")
    .map(normalizeLine)
    .filter((l) => l !== "");

  if (actualLines.length !== expectedLines.length) return false;

  for (let i = 0; i < actualLines.length; i++) {
    const a = actualLines[i];
    const e = expectedLines[i];
    if (a === e) continue;

    const aNum = parseFloat(a);
    const eNum = parseFloat(e);
    if (!isNaN(aNum) && !isNaN(eNum) && aNum === eNum) continue;

    return false;
  }

  return true;
}
