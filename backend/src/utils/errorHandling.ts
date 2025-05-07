import { NextFunction, Response, Request } from 'express';
import AppError from '@shared/errors/AppError';

export const errorHandling = async (
  error: Error,
  request: Request,
  response: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction,
) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
      success: false,
    });
  }
  return response.status(500).json({
    status: 'error',
    message: error.message,
    success: false,
  });
};
