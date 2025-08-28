import express from 'express';
import cors from 'cors';
import router from './router/index.js';

const server = express();

server.use(express.json());
server.use(cors());
server.use('/', router);

export default server;