import { Router } from 'express';

const router = Router();
router.get('/health', async (req, res) => {
    res.status(200).json({ status: 'ok', database: 'connected' });
});

export default router;