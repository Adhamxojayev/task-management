import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsUUID, IsString } from 'class-validator';
import { TaskStatus } from 'src/enums/role.enum';
  
export class TaskDto {
  @ApiProperty()
  id: string;

  @ApiProperty({enum: TaskStatus})
  status: TaskStatus;

  @ApiProperty()
  project_id: string;

  @ApiProperty()
  worker_user_id: string;

  @ApiProperty()
  created_by: string;

  @ApiProperty()
	due_date: Date;

	@ApiProperty()
	done_at: Date;
}

export class CreateTaskDto {
  @ApiProperty()
	@IsUUID()
  projectId: string;

  @ApiProperty()
	@IsUUID()
  workerUserId: string;

	@ApiProperty()
	@IsUUID()
	created_by: string;

  @ApiProperty()
	due_date: Date;
}

export class UpdateTaskDto {
  @ApiProperty({enum: TaskStatus})
  status: TaskStatus;

  @ApiProperty()
	doneAt: Date;
}
