import { Injectable, UnauthorizedException } from '@nestjs/common';
import { OrganizationQuery } from './query/organization.query';
import * as dto from './dto/organization.dto';


@Injectable()
export class OrganizationService {
  constructor( private model: OrganizationQuery ) {}

  async createOrganization(organization: dto.CreateOrganizationDto): Promise< dto.CreateOrganizationDto > {
    return this.model.createOrganization(organization);
  }

  async getAllOrganization(): Promise< dto.OrganizationDto[] > {
    return this.model.getAllOrganization();
  }

  async updateOrganization(organizationId: string, organization: dto.UpdateOrganizationDto): Promise< dto.OrganizationDto > {
    return this.model.updateOrganization(organizationId, organization);
  }

  async deleteOrganization(organizationId: string): Promise< dto.OrganizationDto > {
    return this.model.deleteOrganization(organizationId);
  }

  async attachStaffOrganization(organization: dto.AttachStaffOrganizationDto): Promise< dto.AttachStaffOrganizationDto > {
    return this.model.attachStaffOrganization(organization);
  }

  async getOrganizationUser(): Promise< dto.OrganizationUserDto[] > {
    return this.model.getOrganizationUser();
  }

  async getOrganizationUserByIdTasks(userId: string): Promise< dto.OrganizationUserTasksDto[] > {
    return this.model.getOrganizationUserByIdTasks(userId);
  }
}