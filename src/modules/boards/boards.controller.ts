import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { BoardsService } from './boards.service';

import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

import { Board } from './board.entity';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @HttpCode(StatusCodes.CREATED)
  @Post()
  async create(@Body() createBoardDto: CreateBoardDto) {
    const board = await this.boardsService.create(createBoardDto);
    return Board.toResponse(board);
  }

  @Get()
  async findAll() {
    const boards = await this.boardsService.findAll();
    return boards.map(Board.toResponse);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const board = await this.boardsService.findOne(id);
    return Board.toResponse(board);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    const board = await this.boardsService.update(id, updateBoardDto);
    return Board.toResponse(board);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const board = await this.boardsService.remove(id);
    return Board.toResponse(board);
  }
}
