import { NextFunction, Request, Response } from 'express';
import { AsyncFunction } from '../types/async-function.type';

export default (fn: AsyncFunction) => (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
