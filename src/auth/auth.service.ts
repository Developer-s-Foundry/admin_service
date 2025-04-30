import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminRepository } from '../common/repository/adminRepository';
import { compareHash, generateJWT, hashString } from '../helpers/utils';
import { AdminDTO, AuthAdminDTO } from './dto/authdto';
import { IAdmin } from 'src/database/entities/admin.entity';
//import { AccountStatus, IAdmin, AdminRole, Admin  } from '../database/entities/admin.entity';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        @Inject('AdminRepository')
        private readonly adminRepository:  AdminRepository,
        private readonly jwtService: JwtService,
    ) {}

    public async registerAdmin(req: AdminDTO): Promise<{ message: string }> {
        const { email, password, name } = req; // Ensure `name` is destructured
    
        try {
            // Check if the admin already exists
            const existingAdmin = await this.adminRepository.findOneByEmail(email);
            if (existingAdmin) {
                throw new ConflictException('Email already exists');
            }
    
            // Hash the password
            const hashedPassword = await hashString(password);
          
            // Save the new admin to the database
            await this.adminRepository.add({ name, email, password: hashedPassword });

            return { message: 'Registration successful' };
        } catch (error) {
            console.error('Error in registerAdmin:', error);
            throw new InternalServerErrorException('Failed to register admin');
        }
    }

    public async loginAdmin(req: AuthAdminDTO): Promise<{ isSuccess: boolean, message?: string, token?: string }> {
        const { email, password } = req;
        
        const existingAdmin = await this.adminRepository.findOneByEmail(email);
        
        if (!existingAdmin) {
            throw new ConflictException('Invalid email or password');
        }
         
        const isPasswordValid = await compareHash(password, existingAdmin.password);
         
        if (!isPasswordValid) {
            throw new ConflictException('Invalid email or password');
        }

        const payload = { email: existingAdmin.email, admin_id: existingAdmin.admin_id };
        const token = this.jwtService.sign(payload);

        return { isSuccess: true, message: 'Login successful', token };
       
    }
}
