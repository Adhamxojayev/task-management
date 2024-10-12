import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProjectService } from './project.service';
import * as dto from './dto/project.dto';


@ApiTags('Project')
@Controller('project')
export class ProjectController {
  constructor(private readonly service: ProjectService) {}

  @Post('create')
  @ApiOperation({ summary: 'project create' })
  @ApiCreatedResponse({ type: dto.ProjectDto })
  createProject(@Body() data: dto.CreateProjectDto): Promise< dto.ProjectDto > {
    return this.service.createProject(data)
  }

  @Get('get/list')
  @ApiOperation({ summary: 'get all projects' })
  @ApiResponse({ type: dto.ProjectDto, isArray: true })
  getAllProject(): Promise< dto.ProjectDto[] > {
    return this.service.getAllProject()
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'update project' })
  @ApiResponse({ type: dto.ProjectDto })
  updateProject(@Param('id', new ParseUUIDPipe()) projectId: string, @Body() data: dto.UpdateProjectDto): Promise< dto.ProjectDto > {
    return this.service.updateProject(projectId, data)
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'delete project' })
  @ApiResponse({ type: dto.ProjectDto })
  deleteProject(@Param('id', new ParseUUIDPipe()) projectId: string): Promise< dto.ProjectDto > {
    return this.service.deleteProject(projectId)
  }

  @Get('get/:id/tasks')
  @ApiOperation({ summary: 'List all tasks in the project section' })
  @ApiResponse({ type: dto.ProjectTaskDto})
  getProjectTask(@Param('id', new ParseUUIDPipe()) projectId: string): Promise< dto.ProjectTaskDto > {
    return this.service.getProjectTask(projectId)
  }
}