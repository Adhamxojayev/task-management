import { Injectable } from '@nestjs/common';
import { StatisticsQuery } from './query/stat.query';
import * as dto from './dto/stat.dto';


@Injectable()
export class StatisticsService {
  constructor( private model: StatisticsQuery ) {}

  async getStatOrganizationById(organizationId: string): Promise< dto.OrganizationStatDto > {
    return this.model.getStatOrganizationById(organizationId);
  }

  async getStatProjectById(projectId: string): Promise< dto.ProjectStatDto > {
    return this.model.getStatProjectById(projectId);
  }

  async getAllStat(): Promise< dto.StatDto > {
    return this.model.getAllStat();
  }
}