import { IsNotEmpty, IsInt, Length } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsInt()
  order: number;

  description: string;

  @Length(36)
  userId: string | null;

  @Length(36)
  boardId: string | null;

  @Length(36)
  columnId: string | null;
}
