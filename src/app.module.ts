import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { config } from './config/config.service';
import { dataSourceOptions } from './database/datasource';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonLoggerService } from './config/logger.service';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
  ],
 
  controllers: [AppController],
  providers: [AppService, WinstonLoggerService],
})
export class AppModule {}
