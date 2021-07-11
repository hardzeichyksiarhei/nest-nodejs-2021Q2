import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

import { BoardsService } from './boards.service';

import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { ResponseBoardDto } from './dto/response-board.dto';

import { Board } from './board.entity';

@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
@ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The found record',
    type: ResponseBoardDto,
  })
  @ApiOperation({ summary: 'Create one Board 👻' })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createBoardDto: CreateBoardDto) {
    const board = await this.boardsService.create(createBoardDto);
    return Board.toResponse(board);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The found records',
    type: [ResponseBoardDto],
  })
  @ApiOperation({ summary: 'Retrieve many Boards 👻' })
  @Get()
  async findAll() {
    const boards = await this.boardsService.findAll();
    return boards.map(Board.toResponse);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The found record',
    type: ResponseBoardDto,
  })
  @ApiOperation({ summary: 'Retrieve one Board 👻' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const board = await this.boardsService.findOne(id);
    return Board.toResponse(board);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The updated record',
    type: ResponseBoardDto,
  })
  @ApiOperation({ summary: 'Update one Board 👻' })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    const board = await this.boardsService.update(id, updateBoardDto);
    return Board.toResponse(board);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The deleted record',
    type: ResponseBoardDto,
  })
  @ApiOperation({ summary: 'Delete one Board 👻' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const board = await this.boardsService.remove(id);
    return Board.toResponse(board);
  }
}
