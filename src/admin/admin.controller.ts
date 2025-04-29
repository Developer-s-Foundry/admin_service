import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Admin } from './entities/admin.entity';

@Controller('admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  async findAll(): Promise<Admin[]> {
    return this.adminService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Admin> {
    return this.adminService.findOne(id);
  }

  @Post()
  async create(@Body() adminData: Partial<Admin>): Promise<Admin> {
    return this.adminService.create(adminData);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() adminData: Partial<Admin>,
  ): Promise<Admin> {
    return this.adminService.update(id, adminData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.adminService.delete(id);
  }
}