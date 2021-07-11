import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsInt,
  IsString,
  IsUUID,
  IsOptional,
} from 'class-validator';

export class CreateTaskDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsInt()
  order: number;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID(4)
  userId: string | null;

  @ApiProperty()
  @IsOptional()
  @IsUUID(4)
  boardId: string | null;

  @ApiProperty()
  @IsOptional()
  @IsUUID(4)
  columnId: string | null;
}
