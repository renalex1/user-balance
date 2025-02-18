import { NextFunction, Request, Response } from 'express';

export default (req: Request, res: Response, next: NextFunction): any => {
    const { userId, amount } = req.body;

    if (!Number.isInteger(userId) || userId <= 0) {
        return res.status(400).json({ error: 'Invalid userId' });
    }

    if (typeof amount !== 'number' || !Number.isInteger(amount)) {
        return res.status(400).json({ error: 'Invalid amount' });
    }

    next(); 
};
