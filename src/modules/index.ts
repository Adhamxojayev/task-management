import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { OrganizationModule } from './organization/organization.module';
import { AdminRoleCheckMiddleware } from 'src/common/middlewares/check-role.middleware';
import { OrganizationController } from './organization/organization.controller';
import { UserController } from './user/user.controller';


@Module({
  imports: [
    UserModule,
		OrganizationModule
  ],
})
export class Modules {
    configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminRoleCheckMiddleware)
      .exclude('user/create/admin')
      .forRoutes(OrganizationController, UserController);
  }
}