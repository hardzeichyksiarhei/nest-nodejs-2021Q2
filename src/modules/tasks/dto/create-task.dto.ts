import {
  IsNotEmpty,
  IsInt,
  IsString,
  IsUUID,
  IsOptional,
} from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsInt()
  order: number;

  @IsString()
  description: string;

  @IsOptional()
  @IsUUID(4)
  userId: string | null;

  @IsOptional()
  @IsUUID(4)
  boardId: string | null;

  @IsOptional()
  @IsUUID(4)
  columnId: string | null;
}
