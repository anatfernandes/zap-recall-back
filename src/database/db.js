import { MongoClient } from "mongodb";

const mongoClient = new MongoClient('mongodb://localhost:27017');

export default async function mongo() {
	try {
		const connect = mongoClient.db("zaprecall");
		return connect;
	} catch (error) {
		console.log(error);
		return error;
	}
}