import * as bcrypt from 'bcrypt';
import { Injectable, NotFoundException } from '@nestjs/common';

import { UserRepository } from './user.repository';
import { TaskRepository } from '../tasks/task.repository';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly taskRepository: TaskRepository,
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.getAll();
  }

  async findOne(id: string) {
    const user = await this.userRepository.getById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.getById(id);
    if (!user) throw new NotFoundException('User not found');

    if (updateUserDto.password) {
      updateUserDto.password = bcrypt.hashSync(updateUserDto.password, 10);
    }

    return this.userRepository.save({ ...user, ...updateUserDto });
  }

  async remove(id: string) {
    const userDeletable = await this.userRepository.getById(id);
    if (!userDeletable) throw new NotFoundException('User not found');

    await this.userRepository.deleteById(id);

    await this.taskRepository.update({ userId: id }, { userId: null });

    return userDeletable;
  }
}
