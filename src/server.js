import express from 'express';
import cors from 'cors';
import router from './router/index.js';
import { VERSION } from './config/dotenv.js';

const server = express();

server.use(express.json());
server.use(cors({ origin: '*' }));
server.use(`/api/${VERSION}`, router);

export default server;