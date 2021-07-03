import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  readonly name: string;

  @IsNotEmpty()
  readonly login: string;

  @MinLength(6)
  readonly password: string;
}
