import dotenv from 'dotenv';

dotenv.config();

// Server port
export const PORT = process.env.PORT || 3010;

// API Version
export const VERSION = "V1";

// Database Credentials
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_USER = process.env.DB_USER || "root";
export const DB_PASSWORD = process.env.DB_PASSWORD || "32Ge42664dDy-";
export const DB_DATABASE = process.env.DB_DATABASE || "RoomieZ";
export const DB_PORT = process.env.DB_PORT || 33061;