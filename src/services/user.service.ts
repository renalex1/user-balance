import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { User, sequelize } from '../db';
import createError from '../utils/create-error.util';

export async function updateBalance(req: Request, res: Response) { 
    const { userId, amount , isDicript= false} = req.body;

    const [updated] = await User.update(
        { balance: sequelize.literal(`balance + ${amount}`) },
        { where: { id: userId, balance: { [Op.gte]: -amount } } }
    );

    if (!updated) throw createError(400, 'Insufficient funds or concurrency issue');

    const user = await User.findByPk(userId);
    res.json({ balance: user?.balance });
}
