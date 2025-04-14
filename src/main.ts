import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { postgresLoader } from './database/datasource';
import { WinstonLoggerService } from './config/logger.service';
import { config } from './config/config.service';

async function bootstrap() {
  const appConfig = config()
  await postgresLoader();
  const app = await NestFactory.create(AppModule);
  const logger = app.get(WinstonLoggerService);  // Get the WinstonLoggerService instance
  app.useLogger(logger);
  const port = appConfig.PORT.APP_PORT
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
