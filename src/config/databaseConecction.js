import mysql2 from 'mysql2/promise';
import { DB_DATABASE, DB_PASSWORD, DB_USER, socketPath } from './dotenv.js';

const pool = mysql2.createPool({
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    socketPath: socketPath,
});


export default pool;