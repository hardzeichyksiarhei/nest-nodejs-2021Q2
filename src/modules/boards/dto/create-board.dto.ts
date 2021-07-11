import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { Column as BoardColumn } from '../../columns/column.model';

export class CreateBoardDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string = 'Board';

  @ApiProperty()
  columns: BoardColumn[] = [];
}
