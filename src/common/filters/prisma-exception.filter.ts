/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Prisma } from '../../database/generated/prisma/client.ts';
import { Response } from 'express';

@Catch(
  Prisma.PrismaClientKnownRequestError,
  Prisma.PrismaClientValidationError,
  Prisma.PrismaClientInitializationError,
)
export class PrismaExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Terjadi kesalahan tak terduga di server.';
    let errorType = 'InternalServerError';
    let prismaCode: string | undefined;
    let targetField: string | undefined;

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      prismaCode = exception.code;
      targetField = (exception.meta as any)?.target;

      switch (exception.code) {
        case 'P2000':
          status = HttpStatus.BAD_REQUEST;
          message = `Value too long for column: ${targetField || 'undefined'}.`;
          errorType = 'BadRequest';
          break;
        case 'P2002':
          status = HttpStatus.CONFLICT;
          message = `Data already exists for ${targetField ? `column '${targetField}'` : 'unique entry'}.`;
          errorType = 'Conflict';
          break;
        case 'P2003':
          status = HttpStatus.BAD_REQUEST;
          message = `Data cannot be processed due to invalid relation.`;
          errorType = 'ForeignKeyConstraintViolation';
          break;
        case 'P2025':
          status = HttpStatus.NOT_FOUND;
          message = `Resource not found.`;
          errorType = 'NotFound';
          break;
        case 'P1000':
        case 'P1001':
        case 'P1002':
          status = HttpStatus.SERVICE_UNAVAILABLE;
          message =
            'Unable to connect to the database. Please try again later.';
          errorType = 'DatabaseConnectionError';
          break;
        default:
          status = HttpStatus.INTERNAL_SERVER_ERROR;
          message = `A database error occurred: ${exception.message.split('\n')[0]}`;
          errorType = 'PrismaKnownError';
          break;
      }
      this.logger.error(
        `Prisma Known Error (${exception.code}): ${exception.message}`,
        exception.stack,
      );
    } else if (exception instanceof Prisma.PrismaClientValidationError) {
      status = HttpStatus.BAD_REQUEST;
      message = `Database query validation error. Please check your input.`;
      errorType = 'PrismaValidationError';
      this.logger.error(
        `Prisma Validation Error: ${exception.message}`,
        exception.stack,
      );
    } else if (exception instanceof Prisma.PrismaClientInitializationError) {
      status = HttpStatus.SERVICE_UNAVAILABLE;
      message = 'The application failed to connect to the database on startup.';
      errorType = 'PrismaInitializationError';
      this.logger.error(
        `Prisma Initialization Error: ${exception.message}`,
        exception.stack,
      );
    }

    response.status(status).json({
      statusCode: status,
      message: message,
      error: errorType,
      prismaCode:
        process.env.NODE_ENV !== 'production' ? prismaCode : undefined,
      target: process.env.NODE_ENV !== 'production' ? targetField : undefined,
    });
  }
}
