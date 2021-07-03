import { IsNotEmpty } from 'class-validator';

import { Column as BoardColumn } from '../../columns/column.model';

export class CreateBoardDto {
  @IsNotEmpty()
  title = 'Board';

  columns: BoardColumn[] = [];
}
