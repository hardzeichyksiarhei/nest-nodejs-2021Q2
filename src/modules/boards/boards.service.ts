import { Injectable, NotFoundException } from '@nestjs/common';

import { Column } from '../columns/column.model';
import { BoardRepository } from './board.repository';

import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardsService {
  constructor(private readonly boardRepository: BoardRepository) {}

  async create(createBoardDto: CreateBoardDto) {
    const columns = await Promise.all(
      createBoardDto.columns?.map(Column.create) || [],
    );
    const boardCreatable = { ...createBoardDto, columns };
    const board = this.boardRepository.create(boardCreatable);
    return this.boardRepository.save(board);
  }

  findAll() {
    return this.boardRepository.getAll();
  }

  async findOne(id: string) {
    const board = await this.boardRepository.getById(id);
    if (!board) throw new NotFoundException('Board not found');
    return board;
  }

  async update(id: string, updateBoardDto: UpdateBoardDto) {
    const board = await this.boardRepository.getById(id);
    if (!board) throw new NotFoundException('Board not found');

    const columns = await Promise.all(
      updateBoardDto.columns?.map(Column.create) || [],
    );

    const boardUpdatable = { ...updateBoardDto, columns };
    return this.boardRepository.save({ ...board, ...boardUpdatable });
  }

  async remove(id: string) {
    const boardDeletable = await this.boardRepository.getById(id);
    if (!boardDeletable) throw new NotFoundException('Board not found');

    await this.boardRepository.deleteById(id);

    // const taskRepository = getCustomRepository(TaskRepository);
    // await taskRepository.update({ boardId: id }, { boardId: null });

    return boardDeletable;
  }
}
