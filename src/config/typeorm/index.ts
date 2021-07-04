import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConnectionOptions, createConnection } from 'typeorm';

import { User } from '../../modules/users/user.entity';
import { Board } from 'src/modules/boards/board.entity';
import { Task } from 'src/modules/tasks/task.entity';

import config from '../../config.orm';

@Injectable()
export class TypeormService implements TypeOrmOptionsFactory {
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    const options: ConnectionOptions = {
      ...config,
      type: 'postgres',
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectionInterval: 1000,

      // ToDo: Delete
      synchronize: true,

      entities: [User, Board, Task],

      // migrationsTableName: 'migrations',
      // migrations: [path.join(__dirname, '../../database/migrations/*.ts')],
      // cli: { migrationsDir: 'src/migrations' },

      // seeds: [path.join(__dirname, '../../database/seeds/*.ts')],
      // factories: [path.join(__dirname, '../../database/factories/*.ts')],
    };
    createConnection(options)
      .then(() => {
        console.info('☁️  Database connected');
        // console.log(`☁️  Database connected`, 'TypeORM', false);
      })
      .catch(() => {
        console.error('❌  Database connect error');
        // console.error(`❌  Database connect error`, '', 'TypeORM', false);
      });

    return options;
  }
}
