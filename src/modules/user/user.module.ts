import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserQuery } from './query/user.query';

@Module({
  providers: [UserService, UserQuery],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}