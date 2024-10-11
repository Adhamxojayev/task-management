import { Inject } from '@nestjs/common';
import { PG_CONNECTION } from '../../config/postgres';
import { Pool, PoolClient } from 'pg';

export class PostgresClient {
  constructor(@Inject(PG_CONNECTION) private readonly db: Pool) {}
  public ROLLBACK = 'ROLLBACK';
  public COMMIT = 'COMMIT';

  async fetchAll<T>(SQL: string, ...params: any): Promise<T | any[]> {
    const client: PoolClient = await this.db.connect();
    try {
      const { rows } = await client.query(SQL, params.length ? params : null);
      return rows as T;
    } catch (error) {
      console.log(error, SQL);
    } finally {
      client.release();
    }
  }

  async fetch<T>(SQL: string, ...params: any): Promise<T | undefined> {
    const client: PoolClient = await this.db.connect();
    try {
      const {
        rows: [row],
      } = await client.query(SQL, params.length ? params : null);
      return row as T;
    } catch (error) {
      console.log(error, SQL);
    } finally {
      client.release();
    }
  }

  async getPgClient(begin: 'BEGIN'): Promise<PoolClient> {
    try {
      const client: PoolClient = await this.db.connect();
      client.query(begin);

      return client;
    } catch (error) {
      console.log(error);
    }
  }

  async transaction<T>(poolClient: PoolClient, SQL: string, ...params: any): Promise<T | undefined> {
    try {
      const {
        rows: [row],
      } = await poolClient.query(SQL, params.length ? params : null);
      return row as T;
    } catch (error) {
      console.log(error, SQL);
    }
  }
}
