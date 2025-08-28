import { Router } from "express";
import { PORT, VERSION } from "../config/dotenv.js";

const router = Router();

/* 
Endpoints:

GET: /users
GET: /users/:id
GET: /pensions
GET: /pensions/:id

POST: /users    
POST: /pensions

PUT: /users/:id
PUT: /pensions/:id

DELETE: /users/:id
DELETE: /pensions/:id
*/

router.get('/', (req, res) => {
    res.send(`Server listering on Endpoint: localhost:${PORT}/api/${VERSION}`);
});

router.use('/pensions', (req, res) => {
    res.send(`Server listering on Endpoint: localhost:${PORT}/api/${VERSION}`);
});
router.use('/users', (req, res) => {
    res.send(`Server listering on Endpoint: localhost:${PORT}/api/${VERSION}`);
});

export default router;