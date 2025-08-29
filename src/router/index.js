import { Router } from "express";
import { PORT, VERSION } from "../config/dotenv.js";

const router = Router();

/* 
Endpoints:

GET: /users
GET: /users/:id
GET: /roomz
GET: /roomz/:id

POST: /users    
POST: /roomz

PUT: /users/:id
PUT: /roomz/:id

DELETE: /users/:id
DELETE: /roomz/:id
*/

router.get('/', (req, res) => {
    res.send(`Server listering on Endpoint: localhost:${PORT}/api/${VERSION}`);
});

router.use('/roomz', (req, res) => {
    res.send(`Server listering on Endpoint: localhost:${PORT}/api/${VERSION}`);
});
router.use('/users', (req, res) => {
    res.send(`Server listering on Endpoint: localhost:${PORT}/api/${VERSION}`);
});

export default router;