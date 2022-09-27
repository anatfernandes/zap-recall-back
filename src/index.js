import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { STATUS_CODE } from "./enums/statusCode.js";
import authRouter from "./routes/auth.router.js";

dotenv.config();

const server = express();

server.use(express.json());
server.use(cors());

server.use(authRouter);

server.get("/status", (req, res) => {
	console.log("it is alive!!!");
	res.sendStatus(STATUS_CODE.OK);
});

server.listen(process.env.DEV_PORT, () =>
	console.log(`Listening on port ${process.env.DEV_PORT}...`)
);
