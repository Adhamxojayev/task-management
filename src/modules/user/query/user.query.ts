import { Injectable } from '@nestjs/common';
import { PostgresClient } from 'src/database/connection/postgres.service';
import * as dto from '../dto/user.dto';
import { Role } from 'src/enums/role.enum';

@Injectable()
export class UserQuery {
  constructor(private readonly db: PostgresClient) {}

  private GET_USER = `
    SELECT * FROM users WHERE id = $1;
  `;

  findOneUser(id: string): Promise< dto.UserDto > {
    return this.db.fetch(this.GET_USER, id)
  }

  private CREATE_ADMIN = `
    INSERT INTO users (name, role) VALUES($1, $2) RETURNING *;
  `;

  createAdmin(data: dto.CreateAdminDto): Promise< dto.UserDto > {
    return this.db.fetch(this.CREATE_ADMIN, data.name, Role.ADMIN);
  }

   private GET_ALL_USER = `
    SELECT * FROM users;
  `;

  findAllUser(): Promise< dto.UserDto[] > {
    return this.db.fetchAll(this.GET_ALL_USER)
  }

  private CREATE_USER = `
    INSERT INTO users (name, role, created_by) VALUES($1, $2, $3) RETURNING *;
  `;

  createUser(data: dto.CreateUserDto): Promise< dto.UserDto > {
    return this.db.fetch(this.CREATE_USER, data.name, data.role, data.created_by);
  }
}