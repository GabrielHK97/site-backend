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
    return (
      createFormatDto.name &&
      createFormatDto.rotate !== undefined &&
      (await this.formatRepository
        .findOneByOrFail({ name: createFormatDto.name })
        .then(() => {
          return false;
        })
        .catch(() => {
          return true;
        }))
    );
  }

  async canUpdateFormat(updateFormatDto: UpdateFormatDto): Promise<boolean> {
    return await this.formatRepository
      .findOneByOrFail({ name: updateFormatDto.name })
      .then(() => {
        return false;
      })
      .catch(() => {
        return true;
      });
  }

  async create(createFormatDto: CreateFormatDto): Promise<ServiceData> {
    try {
      if (await this.canCreateFormat(createFormatDto)) {
        createFormatDto.name = createFormatDto.name.toLowerCase();
        await this.formatRepository.save(createFormatDto);
        return new ServiceData(HttpStatus.OK, 'Format saved!');
      } else {
        return new ServiceData(HttpStatus.BAD_REQUEST, 'Bad information!');
      }
    } catch (error) {
      return new ServiceData(HttpStatus.BAD_REQUEST, error.message);
    }
  }

  async findAll(): Promise<ServiceData<Format[]>> {
    try {
      const formats = await this.formatRepository.find();
      return new ServiceData<Format[]>(
        HttpStatus.OK,
        'Formats found!',
        formats,
      );
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
      const format = await this.formatRepository.findOneByOrFail({ id });
      return new ServiceData<Format>(HttpStatus.OK, 'Format found!', format);
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
      if (this.canUpdateFormat(updateFormatDto)) {
        await this.formatRepository.update(id, updateFormatDto);
        return new ServiceData(HttpStatus.OK, 'Format updated!');
      } else {
        return new ServiceData(HttpStatus.OK, 'Bad information!');
      }
    } catch (error) {
      return new ServiceData(HttpStatus.BAD_REQUEST, error.message);
    }
  }

  async remove(id: number): Promise<ServiceData> {
    try {
      const format = await this.formatRepository.findOneByOrFail({ id });
      format.active = false;
      await this.formatRepository.update(id, format);
      return new ServiceData(HttpStatus.OK, 'Format removed!');
    } catch (error) {
      return new ServiceData(HttpStatus.BAD_REQUEST, error.message);
    }
  }
}
