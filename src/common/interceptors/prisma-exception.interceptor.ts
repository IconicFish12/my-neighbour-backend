import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
  PrismaClientInitializationError,
} from '@prisma/client/runtime/library';

@Injectable()
export class PrismaExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          return throwError(() => this.handlePrismaKnownError(error));
        }

        if (error instanceof PrismaClientValidationError) {
          return throwError(() => this.handlePrismaValidationError(error));
        }

        if (error instanceof PrismaClientUnknownRequestError) {
          return throwError(() => this.handlePrismaUnknownError(error));
        }

        if (error instanceof PrismaClientInitializationError) {
          return throwError(() => this.handlePrismaInitError(error));
        }

        return throwError(() => error);
      }),
    );
  }

  private handlePrismaKnownError(
    error: PrismaClientKnownRequestError,
  ): HttpException {
    const { code, meta } = error;

    switch (code) {
      case 'P2000':
        return new HttpException(
          'The provided value is too long for the field',
          HttpStatus.BAD_REQUEST,
        );

      case 'P2001':
        return new HttpException(
          'The record searched for does not exist',
          HttpStatus.NOT_FOUND,
        );

      case 'P2002': {
        const target = meta?.target as string[];
        const field = target ? target.join(', ') : 'field';
        return new HttpException(
          `Duplicate entry: ${field} already exists`,
          HttpStatus.CONFLICT,
        );
      }

      case 'P2003':
        return new HttpException(
          'Foreign key constraint failed',
          HttpStatus.BAD_REQUEST,
        );

      case 'P2004':
        return new HttpException(
          'A constraint failed on the database',
          HttpStatus.BAD_REQUEST,
        );

      case 'P2005':
        return new HttpException(
          'The value stored in the database is invalid for the field type',
          HttpStatus.BAD_REQUEST,
        );

      case 'P2006':
        return new HttpException(
          'The provided value is not valid',
          HttpStatus.BAD_REQUEST,
        );

      case 'P2007':
        return new HttpException(
          'Data validation error',
          HttpStatus.BAD_REQUEST,
        );

      case 'P2008':
        return new HttpException(
          'Failed to parse the query',
          HttpStatus.BAD_REQUEST,
        );

      case 'P2009':
        return new HttpException(
          'Failed to validate the query',
          HttpStatus.BAD_REQUEST,
        );

      case 'P2010':
        return new HttpException('Raw query failed', HttpStatus.BAD_REQUEST);

      case 'P2011':
        return new HttpException(
          'Null constraint violation',
          HttpStatus.BAD_REQUEST,
        );

      case 'P2012':
        return new HttpException(
          'Missing a required value',
          HttpStatus.BAD_REQUEST,
        );

      case 'P2013':
        return new HttpException(
          'Missing required argument',
          HttpStatus.BAD_REQUEST,
        );

      case 'P2014':
        return new HttpException(
          'The change would violate a relation constraint',
          HttpStatus.BAD_REQUEST,
        );

      case 'P2015':
        return new HttpException(
          'A related record could not be found',
          HttpStatus.NOT_FOUND,
        );

      case 'P2016':
        return new HttpException(
          'Query interpretation error',
          HttpStatus.BAD_REQUEST,
        );

      case 'P2017':
        return new HttpException(
          'The records for relation are not connected',
          HttpStatus.BAD_REQUEST,
        );

      case 'P2018':
        return new HttpException(
          'The required connected records were not found',
          HttpStatus.NOT_FOUND,
        );

      case 'P2019':
        return new HttpException('Input error', HttpStatus.BAD_REQUEST);

      case 'P2020':
        return new HttpException(
          'Value out of range for the type',
          HttpStatus.BAD_REQUEST,
        );

      case 'P2021':
        return new HttpException(
          'The table does not exist in the database',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );

      case 'P2022':
        return new HttpException(
          'The column does not exist in the database',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );

      case 'P2025':
        return new HttpException('Record not found', HttpStatus.NOT_FOUND);

      default:
        return new HttpException(
          `Database error: ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }

  private handlePrismaValidationError(
    _error: PrismaClientValidationError,
  ): HttpException {
    return new HttpException(
      'Invalid query parameters or data validation failed',
      HttpStatus.BAD_REQUEST,
    );
  }

  private handlePrismaUnknownError(
    _error: PrismaClientUnknownRequestError,
  ): HttpException {
    return new HttpException(
      'An unknown database error occurred',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  private handlePrismaInitError(
    _error: PrismaClientInitializationError,
  ): HttpException {
    return new HttpException(
      'Database connection failed',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
