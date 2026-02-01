import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeormConfig } from './config/typeORM.config';
import { FactoryType } from './entities/factory-type.entity';
import { IngredientsType } from './entities/ingredients-type.entity';
import { ProductionFactory } from './entities/production-factory.entity';
import { ProductionIngredients } from './entities/production-ingredients.entity';
import { ProductionType } from './entities/production-type.entity';
import { Region } from './entities/region.entity';
import { RegionalProduct } from './entities/regional-product.entity';
import { RegionModule } from './region/region.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`${__dirname}/../.env.${process.env.NODE_ENV}`],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeormConfig,
    }),
    TypeOrmModule.forFeature([
      FactoryType,
      IngredientsType,
      ProductionFactory,
      ProductionIngredients,
      ProductionType,
      Region,
      RegionalProduct,
    ]),
    RegionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
