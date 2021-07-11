import { Injectable, NotFoundException } from '@nestjs/common';

import { TaskRepository } from './task.repository';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly taskRepository: TaskRepository) {}

  create(boardId: string, createTaskDto: CreateTaskDto) {
    const taskCreatable = { ...createTaskDto, boardId };
    const task = this.taskRepository.createTask(taskCreatable);
    return this.taskRepository.save(task);
  }

  findAllByBoardId(boardId: string) {
    return this.taskRepository.getAllByBoardId(boardId);
  }

  async findOneByBoardIdAndTaskId(boardId: string, taskId: string) {
    const task = await this.taskRepository.getByBoardIdAndTaskId(
      boardId,
      taskId,
    );
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async updateByBoardIdAndTaskId(
    boardId: string,
    taskId: string,
    updateTaskDto: UpdateTaskDto,
  ) {
    const task = await this.taskRepository.getByBoardIdAndTaskId(
      boardId,
      taskId,
    );
    if (!task) throw new NotFoundException('Task not found');

    return this.taskRepository.save({ ...task, ...updateTaskDto });
  }

  async removeByBoardIdAndTaskId(boardId: string, taskId: string) {
    const taskDeletable = await this.taskRepository.getByBoardIdAndTaskId(
      boardId,
      taskId,
    );
    if (!taskDeletable) throw new NotFoundException('Task not found');

    await this.taskRepository.deleteByBoardIdAndTaskId(boardId, taskId);

    return taskDeletable;
  }
}
