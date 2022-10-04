import mongo from "../database/db.js";
import { COLLECTION } from "../enums/collections.js";
import { STATUS_CODE } from "../enums/statusCode.js";

const db = await mongo();

async function createDeck(req, res) {
	const { key, deck } = res.locals;

	try {
		await db
			.collection(COLLECTION.PRIVATE_CARDS)
			.updateOne({ key_access: key }, { $push: { decks: deck } });
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	res.sendStatus(STATUS_CODE.CREATED);
}

async function listDecks(req, res) {
	const { key_access } = req.headers;

	let allDecks;
	let userDecks = [];

	try {
		allDecks = await db.collection(COLLECTION.PUBLIC_CARDS).find().toArray();

		if (key_access) {
			userDecks =
				(await db.collection(COLLECTION.PRIVATE_CARDS).findOne({ key_access }))
					?.decks || [];
		}
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	allDecks = [...allDecks, ...userDecks];

	res.status(STATUS_CODE.OK).send(allDecks);
}

export { createDeck, listDecks };
