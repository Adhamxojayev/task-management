import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StatisticsService } from './stat.service';
import * as dto from './dto/stat.dto';


@ApiTags('Statistics')
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly service: StatisticsService) {}

  @Get('organization/:id')
  @ApiOperation({ summary: 'get statistics by organization id' })
  @ApiResponse({ type: dto.OrganizationStatDto })
  getStatOrganizationById(@Param('id', new ParseUUIDPipe()) organizationId: string): Promise< dto.OrganizationStatDto > {
    return this.service.getStatOrganizationById(organizationId)
  }

  @Get('project/:id')
  @ApiOperation({ summary: 'get statistics by project id' })
  @ApiResponse({ type: dto.ProjectStatDto })
  getStatProjectById(@Param('id', new ParseUUIDPipe()) projectId: string): Promise< dto.ProjectStatDto > {
    return this.service.getStatProjectById(projectId)
  }

  @Get('all')
  @ApiOperation({ summary: 'get all statistics' })
  @ApiResponse({ type: dto.StatDto })
  getAllStat(): Promise< dto.StatDto > {
    return this.service.getAllStat()
  }
}