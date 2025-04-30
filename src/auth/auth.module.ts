import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { Admin } from '../database/entities/admin.entity';
import { AdminRepository } from 'src/common/repository/adminRepository';

@Module({
  imports: [TypeOrmModule.forFeature([Admin])], 
  controllers: [AuthController],
  providers: [
    AuthService,
    {
        provide: 'AdminRepository',
        useClass: AdminRepository, 
    },
],
exports: [AuthService],
})
export class AuthModule {}