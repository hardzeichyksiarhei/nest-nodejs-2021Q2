import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { IncomingMessage, ServerResponse } from 'http';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class FastifyLoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  use(req: IncomingMessage, res: ServerResponse, next: () => void) {
    const start = Date.now();
    const body: Uint8Array[] = [];

    req
      .on('data', (payload) => {
        body.push(Buffer.from(payload));
      })
      .on('end', () => {
        if (res.statusCode < 400) {
          const message = this.getLoggerInfo(body, start)(req, res);
          this.logger.info(message);
        }
        if (res.statusCode >= 400) {
          const message = this.getLoggerError(body, start)(req, res);
          this.logger.error(message);
        }
      });

    next();
  }

  getLoggerInfo(
    body: Uint8Array[],
    startTime: number,
    separator: string = '\n',
  ) {
    return (req: IncomingMessage, res: ServerResponse) =>
      [
        '',
        `Method: ${req.method}`,
        `URL: ${req.url}`,
        `Code: ${res.statusCode}`,
        `Time: ${Date.now() - startTime}ms`,
        // `Params: ${JSON.stringify(req.params)}`,
        `Body: ${Buffer.concat(body).toString() || '{}'}`,
        // `Response: ${JSON.stringify(payload)}`,
        '',
      ].join(separator);
  }

  getLoggerError(body: Uint8Array[], startTime: number) {
    return (req: IncomingMessage, res: ServerResponse) =>
      this.getLoggerInfo(body, startTime)(req, res);
  }
}
