import { Injectable } from '@nestjs/common';
import { PostgresClient } from 'src/database/connection/postgres.service';
import * as dto from '../dto/stat.dto';

@Injectable()
export class StatisticsQuery {
  constructor(private readonly db: PostgresClient) {}


  private GET_ORGANIZATION_STATISTICS = `
    SELECT
      o.id,
      o.name AS "organizationName",
      COUNT(DISTINCT p.id) AS "projectCount",
      COUNT(t.id) AS "taskCount"
    FROM organizations o
    LEFT JOIN projects p ON o.id = p.org_id
    LEFT JOIN tasks t ON p.id = t.project_id
    WHERE o.id = $1
    GROUP BY o.id, o.name;
  `;

  getStatOrganizationById(organizationId: string): Promise< dto.OrganizationStatDto > {
    return this.db.fetch(this.GET_ORGANIZATION_STATISTICS, organizationId)
  }

  private GET_PROJECT_STATISTICS = `
    SELECT
      p.id, 
      p.name AS "projectName",
      o.name AS "organizationName",
      COUNT(t.id) AS "taskCount"
    FROM projects p
    LEFT JOIN organizations o ON o.id = p.org_id
    LEFT JOIN tasks t ON p.id = t.project_id
    WHERE p.id = $1
    GROUP BY o.id, o.name, p.id, p.name;
  `;

  getStatProjectById(projectId: string): Promise< dto.ProjectStatDto > {
    return this.db.fetch(this.GET_PROJECT_STATISTICS, projectId)
  }

  private GET_ALL_STATISTICS = `
    SELECT 
      COUNT(DISTINCT o.id) AS "organizationCount",
      COUNT(DISTINCT p.id) AS "projectCount",
      COUNT(t.id) AS "taskCount"
    FROM organizations o
    LEFT JOIN projects p ON o.id = p.org_id
    LEFT JOIN tasks t ON p.id = t.project_id;
  `;

  getAllStat(): Promise< dto.StatDto > {
    return this.db.fetch(this.GET_ALL_STATISTICS)
  }
}