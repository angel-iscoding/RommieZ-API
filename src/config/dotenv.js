import dotenv from 'dotenv';

dotenv.config();

// Server port
export const PORT = process.env.PORT || 3010;

//Api Version
export const VERSION = "V1";

//Database Credentials
export const DB_HOST = process.env.DB_HOST;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_DATABASE = process.env.DB_DATABASE;
export const DB_PORT= 33061;