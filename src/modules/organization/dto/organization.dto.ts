import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsUUID, IsString } from 'class-validator';


export class CreateOrganizationDto {
  @ApiProperty()
	@IsString()
  name: string;

  @ApiProperty()
	@IsUUID()
  created_by: string;
}

export class UpdateOrganizationDto extends PartialType(CreateOrganizationDto) {}

export class OrganizationDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  created_by: string;

  @ApiProperty()
  created_at: string
}

export class AttachStaffOrganizationDto {
  @ApiProperty()
	@IsUUID()
  organizationId: string;

  @ApiProperty()
	@IsUUID()
  userId: string;

  @ApiProperty()
	@IsUUID()
  created_by: string;
}
export class OrganizationUserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  orgId: string;

  @ApiProperty()
  organizationName: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  userName: string;
}