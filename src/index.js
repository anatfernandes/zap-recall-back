import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/auth.router.js";
import decksRouter from "./routes/decks.router.js";

dotenv.config();

const server = express();

server.use(express.json());
server.use(cors());

server.use(authRouter);
server.use(decksRouter);

server.get("/status", (req, res) => {
	console.log("it is alive!!!");
	res.sendStatus(200);
});

server.listen(process.env.PORT, () =>
	console.log(`Listening on port ${process.env.PORT}...`)
);
