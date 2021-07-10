import { v4 as uuid } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID } from 'class-validator';

import { IColumn, IBaseColumn } from './column.interface';

export class Column implements IColumn {
  @ApiProperty()
  @IsUUID(4)
  id: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNumber()
  order: number;

  constructor({
    id = uuid(),
    title = 'COLUMN',
    order = -1,
  }: Partial<IColumn> = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  static async create(payload: IBaseColumn): Promise<IColumn> {
    return new Column(payload);
  }
}
