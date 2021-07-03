import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { Column as BoardColumn } from '../columns/column.model';

@Entity({ name: 'boards' })
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar')
  title = 'Board';

  @Column('jsonb')
  columns: BoardColumn[] = [];

  static toResponse(board: Board) {
    return board;
  }
}
