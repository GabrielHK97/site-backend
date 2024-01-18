import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceData } from 'src/classes/service_data.class';
import { Type } from './entitites/type.entity';

@Injectable()
export class TypeService {
  constructor(
    @InjectRepository(Type)
    private typeRepository: Repository<Type>,
  ) {}

  async findAll(): Promise<ServiceData<Type[]>> {
    try {
      const sets = await this.typeRepository.find();
      return new ServiceData<Type[]>(HttpStatus.OK, 'Types found!', sets);
    } catch (error) {
      return new ServiceData<Type[]>(HttpStatus.BAD_REQUEST, error.message, []);
    }
  }
}
