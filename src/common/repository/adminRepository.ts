import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Admin } from '../../database/entities/admin.entity';
import dataSource from '../../database/datasource';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AdminRepository {
    private readonly entity: Repository<Admin>;

    constructor() {
        this.entity = dataSource.getRepository(Admin); 
    }

    async findOneByEmail(email: string): Promise<Admin | undefined> {
        return await this.entity.findOne({ where: { email } });
    }

    async add(adminData: Partial<Admin>): Promise<Admin> {
        const admin = this.entity.create({
            ...adminData,
            admin_id: uuidv4(), 
        });
        return await this.entity.save(admin);
    }

    // async findById(id: string): Promise<Admin | null> {
    //     return await this.entity.findOne({ where: { admin_id: id } });
    // }

    // async updateById(id: string, updates: Partial<Admin>): Promise<Admin | null> {
    //     const admin = await this.findById(id);
    //     if (!admin) return null;

    //     await this.entity.update({ admin_id: id }, updates);
    //     return { ...admin, ...updates } as Admin;
    // }
}







// import {
//     Repository,
//     DeepPartial,
//     FindOptionsWhere,
//     FindOptionsRelations,
//     DeleteResult,
//     FindManyOptions,
//     SelectQueryBuilder,
//   } from 'typeorm';
//   import { Injectable, NotFoundException } from '@nestjs/common';
  
//   @Injectable()
//   export class BaseRepository<Entity> {
//     [x: string]: any;
//     constructor(private readonly entity: Repository<Entity>) {}
  
//     async create(createdEntityData: DeepPartial<Entity>): Promise<Entity> {
//       const createdEntity = this.entity.create(createdEntityData);
//       return await this.entity.save(createdEntity);
//     }
  
//     async findOne(
//       filterData: FindOptionsWhere<Entity>,
//       relations?: FindOptionsRelations<Entity>,
//     ): Promise<Entity | undefined> {
//       return await this.entity.findOne({
//         where: filterData,
//         relations: relations,
//       });
//     }
  
//     async findOneAndUpdate(
//       filterData: FindOptionsWhere<Entity>,
//       updateData: Partial<unknown>,
//     ): Promise<Entity | undefined> {
//       const existingEntity = await this.findOne(filterData);
//       if (!existingEntity) {
//         throw new NotFoundException(`Data for ${filterData} not found`);
//       }
//       await this.entity.update(filterData, updateData);
//       return this.entity.findOne({ where: filterData });
//     }
  
//     async delete(filterData: FindOptionsWhere<Entity>): Promise<boolean> {
//       const result: DeleteResult = await this.entity.delete(filterData);
//       return result.affected! > 0;
//     }
  
//     async findAll(): Promise<Entity[]> {
//       return await this.entity.find();
//     }
  
//     async find(
//       filterData: FindOptionsWhere<Entity> | FindManyOptions<Entity>,
//     ): Promise<Entity[]> {
//       return this.entity.find(filterData);
//     }
  
//     async createQueryBuilder(
//       alias?: string,
//     ): Promise<SelectQueryBuilder<Entity>> {
//       return this.entity.createQueryBuilder(alias);
//     }
//   }
  