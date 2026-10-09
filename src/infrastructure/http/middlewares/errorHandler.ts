import { Request, Response, NextFunction } from 'express';
import { AppError } from '@domain/errors/app-error';

export function errorHandler(
  error: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: error,
      statusCode: error.statusCode,
      message: error.message,
    });
  }

  console.error(error);
  return res.status(500).json({ error: 'Erro interno no servidor.' });
}
