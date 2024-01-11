import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateFormatDto } from './dto/create-format.dto';
import { UpdateFormatDto } from './dto/update-format.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Format } from './entities/format.entity';
import { Repository } from 'typeorm';
import { ServiceData } from 'src/classes/service_data.class';

@Injectable()
export class FormatService {
  constructor(
    @InjectRepository(Format)
    private formatRepository: Repository<Format>,
  ) {}
  async canCreateFormat(createFormatDto: CreateFormatDto): Promise<boolean> {
    return !createFormatDto.name ||
      createFormatDto.rotate == undefined ||
      (await this.formatRepository
        .findOneByOrFail({ name: createFormatDto.name })
        .then(() => {
          return true;
        })
        .catch(() => {
          return false;
        }))
      ? false
      : true;
  }

  async create(createFormatDto: CreateFormatDto): Promise<ServiceData> {
    try {
      if (await this.canCreateFormat(createFormatDto)) {
        await this.formatRepository.save(createFormatDto);
        return new ServiceData(HttpStatus.OK, 'Format saved!');
      } else {
        return new ServiceData(HttpStatus.BAD_REQUEST, 'Missing information!');
      }
    } catch (error) {
      return new ServiceData(HttpStatus.BAD_REQUEST, error.message);
    }
  }

  async findAll(): Promise<ServiceData<Format[]>> {
    try {
      const sets = await this.formatRepository.find();
      return new ServiceData<Format[]>(HttpStatus.OK, 'Formats found!', sets);
    } catch (error) {
      return new ServiceData<Format[]>(
        HttpStatus.BAD_REQUEST,
        error.message,
        [],
      );
    }
  }

  async findOne(id: number): Promise<ServiceData<Format>> {
    try {
      const set = await this.formatRepository.findOneByOrFail({ id });
      return new ServiceData<Format>(HttpStatus.OK, 'Format found!', set);
    } catch (error) {
      return new ServiceData<Format>(
        HttpStatus.BAD_REQUEST,
        error.message,
        {} as Format,
      );
    }
  }

  async update(
    id: number,
    updateFormatDto: UpdateFormatDto,
  ): Promise<ServiceData> {
    try {
      await this.formatRepository.update(id, updateFormatDto);
      return new ServiceData(HttpStatus.OK, 'Format updated');
    } catch (error) {
      return new ServiceData(HttpStatus.BAD_REQUEST, error.message);
    }
  }

  async remove(id: number): Promise<ServiceData> {
    try {
      const set = await this.formatRepository.findOneByOrFail({ id });
      set.active = false;
      await this.formatRepository.update(id, set);
      return new ServiceData(HttpStatus.OK, 'Set updated');
    } catch (error) {
      return new ServiceData(HttpStatus.BAD_REQUEST, error.message);
    }
  }
}
