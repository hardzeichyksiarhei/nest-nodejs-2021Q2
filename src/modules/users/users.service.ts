import { Injectable, NotFoundException } from '@nestjs/common';
import { getCustomRepository } from 'typeorm';

import { UserRepository } from './user.repository';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    const userRepository = getCustomRepository(UserRepository);
    const user = userRepository.create(createUserDto);
    return userRepository.save(user);
  }

  findAll() {
    const userRepository = getCustomRepository(UserRepository);
    return userRepository.getAll();
  }

  async findOne(id: string) {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.getById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.getById(id);
    if (!user) throw new NotFoundException('User not found');

    return userRepository.save({ ...user, ...updateUserDto });
  }

  async remove(id: string) {
    const userRepository = getCustomRepository(UserRepository);
    const userDeletable = await userRepository.getById(id);
    if (!userDeletable) throw new NotFoundException('User not found');

    await userRepository.deleteById(id);

    // const taskRepository = getCustomRepository(TaskRepository);
    // await taskRepository.update({ userId: id }, { userId: null });

    return userDeletable;
  }
}
