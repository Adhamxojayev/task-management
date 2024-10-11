import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

export function createDocument(app: INestApplication): OpenAPIObject {
  const builder = new DocumentBuilder()
    .setDescription('API description')
    .setTitle('task-management')
    .setVersion('1.0');

  for (const tag of ['1.0']) {
    builder.addTag(tag);
  }

  const options = builder.build();
  return SwaggerModule.createDocument(app, options);
}