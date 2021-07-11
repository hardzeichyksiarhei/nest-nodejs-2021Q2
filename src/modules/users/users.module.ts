import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRepository } from './user.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import { TaskRepository } from '../tasks/task.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, TaskRepository])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
