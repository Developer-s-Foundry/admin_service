import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configs } from './config/config.service';
import { dataSourceOptions } from './database/datasource';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonLoggerService } from './config/logger.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configs]
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
  ],  
  providers: [ WinstonLoggerService]
})
export class AppModule {}

