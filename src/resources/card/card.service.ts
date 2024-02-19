import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { ServiceData } from 'src/classes/service_data.class';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { Repository } from 'typeorm';
import { RarityOfSet } from '../rarity-of-set/entities/rarity-of-set.entity';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
    @InjectRepository(RarityOfSet)
    private rarityOfSetRepository: Repository<RarityOfSet>,
  ) {}

  async canCreateCard(createCardDto: CreateCardDto): Promise<boolean> {
    return (
      createCardDto.name &&
      createCardDto.cost &&
      createCardDto.colors.length > 0 &&
      createCardDto.types.length > 0 &&
      createCardDto.subtypes.length > 0 &&
      createCardDto.rarities.length > 0 &&
      createCardDto.sets.length > 0 &&
      createCardDto.formats.length > 0 &&
      (await this.cardRepository
        .findOneByOrFail({ name: createCardDto.name })
        .then(() => {
          return false;
        })
        .catch(() => {
          return true;
        }))
    );
  }

  async canUpdateFormat(updateCardDto: UpdateCardDto): Promise<boolean> {
    return await this.cardRepository
      .findOneByOrFail({ name: updateCardDto.name })
      .then(() => {
        return false;
      })
      .catch(() => {
        return true;
      });
  }

  async create(createCardDto: CreateCardDto): Promise<ServiceData> {
    try {
      if (await this.canCreateCard(createCardDto)) {
        createCardDto.name = createCardDto.name.toLowerCase();
        const card = await this.cardRepository.save(createCardDto);
        for (const rarityOfSet of createCardDto.rarities) {
          rarityOfSet.cardId = card.id;
          await this.rarityOfSetRepository.save(rarityOfSet);
        }
        return new ServiceData(HttpStatus.OK, 'Card saved!');
      } else {
        return new ServiceData(HttpStatus.BAD_REQUEST, 'Bad information!');
      }
    } catch (error) {
      return new ServiceData(HttpStatus.BAD_REQUEST, error.message);
    }
  }

  async findAll(): Promise<ServiceData<Card[]>> {
    try {
      const cards = await this.cardRepository.find();
      return new ServiceData<Card[]>(HttpStatus.OK, 'Cards found!', cards);
    } catch (error) {
      return new ServiceData<Card[]>(HttpStatus.BAD_REQUEST, error.message, []);
    }
  }

  async findOne(id: number): Promise<ServiceData<Card>> {
    try {
      const card = await this.cardRepository.findOneByOrFail({ id });
      return new ServiceData<Card>(HttpStatus.OK, 'Card found!', card);
    } catch (error) {
      return new ServiceData<Card>(
        HttpStatus.BAD_REQUEST,
        error.message,
        {} as Card,
      );
    }
  }

  async update(id: number, updateCardDto: UpdateCardDto): Promise<ServiceData> {
    try {
      if (this.canUpdateFormat(updateCardDto)) {
        updateCardDto.name = updateCardDto.name.toLowerCase();
        const card = await this.cardRepository.save(updateCardDto);
        for (const rarityOfSet of updateCardDto.rarities) {
          rarityOfSet.cardId = card.id;
          await this.rarityOfSetRepository.save(rarityOfSet);
        }
        return new ServiceData(HttpStatus.OK, 'Card updated!');
      } else {
        return new ServiceData(HttpStatus.OK, 'Bad information!');
      }
    } catch (error) {
      return new ServiceData(HttpStatus.BAD_REQUEST, error.message);
    }
  }

  async remove(id: number): Promise<ServiceData> {
    try {
      const card = await this.cardRepository.findOneByOrFail({ id });
      card.active = false;
      await this.cardRepository.save(card);
      return new ServiceData(HttpStatus.OK, 'Card removed!');
    } catch (error) {
      return new ServiceData(HttpStatus.BAD_REQUEST, error.message);
    }
  }
}
