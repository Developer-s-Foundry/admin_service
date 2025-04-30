// import { Controller, Post, Body } from '@nestjs/common';
// import { AuthService } from './auth.service';

// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @Post('register')
//   async register(@Body() req: { email: string, password: string }): Promise<any> {
//     const { email, password } = req;
// return this.authService.registerAdmin(email, password);
//   }
// }

import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminDTO } from './dto/authdto'; // Import the DTO

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() req: AdminDTO): Promise<any> {
    return this.authService.registerAdmin(req); // Pass the DTO to the service
  }
}