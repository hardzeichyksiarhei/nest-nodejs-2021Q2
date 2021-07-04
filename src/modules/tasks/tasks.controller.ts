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
import { TasksService } from './tasks.service';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

import { Task } from './task.entity';

@Controller('boards/:boardId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @HttpCode(StatusCodes.CREATED)
  @Post()
  async create(
    @Param('boardId') boardId: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    const task = await this.tasksService.create(boardId, createTaskDto);
    return Task.toResponse(task);
  }

  @Get()
  async findAllByBoardId(@Param('boardId') boardId: string) {
    const tasks = await this.tasksService.findAllByBoardId(boardId);
    return tasks.map(Task.toResponse);
  }

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
