import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { createDocument } from './config/swagger';

async function bootstrap() {
  const PORT = process.env.PORT ?? 4004;
  const app = await NestFactory.create(AppModule);

  SwaggerModule.setup('/api-docs', app, createDocument(app));

  await app.listen(PORT);
}
bootstrap();
