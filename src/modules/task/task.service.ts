import { Injectable } from '@nestjs/common';
import { TaskQuery } from './query/task.query';
import * as dto from './dto/task.dto';


@Injectable()
export class TaskService {
  constructor( private model: TaskQuery ) {}

  async createTask(data: dto.CreateTaskDto): Promise< dto.TaskDto > {
    return this.model.createTask(data);
  }

  async getAllTask(): Promise< dto.TaskDto[] > {
    return this.model.getAllTask();
  }

  async updateTask(taskId: string, data: dto.UpdateTaskDto): Promise< dto.TaskDto > {
    return this.model.updateTask(taskId, data);
  }

  async deleteTask(taskId: string): Promise< dto.TaskDto > {
    return this.model.deleteTask(taskId);
  }
}