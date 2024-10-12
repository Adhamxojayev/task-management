import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../../enums/role.enum';
import { IsEnum, IsString, IsUUID } from 'class-validator';


export class UserDto {
	@ApiProperty()
  id: string;

	@ApiProperty()
	name: string;

	@ApiProperty()
	role: Role;

	@ApiProperty()
	created_by: string;
}

export class CreateUserDto {
	@ApiProperty()
	@IsString()
	name: string;

	@ApiProperty({enum: Role})
	@IsEnum(Role)
	role: Role;

	@ApiProperty()
	@IsUUID()
	created_by: string;
}

export class CreateAdminDto {
	@ApiProperty()
	@IsString()
	name: string;
}