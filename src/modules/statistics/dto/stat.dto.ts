import { ApiProperty } from '@nestjs/swagger';
  
export class OrganizationStatDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  organizationName: string;

  @ApiProperty()
  projectCount: number;

  @ApiProperty()
  taskCount: number;
}

export class ProjectStatDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  organizationName: string;

  @ApiProperty()
  projectName: string;

  @ApiProperty()
  taskCount: number;
}

export class StatDto {
  @ApiProperty()
  organizationCount: number;

  @ApiProperty()
  projectCount: number;

  @ApiProperty()
  taskCount: number;
}