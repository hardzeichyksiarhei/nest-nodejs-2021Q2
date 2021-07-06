import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
// import { Request, Response } from 'express';
import { Logger } from 'winston';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // const start = Date.now();

    // const host = context.switchToHttp();
    // const request = host.getRequest<Request>();
    // const response = host.getResponse<Response>();

    return next.handle().pipe(
      tap(
        () => {
          // const loggerInfo = [
          //   '',
          //   `Method: ${request.method}`,
          //   `URL: ${request.url}`,
          //   `Code: ${response.statusCode}`,
          //   `Time: ${Date.now() - start}ms`,
          //   `Params: ${JSON.stringify(request.params)}`,
          //   `Body: ${JSON.stringify(request.body)}`,
          //   `Response: ${JSON.stringify(payload)}`,
          //   '',
          // ];
          // this.logger.info(loggerInfo.join('\n'));
        },
        () => {},
      ),
    );
  }
}
