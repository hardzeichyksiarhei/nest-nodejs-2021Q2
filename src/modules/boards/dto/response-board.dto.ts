import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

import { Column as BoardColumn } from '../../columns/column.model';

export class ResponseBoardDto {
  @ApiProperty()
  @IsUUID(4)
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string = 'Board';

  @ApiProperty({
    type: BoardColumn,
  })
  columns: BoardColumn[] = [];
}
