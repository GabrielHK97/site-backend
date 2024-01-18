import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Color } from './entities/color.entity';
import { ServiceData } from 'src/classes/service_data.class';

@Injectable()
export class ColorService {
  constructor(
    @InjectRepository(Color)
    private formatRepository: Repository<Color>,
  ) {}

  async findAll(): Promise<ServiceData<Color[]>> {
    try {
      const sets = await this.formatRepository.find();
      return new ServiceData<Color[]>(HttpStatus.OK, 'Colors found!', sets);
    } catch (error) {
      return new ServiceData<Color[]>(
        HttpStatus.BAD_REQUEST,
        error.message,
        [],
      );
    }
  }
}
