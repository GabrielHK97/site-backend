import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { RarityOfSet } from '../rarity-of-set/entities/rarity-of-set.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Card, RarityOfSet])],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
