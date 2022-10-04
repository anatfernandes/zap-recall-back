import mongo from "../database/db.js";
import bcrypt from "bcrypt";
import { COLLECTION } from "../enums/collections.js";
import { STATUS_CODE } from "../enums/statusCode.js";

const db = await mongo();

async function validateData(req, res, next) {
	const { key_access } = req.headers;
	const { name, cards, password } = req.body;

	if (
		!key_access ||
		!password ||
		!name ||
		!cards ||
		cards?.length < 4 ||
		cards?.length > 10
	) {
		return res.sendStatus(STATUS_CODE.BAD_REQUEST);
	}

	let user;

	try {
		user = await db.collection(COLLECTION.USERS).findOne({ key_access });

		if (!user) return res.sendStatus(STATUS_CODE.BAD_REQUEST);
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	const isValidPassword = bcrypt.compareSync(password, user.password);

	if (!isValidPassword) return res.sendStatus(STATUS_CODE.BAD_REQUEST);

	res.locals.key = key_access;
	res.locals.deck = { name, cards };

	next();
}

export { validateData };
