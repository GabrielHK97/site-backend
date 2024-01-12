import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [Account, Card, Set, Format, Image],
      synchronize: true,
    }),
    AccountModule,
    AuthModule,
    CardModule,
    SetModule,
    FormatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
