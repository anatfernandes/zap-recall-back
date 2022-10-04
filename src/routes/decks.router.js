import express from "express";
import { createDeck } from "../controllers/decks.controller.js";
import { validateData } from "../middlewares/decks.middleware.js";

const router = express.Router();

router.post("/decks", validateData, createDeck);

export default router;
