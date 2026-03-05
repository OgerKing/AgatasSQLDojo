/**
 * Order-insensitive row set comparison for success check (TECHNICAL_SPEC §6).
 */
function normalizeRow(row) {
  const keys = Object.keys(row).sort();
  return keys.map((k) => `${k}:${String(row[k])}`).join("|");
}

export function rowsMatchExpected(rows, expected) {
  if (!Array.isArray(expected) || !Array.isArray(rows)) return false;
  if (expected.length !== rows.length) return false;
  const a = rows.map(normalizeRow).sort();
  const b = expected.map(normalizeRow).sort();
  return a.every((v, i) => v === b[i]);
}
