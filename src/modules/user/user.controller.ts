import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import * as dto from './dto/user.dto';


@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

}