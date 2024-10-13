import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { ProjectQuery } from './query/project.query';

@Module({
  providers: [ProjectService, ProjectQuery],
  controllers: [ProjectController],
})
export class ProjectModule {}