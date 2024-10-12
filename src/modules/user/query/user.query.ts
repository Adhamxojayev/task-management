import { Injectable } from '@nestjs/common';
import { PostgresClient } from 'src/database/connection/postgres.service';
import * as dto from '../dto/user.dto';


@Injectable()
export class UserQuery {
  constructor(private readonly db: PostgresClient) {}

  private GET_USER = `
    SELECT * FROM users WHERE id = $1;
  `;

  findOneUser(id: string): Promise< dto.UserDto > {
    return this.db.fetch(this.GET_USER, id)
  }
}