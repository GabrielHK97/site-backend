import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RarityController } from './rarity.controller';
import { RarityService } from './rarity.service';
import { Rarity } from './entities/rarity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rarity])],
  controllers: [RarityController],
  providers: [RarityService],
})
export class RarityModule {}
