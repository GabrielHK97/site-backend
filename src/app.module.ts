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
import { AuthenticateMiddleware } from './middlewares/authenticate.middleware';
import { TypeORMConstants } from './constants/TypeORM.constants';
import { Type } from './resources/type/entitites/type.entity';
import { Subtype } from './resources/subtype/entitites/subtype.entity';
import { Color } from './resources/color/entities/color.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [Account, Card, Set, Format, Image, Type, Subtype, Color],
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticateMiddleware)
      .forRoutes(
        TypeORMConstants.CARD_ROUTE,
        TypeORMConstants.SET_ROUTE,
        TypeORMConstants.FORMAT_ROUTE,
      );
  }
}
