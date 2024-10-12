import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { OrganizationModule } from './organization/organization.module';
import { AdminRoleCheckMiddleware } from 'src/common/middlewares/check-role.middleware';
import { OrganizationController } from './organization/organization.controller';
import { UserController } from './user/user.controller';
import { ProjectModule } from './project/project.module';


@Module({
  imports: [
    UserModule,
		OrganizationModule,
    ProjectModule
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