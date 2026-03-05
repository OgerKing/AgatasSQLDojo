import test from "node:test";
import assert from "node:assert/strict";
import { rowsMatchExpected } from "../src/progress.js";

test("rowsMatchExpected matches row sets ignoring order", () => {
  const rows = [
    { id: 2, name: "B" },
    { id: 1, name: "A" },
  ];
  const expected = [
    { name: "A", id: 1 },
    { name: "B", id: 2 },
  ];

  assert.equal(rowsMatchExpected(rows, expected), true);
});

test("rowsMatchExpected rejects different values", () => {
  const rows = [{ id: 1, name: "A" }];
  const expected = [{ id: 1, name: "B" }];

  assert.equal(rowsMatchExpected(rows, expected), false);
});
