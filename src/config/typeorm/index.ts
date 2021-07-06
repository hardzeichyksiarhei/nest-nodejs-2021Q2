import * as path from 'path';
import { Injectable, Logger } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConnectionOptions, createConnection } from 'typeorm';

import { User } from '../../modules/users/user.entity';
import { Board } from '../../modules/boards/board.entity';
import { Task } from '../../modules/tasks/task.entity';

import config from '../../config.orm';

const options: ConnectionOptions = {
  ...config,
  type: 'postgres',
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectionInterval: 1000,

  entities: [User, Board, Task],

  migrationsTableName: 'migrations',
  migrations: [path.join(__dirname, '../../../database/migrations/*.ts')],
  cli: { migrationsDir: 'src/migrations' },

  seeds: [path.join(__dirname, '../../../database/seeds/*.ts')],
  factories: [path.join(__dirname, '../../../database/factories/*.ts')],
};

@Injectable()
export class TypeormConfigService implements TypeOrmOptionsFactory {
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    createConnection(options)
      .then(() => {
        Logger.log(`☁️  Database connected`, 'TypeORM', false);
      })
      .catch(() => {
        Logger.error(`❌  Database connect error`, '', 'TypeORM', false);
      });

    return options;
  }
}

export default options;
