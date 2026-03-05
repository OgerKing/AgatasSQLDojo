import { Router } from "express";
import { db } from "../db.js";

export const healthRouter = Router();

healthRouter.get("/", async (_req, res) => {
  try {
    await db.query("SELECT 1");
    res.json({ ok: true, database: "connected" });
  } catch (err) {
    res.status(503).json({ ok: false, database: "disconnected", error: err.message });
  }
});
