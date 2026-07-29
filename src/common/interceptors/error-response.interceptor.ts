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
import { Response as ExpressResponse } from 'express';

@Injectable()
export class ErrorResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse<ExpressResponse>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'An unexpected error occurred';
        let errors: any = null;

        if (error instanceof HttpException) {
          status = error.getStatus();
          const responseContent = error.getResponse();

          if (
            typeof responseContent === 'object' &&
            responseContent !== null
          ) {
            message = (responseContent as any).message || error.message;
            errors = (responseContent as any).errors || null;
          } else {
            message = responseContent as string;
          }
        } else if (error instanceof Error) {
          message = error.message;
        }

        // Set status code directly on the Express response object
        response.status(status);

        // Map and throw formatted error
        return throwError(
          () =>
            new HttpException(
              {
                statusCode: status,
                message,
                errors,
              },
              status,
            ),
        );
      }),
    );
  }
}
