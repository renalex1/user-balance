import { Router } from 'express';
import { asyncHandler, validateBalanceUpdate } from '../middlewares/index';
import { updateBalance } from '../services';

const router = Router();
router.post('/update-balance', validateBalanceUpdate, asyncHandler(updateBalance));

export default router;