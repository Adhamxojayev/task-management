import { Pool } from 'pg';
import { EnvService } from 'src/common/env/env.service';

const { ENV: { postgres } } = new EnvService();

export const PG_CONNECTION = 'PG_CONNECTION';
export const dbProvider = {
  provide: PG_CONNECTION,
  useValue: new Pool({
    user: postgres.DB_USER,
    host: postgres.DB_HOST,
    database: postgres.DB_DATABASE,
    password: postgres.DB_PASSWORD,
    port: Number(postgres.DB_PORT),
  }),
};