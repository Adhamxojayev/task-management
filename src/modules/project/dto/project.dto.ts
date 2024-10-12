import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsUUID, IsString } from 'class-validator';


export class CreateProjectDto {
  @ApiProperty()
	@IsString()
  name: string;

  @ApiProperty()
  organizationId: string;

  @ApiProperty()
	@IsUUID()
  created_by: string;
}

export class UpdateProjectDto extends PartialType( OmitType(CreateProjectDto, ['organizationId'] as const) ) {}

export class ProjectDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  organizationId: string;

  @ApiProperty()
  created_by: string;

  @ApiProperty()
  created_at: Date;
}

export class StaffDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}

export class TaskDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  due_date: Date;

  @ApiProperty()
  done_at?: Date;

  @ApiProperty({ type: StaffDto })
  workers: StaffDto[];
}

export class ProjectTaskDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  organizationId: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty({type: TaskDto})
  tasks: TaskDto[]
}