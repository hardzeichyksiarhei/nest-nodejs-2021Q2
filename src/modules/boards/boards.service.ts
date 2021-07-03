import { Injectable, NotFoundException } from '@nestjs/common';
import { getCustomRepository } from 'typeorm';

import { Column } from '../columns/column.model';
import { BoardRepository } from './board.repository';

import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardsService {
  async create(createBoardDto: CreateBoardDto) {
    const boardRepository = getCustomRepository(BoardRepository);

    const columns = await Promise.all(
      createBoardDto.columns?.map(Column.create) || [],
    );
    const boardCreatable = { ...createBoardDto, columns };
    const board = boardRepository.create(boardCreatable);
    return boardRepository.save(board);
  }

  findAll() {
    const boardRepository = getCustomRepository(BoardRepository);
    return boardRepository.getAll();
  }

  async findOne(id: string) {
    const boardRepository = getCustomRepository(BoardRepository);
    const board = await boardRepository.getById(id);
    if (!board) throw new NotFoundException('Board not found');
    return board;
  }

  async update(id: string, updateBoardDto: UpdateBoardDto) {
    const boardRepository = getCustomRepository(BoardRepository);
    const board = await boardRepository.getById(id);
    if (!board) throw new NotFoundException('Board not found');

    const columns = await Promise.all(
      updateBoardDto.columns?.map(Column.create) || [],
    );

    const boardUpdatable = { ...updateBoardDto, columns };
    return boardRepository.save({ ...board, ...boardUpdatable });
  }

  async remove(id: string) {
    const boardRepository = getCustomRepository(BoardRepository);

    const boardDeletable = await boardRepository.getById(id);
    if (!boardDeletable) throw new NotFoundException('Board not found');

    await boardRepository.deleteById(id);

    // const taskRepository = getCustomRepository(TaskRepository);
    // await taskRepository.update({ boardId: id }, { boardId: null });

    return boardDeletable;
  }
}
