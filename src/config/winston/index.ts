import { Injectable } from '@nestjs/common';
import {
  WinstonModuleOptions,
  WinstonModuleOptionsFactory,
} from 'nest-winston';
import { transports, format } from 'winston';

// import { NODE_ENV } from '../../environments';

@Injectable()
export class WinstonConfigService implements WinstonModuleOptionsFactory {
  async createWinstonModuleOptions(): Promise<WinstonModuleOptions> {
    const options = {
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(
          ({ timestamp, level, message }) =>
            `${timestamp} ${level}: ${message}`,
        ),
      ),
      transports: [
        new transports.File({ filename: 'logs/errors.log', level: 'error' }),
        new transports.File({
          filename: 'logs/all.log',
          maxsize: 5242880,
          level: 'info',
        }),
      ],
    };

    return options;
  }
}

// if (NODE_ENV !== 'production') {
//   logger.add(new transports.Console());
// }
