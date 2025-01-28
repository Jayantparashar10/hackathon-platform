// lib/utils/error.ts
import * as Sentry from '@sentry/nextjs';

export class AppError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    Sentry.captureException(this);
  }

  toJSON() {
    return {
      error: this.message,
      statusCode: this.statusCode,
    };
  }
}

export const handleError = (error: unknown) => {
  if (error instanceof AppError) {
    return error.toJSON();
  }
  
  Sentry.captureException(error);
  return new AppError('Something went wrong', 500).toJSON();
};