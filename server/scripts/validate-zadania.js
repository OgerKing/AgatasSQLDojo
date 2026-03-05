/**
 * Validates zadania content: count, unique ids, required fields.
 * Run from server dir: node scripts/validate-zadania.js
 * @see .cursor/500_LESSONS_ORCHESTRATION.md §1.1
 */

import { ZADANIA } from "../src/zadania/content.js";

const TARGET_COUNT = parseInt(process.env.TARGET_COUNT || "500", 10) || 500;

function main() {
  let ok = true;

  // 1. Count (use TARGET_COUNT env to validate partial batches, e.g. TARGET_COUNT=50)
  if (ZADANIA.length !== TARGET_COUNT) {
    console.error(`Expected ${TARGET_COUNT} zadania, got ${ZADANIA.length}`);
    ok = false;
  } else {
    console.log(`Count: ${ZADANIA.length}/${TARGET_COUNT}`);
  }

  // 2. Unique ids
  const ids = ZADANIA.map((z) => z.id);
  const unique = new Set(ids);
  if (unique.size !== ids.length) {
    const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
    console.error("Duplicate ids:", [...new Set(dupes)]);
    ok = false;
  } else {
    console.log("Ids: all unique");
  }

  // 3. Required fields per zadanie (schema_ddl/seed_sql can come from schema_key resolution)
  const required = ["id", "title", "goal", "concept", "stopien", "expected_result"];
  for (let i = 0; i < ZADANIA.length; i++) {
    const z = ZADANIA[i];
    for (const key of required) {
      if (!(key in z) || z[key] === undefined) {
        console.error(`Zadanie ${i + 1} (id=${z.id}) missing or empty: ${key}`);
        ok = false;
      }
    }
    if (!z.schema_ddl && !z.schema_key) {
      console.error(`Zadanie ${i + 1} (id=${z.id}) needs schema_ddl or schema_key`);
      ok = false;
    }
    if (!z.seed_sql && !z.schema_key) {
      console.error(`Zadanie ${i + 1} (id=${z.id}) needs seed_sql or schema_key`);
      ok = false;
    }
  }
  if (ok) console.log("Required fields: present on all");

  process.exit(ok ? 0 : 1);
}

main();
