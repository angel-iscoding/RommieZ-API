import { Router } from "express";

const router = Router();

router.get('/get', (req, res) => {
    res.send("Hello");
})

export default router;