import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { Column as BoardColumn } from '../columns/column.model';
import { ResponseBoardDto } from './dto/response-board.dto';

@Entity({ name: 'boards' })
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar')
  title = 'Board';

  @Column('jsonb')
  columns: BoardColumn[] = [];

  static toResponse(board: ResponseBoardDto) {
    return board;
  }
}
