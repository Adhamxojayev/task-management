import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TaskService } from './task.service';
import * as dto from './dto/task.dto';


@ApiTags('Task')
@Controller('task')
export class TaskController {
  constructor(private readonly service: TaskService) {}

  @Post('create')
  @ApiOperation({ summary: 'task create' })
  @ApiCreatedResponse({ type: dto.TaskDto })
  createTask(@Body() data: dto.CreateTaskDto): Promise< dto.TaskDto > {
    return this.service.createTask(data)
  }

  @Get('get/list')
  @ApiOperation({ summary: 'get all tasks' })
  @ApiResponse({ type: dto.TaskDto, isArray: true })
  getAllTask(): Promise< dto.TaskDto[] > {
    return this.service.getAllTask()
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'update task' })
  @ApiResponse({ type: dto.TaskDto })
  updateTask(@Param('id', new ParseUUIDPipe()) taskId: string, @Body() data: dto.UpdateTaskDto): Promise< dto.TaskDto > {
    return this.service.updateTask(taskId, data)
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'delete task' })
  @ApiResponse({ type: dto.TaskDto })
  deleteTask(@Param('id', new ParseUUIDPipe()) taskId: string): Promise< dto.TaskDto > {
    return this.service.deleteTask(taskId)
  }

}