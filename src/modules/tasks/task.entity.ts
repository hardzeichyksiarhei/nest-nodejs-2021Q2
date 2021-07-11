import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ResponseTaskDto } from './dto/response-task.dto';

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar')
  title = 'Task';

  @Column('integer')
  order = 0;

  @Column('text')
  description = '';

  @Column('varchar', { length: 36, nullable: true })
  userId!: string | null;

  @Column('varchar', { length: 36, nullable: true })
  boardId!: string | null;

  @Column('varchar', { length: 36, nullable: true })
  columnId!: string | null;

  static toResponse(task: ResponseTaskDto) {
    return task;
  }
}
