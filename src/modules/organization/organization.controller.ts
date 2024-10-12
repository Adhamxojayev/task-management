import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrganizationService } from './organization.service';
import * as dto from './dto/organization.dto';


@ApiTags('Organization')
@Controller('organization')
export class OrganizationController {
  constructor(private readonly service: OrganizationService) {}

  @Post('create')
  @ApiOperation({ summary: 'organization create' })
  @ApiCreatedResponse({ type: dto.CreateOrganizationDto })
  createOrganization(@Body() data: dto.CreateOrganizationDto): Promise< dto.CreateOrganizationDto > {
    return this.service.createOrganization(data)
  }

  @Get('get')
  @ApiOperation({ summary: 'get all organization' })
  @ApiResponse({ type: dto.OrganizationDto, isArray: true })
  getAllOrganization(): Promise< dto.OrganizationDto[] > {
    return this.service.getAllOrganization()
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'update organization' })
  @ApiResponse({ type: dto.OrganizationDto })
  updateOrganization(@Param('id', new ParseUUIDPipe()) organizationId: string, @Body() organization: dto.UpdateOrganizationDto): Promise< dto.OrganizationDto > {
    return this.service.updateOrganization(organizationId, organization)
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'delete organization' })
  @ApiResponse({ type: dto.OrganizationDto })
  deleteOrganization(@Param('id', new ParseUUIDPipe()) organizationId: string): Promise< dto.OrganizationDto > {
    return this.service.deleteOrganization(organizationId)
  }

  @Post('attach/staff')
  @ApiOperation({ summary: 'attach staff organization' })
  @ApiResponse({ type: dto.AttachStaffOrganizationDto })
  attachStaffOrganization(@Body() organization: dto.AttachStaffOrganizationDto): Promise< dto.AttachStaffOrganizationDto > {
    return this.service.attachStaffOrganization(organization)
  }

  @Get('user')
  @ApiOperation({ summary: 'get organization user' })
  @ApiResponse({ type: dto.OrganizationUserDto, isArray: true })
  getAOrganizationUser(): Promise< dto.OrganizationUserDto[] > {
    return this.service.getAOrganizationUser()
  }

}