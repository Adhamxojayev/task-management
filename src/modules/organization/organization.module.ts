import { Module } from '@nestjs/common';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';
import { OrganizationQuery } from './query/organization.query';

@Module({
  providers: [OrganizationService, OrganizationQuery],
  controllers: [OrganizationController],
})
export class OrganizationModule {}