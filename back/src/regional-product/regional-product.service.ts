import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRegionalProductDto } from './dto/create-regional-product.dto';
import { UpdateRegionalProductDto } from './dto/update-regional-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Region } from 'src/entities/region.entity';
import { Repository } from 'typeorm';
import { RegionalProduct } from 'src/entities/regional-product.entity';
import { RegionalProductRemoveManyDto } from './dto/remove-many-regional-product.dto';

@Injectable()
export class RegionalProductService {
  constructor(
    @InjectRepository(Region)
    private regionRepository: Repository<Region>,
    @InjectRepository(RegionalProduct)
    private regionalProductRepository: Repository<RegionalProduct>,
  ) {}

  async create(createRegionalProductDto: CreateRegionalProductDto) {
    const regionalProduct: Region = this.regionalProductRepository.create({
      name: createRegionalProductDto.name,
      price: createRegionalProductDto.price,
      regionId: createRegionalProductDto.regionId,
    });
    await this.regionalProductRepository.save(regionalProduct);
    return {
      status: 'success',
      message: `${createRegionalProductDto.name}이(가) 추가 되었습니다.`,
    };
  }

  async findAll() {
    const result = await this.regionRepository
      .createQueryBuilder('r')
      .select('r.name', 'region_name')
      .addSelect(
        `JSON_ARRAYAGG(
          JSON_OBJECT('id', rp.id, 'regional_product_name', rp.name,'price', rp.price)
        )`,
        'regional_product_list',
      )
      .innerJoin('regional_product', 'rp', 'r.id = rp.region_id')
      .groupBy('r.id')
      .getRawMany();
    return {
      status: 'success',
      message: '모든 지역 변동물자 조회에 성공하였습니다.',
      data: result,
    };
  }

  async update(id: number, updateRegionalProductDto: UpdateRegionalProductDto) {
    const result = await this.regionalProductRepository.update(id, {
      name: updateRegionalProductDto.name,
      price: updateRegionalProductDto.price,
      regionId: updateRegionalProductDto.regionId,
    });
    if (result.affected === 0) {
      throw new NotFoundException({
        status: 'fail',
        message: '아이템을 찾을 수 없습니다.',
      });
    }

    return { status: 'success', message: '아이템 수정에 성공하였습니다.' };
  }

  async remove(id: number) {
    const result = await this.regionalProductRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException({
        status: 'fail',
        message: '삭제할 아이템이 없습니다.',
      });
    } else {
      console.log('아이템 삭제에 성공하였습니다.');
      return { status: 'success', message: '아이템 삭제에 성공하였습니다.' };
    }
  }

  async removeMany(ids: RegionalProductRemoveManyDto) {
    const result = await this.regionalProductRepository.delete(ids.ids);

    if (result.affected === 0) {
      throw new NotFoundException({
        status: 'fail',
        message: '삭제할 아이템이 없습니다.',
      });
    } else {
      console.log(`${result.affected}개의 아이템 삭제에 성공하였습니다.`);
      return {
        status: 'success',
        message: `${result.affected}개의 아이템 삭제에 성공하였습니다.`,
      };
    }
  }
}
