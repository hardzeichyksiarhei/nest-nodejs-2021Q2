import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTasksTable1623934702439 implements MigrationInterface {
  tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName || 'tasks';
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
            default: "'Task'",
          },
          {
            name: 'order',
            type: 'integer',
            default: 0,
          },
          {
            name: 'description',
            type: 'text',
            default: "''",
          },
          {
            name: 'userId',
            type: 'varchar',
            length: '36',
            isNullable: true,
          },
          {
            name: 'boardId',
            type: 'varchar',
            length: '36',
            isNullable: true,
          },
          {
            name: 'columnId',
            type: 'varchar',
            length: '36',
            isNullable: true,
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
