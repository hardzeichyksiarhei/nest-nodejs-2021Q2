import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConnectionOptions, createConnection } from 'typeorm';

import config from '../../config.orm';

const options: ConnectionOptions = {
  ...config,
  type: 'postgres',
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectionInterval: 1000,

  entities: [path.join(__dirname, '../../**/*.entity.ts')],

  migrationsTableName: 'migrations',
  migrations: [path.join(__dirname, '../../../database/migrations/*.ts')],
  cli: { migrationsDir: 'src/migrations' },

  seeds: [path.join(__dirname, '../../../database/seeds/*.ts')],
  factories: [path.join(__dirname, '../../../database/factories/*.ts')],
};

@Injectable()
export class TypeormService implements TypeOrmOptionsFactory {
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
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

export default options;
