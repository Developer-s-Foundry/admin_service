import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { Admin } from '../database/entities/admin.entity';
import { AdminRepository } from 'src/common/repository/adminRepository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your_jwt_secret', // Replace with your secret
      signOptions: { expiresIn: '1h' }, // Token expiration time
    })
  ], 
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