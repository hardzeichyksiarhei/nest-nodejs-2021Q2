import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateBoardsTable1623933580006 implements MigrationInterface {
  tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName || 'boards';
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isUnique: true,
            generationStrategy: 'uuid',
            default: `uuid_generate_v4()`,
          },
          {
            name: 'title',
            type: 'varchar',
            default: "''",
          },
          {
            name: 'columns',
            type: 'jsonb',
            default: "'[]'",
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE ${this.tableName}`);
  }
}
