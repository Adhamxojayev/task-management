import { Injectable } from '@nestjs/common';
import { PostgresClient } from 'src/database/connection/postgres.service';
import * as dto from '../dto/project.dto';


@Injectable()
export class ProjectQuery {
  constructor(private readonly db: PostgresClient) {}

  private CREATE_PROJECT = `
    INSERT INTO projects ( name, created_by, org_id ) VALUES ( $1, $2, $3 )
		RETURNING *
  `;

  createProject(data: dto.CreateProjectDto): Promise< dto.ProjectDto > {
    return this.db.fetch(this.CREATE_PROJECT, data.name, data.created_by, data.organizationId)
  }

  private GET_ALL_PROJECT = `
    SELECT * FROM projects;
  `;

  getAllProject(): Promise< dto.ProjectDto[] > {
    return this.db.fetchAll(this.GET_ALL_PROJECT)
  }

  private UPDATE_PROJECT = `
    UPDATE projects 
      SET
        name = $2
    WHERE id = $1
    RETURNING *
  `;

  updateProject(projectId: string, data: dto.UpdateProjectDto): Promise< dto.ProjectDto > {
    return this.db.fetch(this.UPDATE_PROJECT, projectId, data.name)
  }

  private DELETE_PROJECT = `
    DELETE FROM projects WHERE id = $1 RETURNING *
  `;

  deleteProject(projectId: string): Promise< dto.ProjectDto > {
    return this.db.fetch(this.DELETE_PROJECT, projectId)
  }

  private GET_PROJECT_ALL_TASKS = `
  SELECT 
    p.id,
    p.name,
    p.org_id AS "organizationId",
    p.created_at,
    json_agg(
      json_build_object(
        'id', t.id,
        'status', t.status,
        'due_date', t.due_date,
        'done_at', t.done_at,
        'workers', COALESCE((
        SELECT json_agg(
          json_build_object(
            'id', u.id,
            'name', u.name
          )
        )
        FROM users u
        WHERE u.id = t.worker_user_id
        ), '[]'::json )
      )
    ) AS tasks
  FROM projects p
  LEFT JOIN tasks t ON p.id = t.project_id
  WHERE p.id = $1
  GROUP BY p.id;
  `;

  getProjectTask(projectId: string): Promise< dto.ProjectTaskDto > {
    return this.db.fetch(this.GET_PROJECT_ALL_TASKS, projectId)
  }
}