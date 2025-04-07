import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Run migrations
  const dataSource = app.get(DataSource);
  await dataSource.runMigrations();

  await app.listen(3000);
}
bootstrap();