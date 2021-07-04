import { EntityRepository, Repository } from 'typeorm';

import { Task } from './task.entity';

import { UpdateTaskDto } from './dto/update-task.dto';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  createTask(task: Omit<Task, 'id'>) {
    return this.create(task);
  }

  getAllByBoardId(boardId: string) {
    return this.find({ boardId });
  }

  getByBoardIdAndTaskId(boardId: string, taskId: string) {
    return this.findOne({ boardId, id: taskId });
  }

  updateByBoardIdAndTaskId(
    boardId: string,
    taskId: string,
    task: UpdateTaskDto,
  ) {
    return this.update({ id: taskId, boardId }, task);
  }

  deleteByBoardIdAndTaskId(boardId: string, taskId: string) {
    return this.delete({ boardId, id: taskId });
  }
}
