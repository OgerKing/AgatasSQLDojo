/**
 * Verifies each zadanie with solution_sql is solvable: run solution in sandbox, compare to expected_result.
 * Run from server dir: node scripts/verify-zadania-solvable.js
 * @see .cursor/skills/sql-test-lessons/SKILL.md
 */

import { ZADANIA } from "../src/zadania/content.js";
import { runInSandbox } from "../src/sandbox.js";
import { rowsMatchExpected } from "../src/progress.js";

const STRICT = process.env.STRICT === "1" || process.env.STRICT === "true";

function main() {
  let failed = 0;
  let skipped = 0;
  let passed = 0;

  for (let i = 0; i < ZADANIA.length; i++) {
    const z = ZADANIA[i];
    const label = `#${i + 1} ${z.id}`;

    if (!z.schema_ddl || !z.seed_sql) {
      console.warn(`Skip ${label}: missing schema_ddl or seed_sql (e.g. schema_key not resolved)`);
      skipped++;
      continue;
    }
    if (!z.expected_result) {
      console.warn(`Skip ${label}: missing expected_result`);
      skipped++;
      continue;
    }
    if (!z.solution_sql || typeof z.solution_sql !== "string") {
      if (STRICT) {
        console.error(`Fail ${label}: no solution_sql (STRICT=1)`);
        failed++;
      } else {
        console.warn(`Skip ${label}: no solution_sql`);
        skipped++;
      }
      continue;
    }

    const sql = z.solution_sql.trim();
    const upper = sql.toUpperCase();
    if (upper.startsWith("INSERT ") || upper.startsWith("UPDATE ") || upper.startsWith("DELETE ") || upper.startsWith("REPLACE ")) {
      console.warn(`Skip ${label}: solution is DML (sandbox is SELECT/WITH only)`);
      skipped++;
      continue;
    }

    const result = runInSandbox(z, sql, {});
    if (result.error) {
      console.error(`Fail ${label}: sandbox error: ${result.error}`);
      failed++;
      continue;
    }

    if (!rowsMatchExpected(result.rows, z.expected_result)) {
      console.error(`Fail ${label}: result does not match expected_result (row count or content)`);
      failed++;
      continue;
    }

    console.log(`OK ${label}`);
    passed++;
  }

  console.log("");
  console.log(`Passed: ${passed}, Failed: ${failed}, Skipped: ${skipped}`);

  const ok = failed === 0 && (!STRICT || skipped === 0);
  process.exit(ok ? 0 : 1);
}

main();
