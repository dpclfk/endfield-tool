import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { Region } from 'src/entities/region.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RegionRemoveManyDto } from './dto/region-remove-many.dto';

@Injectable()
export class RegionService {
  constructor(
    @InjectRepository(Region)
    private regionRepository: Repository<Region>,
  ) {}

  async create(createRegionDto: CreateRegionDto) {
    try {
      const regionSave: Region = this.regionRepository.create({
        name: createRegionDto.name,
      });
      await this.regionRepository.save(regionSave);
    } catch (err) {
      if (
        // 중복된 지역일경우, mysql필터 안거치고 메시지를 프론트에서 수정 가능하게함
        err instanceof QueryFailedError &&
        err.message.includes('Duplicate entry')
      ) {
        throw new BadRequestException({
          status: 'fail',
          message: '이미 존재하는 지역명입니다.',
        });
      }
      throw err; // 중복된 지역 추가에러 외에는 그대로 내보내게
    }
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
    try {
      const result = await this.regionRepository.update(id, updateRegionDto);
      if (result.affected === 0) {
        throw new NotFoundException({
          status: 'fail',
          message: '지역을 찾을 수 없습니다.',
        });
      }
    } catch (err) {
      if (
        // 중복된 지역일경우, mysql필터 안거치고 메시지를 프론트에서 수정 가능하게함
        err instanceof QueryFailedError &&
        err.message.includes('Duplicate entry')
      ) {
        throw new BadRequestException({
          status: 'fail',
          message: '이미 존재하는 지역명입니다.',
        });
      }
      throw err; // 여기서 설정한 에러 외에는 그대로 내보냄
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
