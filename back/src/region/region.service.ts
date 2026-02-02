import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { Region } from 'src/entities/region.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RegionRemoveManyDto } from './dto/remove-many-region.dto';

@Injectable()
export class RegionService {
  constructor(
    @InjectRepository(Region)
    private regionRepository: Repository<Region>,
  ) {}

  async create(createRegionDto: CreateRegionDto) {
    const regionSave: Region = this.regionRepository.create({
      name: createRegionDto.name,
    });
    await this.regionRepository.save(regionSave);
    return { status: 'success', message: '지역 추가에 성공하였습니다.' };
  }

  async findAll() {
    const regions: Region[] = await this.regionRepository.find();
    return {
      status: 'success',
      message: '전체 지역 조회에 성공하였습니다.',
      data: regions,
    };
  }

  async update(id: number, updateRegionDto: UpdateRegionDto) {
    const result = await this.regionRepository.update(id, {
      name: updateRegionDto.name,
    });
    if (result.affected === 0) {
      throw new NotFoundException({
        status: 'fail',
        message: '지역을 찾을 수 없습니다.',
      });
    }

    return { status: 'success', message: '지역 수정에 성공하였습니다.' };
  }

  async remove(id: number) {
    const result = await this.regionRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException({
        status: 'fail',
        message: '삭제할 지역이 없습니다.',
      });
    } else {
      console.log('지역 삭제에 성공하였습니다.');
      return { status: 'success', message: '지역 삭제에 성공하였습니다.' };
    }
  }

  async removeMany(ids: RegionRemoveManyDto) {
    const result = await this.regionRepository.delete(ids.ids);

    if (result.affected === 0) {
      throw new NotFoundException({
        status: 'fail',
        message: '삭제할 지역이 없습니다.',
      });
    } else {
      console.log(`${result.affected}개의 지역 삭제에 성공하였습니다.`);
      return {
        status: 'success',
        message: `${result.affected}개의 지역 삭제에 성공하였습니다.`,
      };
    }
  }
}
