import { Injectable } from '@nestjs/common';
import { ProjectQuery } from './query/project.query';
import * as dto from './dto/project.dto';


@Injectable()
export class ProjectService {
  constructor( private model: ProjectQuery ) {}

  async createProject(data: dto.CreateProjectDto): Promise< dto.ProjectDto > {
    return this.model.createProject(data);
  }

  async getAllProject(): Promise< dto.ProjectDto[] > {
    return this.model.getAllProject();
  }

  async updateProject(projectId: string, data: dto.UpdateProjectDto): Promise< dto.ProjectDto > {
    return this.model.updateProject(projectId, data);
  }

  async deleteProject(projectId: string): Promise< dto.ProjectDto > {
    return this.model.deleteProject(projectId);
  }

  async getProjectTask(projectId: string): Promise< dto.ProjectTaskDto > {
    return this.model.getProjectTask(projectId);
  }
}