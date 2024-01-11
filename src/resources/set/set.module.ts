import { Module } from '@nestjs/common';
import { SetService } from './set.service';
import { SetController } from './set.controller';
import { Set } from './entities/set.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Set])],
  controllers: [SetController],
  providers: [SetService],
})
export class SetModule {}
