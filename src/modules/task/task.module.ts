import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskQuery } from './query/task.query';

@Module({
  providers: [TaskService, TaskQuery],
  controllers: [TaskController],
})
export class TaskModule {}