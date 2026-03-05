import { Router } from "express";
import { THEME_CONFIG } from "../zadania/themes.js";

export const themesRouter = Router();

/** GET / – theme config (rank labels, tutor name) for all themes. @see TECHNICAL_SPEC §12 */
themesRouter.get("/", (_req, res) => {
  res.json(THEME_CONFIG);
});
