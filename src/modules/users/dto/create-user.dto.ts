import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  name: string;

  @IsNotEmpty()
  login: string;

  @MinLength(6)
  password: string;
}
