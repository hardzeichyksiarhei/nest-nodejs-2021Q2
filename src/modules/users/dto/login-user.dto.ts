import { IsNotEmpty, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
