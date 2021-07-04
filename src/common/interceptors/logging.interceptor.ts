import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { tap } from 'rxjs/operators';
import { logger } from '../winston';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();

    return next.handle().pipe(
      tap((response) => {
        const host = context.switchToHttp();
        const request = host.getRequest<Request>();

        logger.info(
          `${request.method} ${request.url} ${
            Date.now() - start
          }ms ${JSON.stringify(response)}`,
        );
      }),
    );
  }
}
