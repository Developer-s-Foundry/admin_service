import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { postgresLoader } from './database/datasource';
import { WinstonLoggerService } from './config/logger.service';
import { config } from './config/config.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CustomErrorFilter } from './helpers/errorHandler';

async function bootstrap() {
  const appConfig = config()

  //initialize postgres connection
  await postgresLoader();

  const app = await NestFactory.create(AppModule);

  // Register global exception filter
  app.useGlobalFilters(new CustomErrorFilter())

  //set up custom logger
  const logger = app.get(WinstonLoggerService);  // Get the WinstonLoggerService instance
  app.useLogger(logger);

  //set up swagger api documentation
  const options = new DocumentBuilder()
    .setTitle('Admin Service')
    .setDescription('The API description for Admin Service')
    .setVersion('1.0')
    .addBearerAuth() 
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document); 

  //start the application
  const port = appConfig.PORT.APP_PORT
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
