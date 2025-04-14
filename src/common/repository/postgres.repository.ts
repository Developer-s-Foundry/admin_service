import {
    Repository,
    DeepPartial,
    FindOptionsWhere,
    FindOptionsRelations,
    DeleteResult,
    FindManyOptions,
    SelectQueryBuilder,
  } from 'typeorm';
  import { Injectable, NotFoundException } from '@nestjs/common';
  
  @Injectable()
  export class BaseRepository<Entity> {
    [x: string]: any;
    constructor(private readonly entity: Repository<Entity>) {}
  
    async create(createdEntityData: DeepPartial<Entity>): Promise<Entity> {
      const createdEntity = this.entity.create(createdEntityData);
      return await this.entity.save(createdEntity);
    }
  
    async findOne(
      filterData: FindOptionsWhere<Entity>,
      relations?: FindOptionsRelations<Entity>,
    ): Promise<Entity | undefined> {
      return await this.entity.findOne({
        where: filterData,
        relations: relations,
      });
    }
  
    async findOneAndUpdate(
      filterData: FindOptionsWhere<Entity>,
      updateData: Partial<unknown>,
    ): Promise<Entity | undefined> {
      const existingEntity = await this.findOne(filterData);
      if (!existingEntity) {
        throw new NotFoundException(`Data for ${filterData} not found`);
      }
      await this.entity.update(filterData, updateData);
      return this.entity.findOne({ where: filterData });
    }
  
    async delete(filterData: FindOptionsWhere<Entity>): Promise<boolean> {
      const result: DeleteResult = await this.entity.delete(filterData);
      return result.affected! > 0;
    }
  
    async findAll(): Promise<Entity[]> {
      return await this.entity.find();
    }
  
    async find(
      filterData: FindOptionsWhere<Entity> | FindManyOptions<Entity>,
    ): Promise<Entity[]> {
      return this.entity.find(filterData);
    }
  
    async createQueryBuilder(
      alias?: string,
    ): Promise<SelectQueryBuilder<Entity>> {
      return this.entity.createQueryBuilder(alias);
    }
  }
  