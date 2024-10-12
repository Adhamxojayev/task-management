import { Injectable } from '@nestjs/common';
import { PostgresClient } from 'src/database/connection/postgres.service';
import * as dto from '../dto/task.dto';

@Injectable()
export class TaskQuery {
  constructor(private readonly db: PostgresClient) {}


  private CREATE_TASK = `
    INSERT INTO tasks ( project_id, worker_user_id, created_by, due_date ) VALUES ( $1, $2, $3, $4 )
		RETURNING *
  `;

  createTask(data: dto.CreateTaskDto): Promise< dto.TaskDto > {
    return this.db.fetch(this.CREATE_TASK, data.projectId, data.workerUserId, data.created_by, data.due_date)
  }

  private GET_ALL_TASK = `
    SELECT 
      *
    FROM tasks 
  `;

  getAllTask(): Promise< dto.TaskDto[] > {
    return this.db.fetchAll(this.GET_ALL_TASK)
  }

  private UPDATE_TASK = `
    UPDATE tasks
      SET
        status = $2,
        done_at = $3
    WHERE id = $1
    RETURNING *
  `;

  updateTask(taskId: string, data: dto.UpdateTaskDto): Promise< dto.TaskDto > {
    return this.db.fetch(this.UPDATE_TASK, taskId, data.status, data.doneAt)
  }

  private DELETE_TASK = `
    DELETE FROM tasks WHERE id = $1 RETURNING *
  `;

  deleteTask(taskId: string): Promise< dto.TaskDto > {
    return this.db.fetch(this.DELETE_TASK, taskId)
  }
}