import test from "node:test";
import assert from "node:assert/strict";
import { signCompletionToken, verifyCompletionToken, signToken, verifyToken } from "../src/middleware/auth.js";

test("completion token roundtrip works", () => {
  process.env.JWT_SECRET = "test-secret";
  const token = signCompletionToken({
    type: "zadanie_completion",
    user_id: "user-1",
    zadanie_id: "zadanie-1",
  });

  const payload = verifyCompletionToken(token);
  assert.equal(payload?.user_id, "user-1");
  assert.equal(payload?.zadanie_id, "zadanie-1");
});

test("verifyCompletionToken rejects regular auth token", () => {
  process.env.JWT_SECRET = "test-secret";
  const authToken = signToken({ sub: "u1", id: "u1", role: "student" });
  const payload = verifyCompletionToken(authToken);

  assert.equal(payload, null);
  assert.ok(verifyToken(authToken));
});
