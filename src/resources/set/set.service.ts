import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateSetDto } from './dto/create-set.dto';
import { UpdateSetDto } from './dto/update-set.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Set } from './entities/set.entity';
import { Repository } from 'typeorm';
import { ServiceData } from 'src/classes/service_data.class';

@Injectable()
export class SetService {
  constructor(
    @InjectRepository(Set)
    private setRepository: Repository<Set>,
  ) {}

  async canCreateSet(createSetDto: CreateSetDto): Promise<boolean> {
    return (
      createSetDto.name &&
      createSetDto.releaseDate &&
      (await this.setRepository
        .findOneByOrFail({ name: createSetDto.name })
        .then(() => {
          return false;
        })
        .catch(() => {
          return true;
        }))
    );
  }

  async canUpdateSet(updateSetDto: UpdateSetDto): Promise<boolean> {
    return await this.setRepository
      .findOneByOrFail({ name: updateSetDto.name })
      .then(() => {
        return false;
      })
      .catch(() => {
        return true;
      });
  }

  async create(createSetDto: CreateSetDto): Promise<ServiceData> {
    try {
      if (await this.canCreateSet(createSetDto)) {
        createSetDto.name = createSetDto.name.toLowerCase();
        await this.setRepository.save(createSetDto);
        return new ServiceData(HttpStatus.OK, 'Set saved!');
      } else {
        return new ServiceData(HttpStatus.BAD_REQUEST, 'Bad information!');
      }
    } catch (error) {
      return new ServiceData(HttpStatus.BAD_REQUEST, error.message);
    }
  }

  async findAll(): Promise<ServiceData<Set[]>> {
    try {
      const sets = await this.setRepository.find();
      return new ServiceData<Set[]>(HttpStatus.OK, 'Sets found!', sets);
    } catch (error) {
      return new ServiceData<Set[]>(HttpStatus.BAD_REQUEST, error.message, []);
    }
  }

  async findOne(id: number): Promise<ServiceData<Set>> {
    try {
      const set = await this.setRepository.findOneByOrFail({ id });
      return new ServiceData<Set>(HttpStatus.OK, 'Sets found!', set);
    } catch (error) {
      return new ServiceData<Set>(
        HttpStatus.BAD_REQUEST,
        error.message,
        {} as Set,
      );
    }
  }

  async update(id: number, updateSetDto: UpdateSetDto): Promise<ServiceData> {
    try {
      if (this.canUpdateSet(updateSetDto)) {
        await this.setRepository.update(id, updateSetDto);
        return new ServiceData(HttpStatus.OK, 'Set updated!');
      } else {
        return new ServiceData(HttpStatus.BAD_REQUEST, 'Bad information!');
      }
    } catch (error) {
      return new ServiceData(HttpStatus.BAD_REQUEST, error.message);
    }
  }

  async remove(id: number): Promise<ServiceData> {
    try {
      const set = await this.setRepository.findOneByOrFail({ id });
      set.active = false;
      await this.setRepository.update(id, set);
      return new ServiceData(HttpStatus.OK, 'Set removed!');
    } catch (error) {
      return new ServiceData(HttpStatus.BAD_REQUEST, error.message);
    }
  }
}
