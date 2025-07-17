// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { AppError } from './error.middleware';

interface JwtPayload {
  userId: number;
  email: string;
  type: 'USER' | 'ADMIN';
}

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError('Unauthorized: Token not provided', 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;

    (req as any).user = decoded;

    next();
  } catch (err) {
    throw new AppError('Unauthorized: Invalid token', 401);
  }
};
