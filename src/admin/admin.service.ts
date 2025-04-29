import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  async findAll(): Promise<Admin[]> {
    return this.adminRepository.find();
  }

  async findOne(id: string): Promise<Admin> {
    return this.adminRepository.findOneBy({ id });
  }

  async create(adminData: Partial<Admin>): Promise<Admin> {
    const admin = this.adminRepository.create(adminData);
    return this.adminRepository.save(admin);
  }

  async update(id: string, adminData: Partial<Admin>): Promise<Admin> {
    await this.adminRepository.update(id, adminData);
    return this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.adminRepository.delete(id);
  }
}