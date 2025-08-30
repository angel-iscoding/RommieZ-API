import mysql2 from 'mysql2/promise';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from './dotenv.js';

const pool = mysql2.createPool({
    host: DB_HOST || "localhost",
    user: DB_USER || "root",
    password: DB_PASSWORD || "164980",
    database: DB_DATABASE || "test",
    port: DB_PORT || 3306,
});

export default pool;