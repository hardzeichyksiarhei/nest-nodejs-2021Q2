import * as chalk from 'chalk';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import {
  InternalServerErrorException,
  Logger,
  ValidationPipe,
} from '@nestjs/common';

import { AppModule } from './app.module';

import { AppLogger } from './config/logger';

import { HttpExceptionFilter } from './common';

import { PORT } from './environments';

async function bootstrap() {
  try {
    const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
      {
        logger: new AppLogger(),
      },
    );

    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new HttpExceptionFilter());

    await app.listen(PORT);

    Logger.log(
      `🚀 Server is listening on port ${chalk.hex('#87e8de').bold(`${PORT}`)}`,
      'Bootstrap',
    );
  } catch (error) {
    Logger.error(`❌ Error starting server, ${error}`, '', 'Bootstrap', false);
    throw new InternalServerErrorException(error);
  }
}
bootstrap().catch(() => {
  process.exit(1);
});
