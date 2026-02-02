import { Module } from '@nestjs/common';
import { RegionalProductService } from './regional-product.service';
import { RegionalProductController } from './regional-product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from 'src/entities/region.entity';
import { RegionalProduct } from 'src/entities/regional-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Region, RegionalProduct])],
  controllers: [RegionalProductController],
  providers: [RegionalProductService],
})
export class RegionalProductModule {}
