import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../../enums/role.enum';


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
