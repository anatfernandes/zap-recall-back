import express from "express";
import { createDeck, listDecks } from "../controllers/decks.controller.js";
import { validateData } from "../middlewares/decks.middleware.js";

const router = express.Router();

router.post("/decks", validateData, createDeck);
router.get("/decks", listDecks);

export default router;
