import { v4 as uuid } from 'uuid';

import { IColumn, IBaseColumn } from './column.interface';

export class Column implements IColumn {
  id: string;

  title: string;

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
