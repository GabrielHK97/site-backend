import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceData } from 'src/classes/service_data.class';
import { Rarity } from './entities/rarity.entity';

@Injectable()
export class RarityService {
  constructor(
    @InjectRepository(Rarity)
    private rarityRepository: Repository<Rarity>,
  ) {}

  async findAll(): Promise<ServiceData<Rarity[]>> {
    try {
      const sets = await this.rarityRepository.find();
      return new ServiceData<Rarity[]>(HttpStatus.OK, 'Rarities found!', sets);
    } catch (error) {
      return new ServiceData<Rarity[]>(
        HttpStatus.BAD_REQUEST,
        error.message,
        [],
      );
    }
  }
}
