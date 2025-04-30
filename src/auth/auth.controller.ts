import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminDTO, AuthAdminDTO } from './dto/authdto'; // Import the DTO
import { Response } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() req: AdminDTO): Promise<any> {
    return this.authService.registerAdmin(req); 
  }

  @Post('login')
  async login(@Body() req: AuthAdminDTO, @Res() res: Response): Promise<any> {
    const { token, message } = await this.authService.loginAdmin(req);

    // Set the token in the response headers
    res.setHeader('Authorization', `Bearer ${token}`);
    return res.status(HttpStatus.OK).json({
      isSuccess: true,
      message,
    });
  }
}