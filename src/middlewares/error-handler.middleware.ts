import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../interfaces/custom-error.interface';

export const errorHandler = (
    err: CustomError, 
    req: Request, 
    res: Response, 
    next: NextFunction
): void => {
    const status = err.status || 500;
    res.status(status).json({ error: err.message || 'Internal server error' });
};
