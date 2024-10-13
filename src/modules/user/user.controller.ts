import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import * as dto from './dto/user.dto';


@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}


  @Post('create/admin')
  @ApiOperation({ summary: 'admin create' })
  @ApiCreatedResponse({ type: dto.UserDto })
  createAdmin(@Body() data: dto.CreateAdminDto): Promise< dto.UserDto > {
    return this.service.createAdmin(data)
  }

  @Get('get/list')
  @ApiOperation({ summary: 'get all users' })
  @ApiResponse({ type: dto.UserDto, isArray: true })
  getAllUsers(): Promise< dto.UserDto[] > {
    return this.service.getAllUsers()
  }

  @Post('create')
  @ApiOperation({ summary: 'user create' })
  @ApiCreatedResponse({ type: dto.UserDto})
  createUser(@Body() data: dto.CreateUserDto): Promise< dto.UserDto > {
    return this.service.createUser(data)
  }
}