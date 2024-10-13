import { Module } from '@nestjs/common';
import { StatisticsController } from './stat.controller';
import { StatisticsService } from './stat.service';
import { StatisticsQuery } from './query/stat.query';

@Module({
  providers: [StatisticsService, StatisticsQuery],
  controllers: [StatisticsController],
})
export class StatisticsModule {}