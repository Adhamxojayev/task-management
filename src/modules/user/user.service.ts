import { Injectable } from '@nestjs/common';
import { UserQuery } from './query/user.query';
import * as dto from './dto/user.dto';


@Injectable()
export class UserService {
  constructor( private model: UserQuery ) {}

  async findOneUser(id: string): Promise< dto.UserDto > {
    return this.model.findOneUser(id);
  }
}