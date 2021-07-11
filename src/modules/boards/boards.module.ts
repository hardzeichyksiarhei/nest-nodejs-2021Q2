import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BoardRepository } from './board.repository';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';

import { TaskRepository } from '../tasks/task.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BoardRepository, TaskRepository])],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
