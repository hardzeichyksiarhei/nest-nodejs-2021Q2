import * as fs from 'fs';
import * as chalk from 'chalk';
import * as YAML from 'yamljs';
import { NestFactory } from '@nestjs/core';
import {
  InternalServerErrorException,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

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

    const config = new DocumentBuilder()
      .setTitle('Nest NodeJS 2021Q2')
      .setDescription('NestJS, TypeORM, PostgresDB')
      .setVersion('1.0')
      .addTag('nest')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    fs.writeFileSync('doc/api.yaml', YAML.stringify(document, 10, 2));
    SwaggerModule.setup('doc', app, document);

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
