import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsNotEmpty()
  login: string;

  @MinLength(6)
  password: string;
}
