import express from 'express';
import cors from 'cors';
import router from './router/index.js';
import { VERSION, verifyGoogleCloudConfig } from './config/dotenv.js';

const server = express();

// Verificar configuración de Google Cloud al iniciar
verifyGoogleCloudConfig();

server.use(express.json());
server.use(cors({ origin: '*' }));
server.use(`/api/${VERSION}`, router);

export default server;