import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  static toResponse(task: Task) {
    return task;
  }
}
