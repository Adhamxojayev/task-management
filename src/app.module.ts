import { Module } from '@nestjs/common';
import { DBModule } from './database/connection/postgres.module';
import { EnvModule } from './common/env/env.module';
import { Modules } from './modules';

@Module({
  imports: [
    DBModule,
    EnvModule,
    Modules,
  ],
})
export class AppModule {}
