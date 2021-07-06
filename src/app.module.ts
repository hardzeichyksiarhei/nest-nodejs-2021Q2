// import { APP_INTERCEPTOR } from '@nestjs/core';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';

import { UsersModule } from './modules/users/users.module';
import { BoardsModule } from './modules/boards/boards.module';
import { TasksModule } from './modules/tasks/tasks.module';

import { UsersController } from './modules/users/users.controller';
import { BoardsController } from './modules/boards/boards.controller';
import { TasksController } from './modules/tasks/tasks.controller';

import {
  ExpressLoggerMiddleware,
  FastifyLoggerMiddleware,
  HttpExceptionFilter,
} from './common';
import { TypeormConfigService, WinstonConfigService } from './config';
import { HTTP_ADAPTER } from './environments';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeormConfigService,
    }),
    WinstonModule.forRootAsync({
      useClass: WinstonConfigService,
    }),
    AuthModule,
    UsersModule,
    BoardsModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: LoggerInterceptor,
    // },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const LoggerMiddleware =
      HTTP_ADAPTER === 'fastify'
        ? FastifyLoggerMiddleware
        : ExpressLoggerMiddleware;
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(UsersController, BoardsController, TasksController);
  }
}
