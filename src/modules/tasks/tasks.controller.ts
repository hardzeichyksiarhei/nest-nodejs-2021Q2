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
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { TasksService } from './tasks.service';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ResponseTaskDto } from './dto/response-task.dto';

import { Task } from './task.entity';

@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
@ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('boards/:boardId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The found record',
    type: ResponseTaskDto,
  })
  @ApiOperation({ summary: 'Create one Task 👻' })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @Param('boardId') boardId: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    const task = await this.tasksService.create(boardId, createTaskDto);
    return Task.toResponse(task);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The found records',
    type: [ResponseTaskDto],
  })
  @ApiOperation({ summary: 'Retrieve many Tasks 👻' })
  @Get()
  async findAllByBoardId(@Param('boardId') boardId: string) {
    const tasks = await this.tasksService.findAllByBoardId(boardId);
    return tasks.map(Task.toResponse);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The found record',
    type: ResponseTaskDto,
  })
  @ApiOperation({ summary: 'Retrieve one Task 👻' })
  @Get(':id')
  async findOneByBoardIdAndTaskId(
    @Param('boardId') boardId: string,
    @Param('id') taskId: string,
  ) {
    const task = await this.tasksService.findOneByBoardIdAndTaskId(
      boardId,
      taskId,
    );
    return Task.toResponse(task);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The updated record',
    type: ResponseTaskDto,
  })
  @ApiOperation({ summary: 'Update one Task 👻' })
  @Put(':id')
  async updateByBoardIdAndTaskId(
    @Param('boardId') boardId: string,
    @Param('id') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    const task = await this.tasksService.updateByBoardIdAndTaskId(
      boardId,
      taskId,
      updateTaskDto,
    );
    return Task.toResponse(task);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The deleted record',
    type: ResponseTaskDto,
  })
  @ApiOperation({ summary: 'Delete one Task 👻' })
  @Delete(':id')
  async removeByBoardIdAndTaskId(
    @Param('boardId') boardId: string,
    @Param('id') taskId: string,
  ) {
    const task = await this.tasksService.removeByBoardIdAndTaskId(
      boardId,
      taskId,
    );
    return Task.toResponse(task);
  }
}
