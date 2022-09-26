import { MongoClient } from 'mongodb';
import STATUS_CODE from '../enums/statusCode.js';

const mongoClient = new MongoClient(process.env.MONGO_URI);

export async function mongo () {
    try {
        const connect = mongoClient('zaprecall');
        return connect;
    } catch (error) {
        console.log(error);
        res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
};