import mongo from "../database/db.js";
import { COLLECTION } from "../enums/collections.js";
import { STATUS_CODE } from "../enums/statusCode.js";

const db = await mongo();

async function hasUser(req, res, next) {
	const { username, password } = req.body;
    let user;

	if (!username || !password)
		return res
			.status(STATUS_CODE.UNPROCESSABLE_ENTITY)
			.send({ message: "Usuário e senha são obrigatórios." });

	try {
		user = await db.collection(COLLECTION.USERS).findOne({ username });
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

    res.locals.user = user;

	next();
}

export { hasUser };
