import { Router } from "express";
import roomzRouter from './roomz/roomzRouter.js';
import usersRouter from './users/usersRouter.js'
import { PORT, VERSION } from "../config/dotenv.js";
import pool from "../config/databaseConecction.js";

const router = Router();

/* 
Endpoints:

HEALTH CHECK:
GET: /health                        - Health check endpoint for monitoring

USER ENDPOINTS:
GET: /users                           - Get all users
GET: /users/:id                       - Get user by id  
GET: /users/:id/exists                - Check if user exists
GET: /users/:id/contacts              - Get user social contacts
POST: /users/:id/contacts             - Create/Update user social contacts
POST: /users/check-email              - Check if email is registered
POST: /users                          - Create user
PUT: /users/:id                       - Update user (name, city, email, birthdate)
DELETE: /users/:id                    - Delete user

ROOMZ ENDPOINTS:
GET: /roomz                           - Get all roomz (all types)
GET: /roomz/type/:type                - Get roomz by type (studio, apartment, residential_complex)
GET: /roomz/user/:id                  - Get all roomz for a specific user
GET: /roomz/:id                       - Get roomz by id
POST: /roomz                          - Create roomz
PUT: /roomz/:id                       - Update roomz
DELETE: /roomz/:id                    - Delete roomz
*/

router.get('/', (req, res) => {
    res.send(`Server listening on endpoint: localhost:${PORT}/api/${VERSION}`);
});

// Health check endpoint para Google Cloud Run
router.get('/health', async (req, res) => {
    try {
        // Verificar conexión a la base de datos
        await pool.query('SELECT 1');
        res.status(200).json({
            status: 'healthy',
            timestamp: new Date().toISOString(),
            database: 'connected'
        });
    } catch (error) {
        console.error('Health check failed:', error);
        res.status(503).json({
            status: 'unhealthy',
            timestamp: new Date().toISOString(),
            database: 'disconnected',
            error: error.message
        });
    }
});

router.use('/roomz', roomzRouter);
router.use('/users', usersRouter);

export default router;