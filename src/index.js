import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import STATUS_CODE from '../enums/statusCode.js';

dotenv.config();

const server = express;

server.use(cors());
server.use(express.json());


server.get('/status', (req, res) => {
    console.log('it is alive!!!');
    res.sendStatus(STATUS_CODE.OK);
});


server.listen(5000, () => console.log('Listen on port 5000...'));