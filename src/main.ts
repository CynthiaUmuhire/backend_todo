import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import dataBase from './helpers/dataBase';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await dataBase();

  const options = new DocumentBuilder()
    .setTitle('Todo API')
    .setDescription('This is a Todo API')
    .setVersion('1.0')
    .addServer('http://localhost:3000/', 'Local environment')
    .addTag('todo')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('todo', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
