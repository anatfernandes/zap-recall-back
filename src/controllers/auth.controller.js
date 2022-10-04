import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import mongo from "../database/db.js";
import { COLLECTION } from "../enums/collections.js";
import { STATUS_CODE } from "../enums/statusCode.js";

const db = await mongo();

async function SignUp(req, res) {
	const { username, password } = req.body;
	const { user: hasUser } = res.locals;

	if (hasUser)
		return res
			.status(STATUS_CODE.CONFLICT)
			.send({ message: "Usuário já existe." });

	const key_access = uuid();
	const passwordHash = bcrypt.hashSync(password, 13);

	try {
		await db
			.collection(COLLECTION.USERS)
			.insertOne({ username, password: passwordHash, key_access });
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	try {
		await db
			.collection(COLLECTION.PRIVATE_CARDS)
			.insertOne({ key_access, decks: [] });
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	res.sendStatus(STATUS_CODE.CREATED);
}

async function SignIn(req, res) {
	const { password } = req.body;
	const { user } = res.locals;

	if (!user)
		return res
			.status(STATUS_CODE.UNAUTHORIZED)
			.send({ message: "Usuário ou senha inválida." });

	const isValidPassword = bcrypt.compareSync(password, user.password);

	if (!isValidPassword)
		return res
			.status(STATUS_CODE.UNAUTHORIZED)
			.send({ message: "Usuário ou senha inválida." });

	res.status(STATUS_CODE.OK).send({ key_access: user.key_access });
}

export { SignUp, SignIn };
