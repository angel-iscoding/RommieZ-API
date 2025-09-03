import express from 'express';
import cors from 'cors';
import router from './router/index.js';
import { VERSION } from './config/dotenv.js';
import pool from './config/databaseConecction.js';

const server = express();

server.use(express.json());
server.use(cors({ origin: '*' }));

server.get('/health', async (req, res) => {
  try {
    const connection = await pool.getConnection(); // Obtiene una conexión
    connection.release(); // Libera la conexión inmediatamente
    res.status(200).send('Servidor y base de datos conectados.');
  } catch (err) {
    console.error('Database connection failed:', err);
    res.status(500).send('Database connection failed');
  }
}); 

server.use(`/api/${VERSION}`, router);

export default server;