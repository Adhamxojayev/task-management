import { Injectable } from '@nestjs/common';
import 'dotenv/config';

@Injectable()
export class EnvService {
  private env = process.env;
  ENV = {
    PORT: this.env.PORT,
    postgres: {
      DB_USER: this.env.DB_USER,
      DB_HOST: this.env.DB_HOST,
      DB_DATABASE: this.env.DB_DATABASE,
      DB_PASSWORD: this.env.DB_PASSWORD,
      DB_PORT: this.env.DB_PORT,
    }
  };
}
