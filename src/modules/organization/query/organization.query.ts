import { Injectable } from '@nestjs/common';
import { PostgresClient } from 'src/database/connection/postgres.service';
import * as dto from '../dto/organization.dto';


@Injectable()
export class OrganizationQuery {
  constructor(private readonly db: PostgresClient) {}

  private CREATE_ORGANIZATION = `
    INSERT INTO organizations ( name, created_by ) VALUES ( $1, $2 )
		RETURNING *
  `;

  createOrganization(organization: dto.CreateOrganizationDto): Promise< dto.CreateOrganizationDto > {
    return this.db.fetch(this.CREATE_ORGANIZATION, organization.name, organization.created_by)
  }

  private GET_ALL_ORGANIZATION = `
    SELECT * FROM organizations;
  `;

  getAllOrganization(): Promise< dto.OrganizationDto[] > {
    return this.db.fetchAll(this.GET_ALL_ORGANIZATION)
  }

  private UPDATE_ORGANIZATION = `
    UPDATE organizations 
      SET
        name = $2
    WHERE id = $1
    RETURNING *
  `;

  updateOrganization(organizationId: string, organization: dto.UpdateOrganizationDto): Promise< dto.OrganizationDto > {
    return this.db.fetch(this.UPDATE_ORGANIZATION, organizationId, organization.name)
  }

  private DELETE_ORGANIZATION = `
    DELETE FROM organizations WHERE id = $1 RETURNING *
  `;

  deleteOrganization(organizationId: string): Promise< dto.OrganizationDto > {
    return this.db.fetch(this.DELETE_ORGANIZATION, organizationId)
  }

  private ATTACH_STAFF_ORGANIZATION = `
    INSERT INTO organization_user (org_id, user_id) VALUES ($1, $2) RETURNING *
  `;

  attachStaffOrganization(organization: dto.AttachStaffOrganizationDto): Promise< dto.AttachStaffOrganizationDto > {
    return this.db.fetch(this.ATTACH_STAFF_ORGANIZATION, organization.organizationId, organization.userId)
  }

  private GET_ORGANIZATION_USER = `
    SELECT
      ou.id,
      ou.org_id AS "orgId",
      o.name AS "organizationName",
      ou.user_id AS "userId",
      u.name AS "userName"
    FROM organization_user AS ou
    JOIN organizations o ON o.id = ou.org_id
    JOIN users u ON u.id = ou.user_id
  `;

  getOrganizationUser(): Promise< dto.OrganizationUserDto[] > {
    return this.db.fetchAll(this.GET_ORGANIZATION_USER)
  }

  private GET_ORGANIZATION_USER_BY_ID = `
    SELECT
      t.id,
      p.name AS project_name,
      t.status,
      t.due_date,
      t.done_at,
      CONCAT(
        EXTRACT(DAY FROM (due_date - done_at)), ' days, ',
        EXTRACT(HOUR FROM (due_date - done_at)), ' hours, ',
        EXTRACT(MINUTE FROM (due_date - done_at)), ' minutes, ',
        EXTRACT(SECOND FROM (due_date - done_at)), ' seconds'
    ) AS time_taken
    FROM tasks t
    JOIN projects p ON t.project_id = p.id
    JOIN organization_user ou ON t.worker_user_id = ou.user_id
    JOIN users u ON ou.user_id = u.id
    WHERE ou.user_id = $1
    ORDER BY p.name, t.due_date;
  `;

  getOrganizationUserByIdTasks(userId: string): Promise< dto.OrganizationUserTasksDto[] > {
    return this.db.fetchAll(this.GET_ORGANIZATION_USER_BY_ID, userId)
  }
}