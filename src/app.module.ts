// Removed duplicate definition

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AdminModule } from './admin/admin.module'; // Import AdminModule

@Module({
  imports: [DatabaseModule, AdminModule], // Add AdminModule here
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}