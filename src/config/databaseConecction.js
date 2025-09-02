import mysql2 from 'mysql2/promise';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER, socketPath } from './dotenv.js';

const pool = mysql2.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    socketPath: socketPath,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: {
        rejectUnauthorized: false
    }
});


export default pool;