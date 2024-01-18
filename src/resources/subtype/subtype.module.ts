import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subtype } from './entitites/subtype.entity';
import { SubtypeController } from './subtype.controller';
import { SubtypeService } from './subtype.service';

@Module({
  imports: [TypeOrmModule.forFeature([Subtype])],
  controllers: [SubtypeController],
  providers: [SubtypeService],
})
export class SubtypeModule {}
