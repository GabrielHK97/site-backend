import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './resources/account/account.module';
import { CardModule } from './resources/card/card.module';
import { SetModule } from './resources/set/set.module';
import { FormatModule } from './resources/format/format.module';
import { Account } from './resources/account/entities/account.entity';
import { Card } from './resources/card/entities/card.entity';
import { Set } from './resources/set/entities/set.entity';
import { Format } from './resources/format/entities/format.entity';
import { Image } from './resources/image/entities/image.entity';
import { Type } from './resources/type/entitites/type.entity';
import { Subtype } from './resources/subtype/entitites/subtype.entity';
import { Color } from './resources/color/entities/color.entity';
import { ColorModule } from './resources/color/color.module';
import { SubtypeModule } from './resources/subtype/subtype.module';
import { TypeModule } from './resources/type/type.module';
import { RarityOfSet } from './resources/rarity-of-set/entities/rarity-of-set.entity';
import { Rarity } from './resources/rarity/entities/rarity.entity';
import { RarityModule } from './resources/rarity/rarity.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [
        Account,
        Card,
        Set,
        Format,
        Image,
        Type,
        Subtype,
        Color,
        RarityOfSet,
        Rarity,
      ],
      synchronize: false,
    }),
    AccountModule,
    AuthModule,
    CardModule,
    SetModule,
    FormatModule,
    ColorModule,
    TypeModule,
    SubtypeModule,
    RarityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
