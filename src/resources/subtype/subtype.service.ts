import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceData } from 'src/classes/service_data.class';
import { Subtype } from './entitites/subtype.entity';

@Injectable()
export class SubtypeService {
  constructor(
    @InjectRepository(Subtype)
    private subtypeRepository: Repository<Subtype>,
  ) {}

  async findAll(): Promise<ServiceData<Subtype[]>> {
    try {
      const sets = await this.subtypeRepository.find();
      return new ServiceData<Subtype[]>(HttpStatus.OK, 'Sutypes found!', sets);
    } catch (error) {
      return new ServiceData<Subtype[]>(
        HttpStatus.BAD_REQUEST,
        error.message,
        [],
      );
    }
  }
}
