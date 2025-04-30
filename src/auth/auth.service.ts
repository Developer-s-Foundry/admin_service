import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminRepository } from '../common/repository/adminRepository';
import { hashString } from '../helpers/utils';
import { AdminDTO } from './dto/authdto';
//import { AccountStatus, IAdmin, AdminRole, Admin  } from '../database/entities/admin.entity';

@Injectable()
export class AuthService {
    constructor(
        @Inject('AdminRepository')
        private readonly adminRepository:  AdminRepository,
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
}
