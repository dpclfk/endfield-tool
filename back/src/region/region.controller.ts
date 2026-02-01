import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import {
  RegionCreateResponseDto,
  RegionDeleteManyOkResponseDto,
  RegionDeleteOkResponseDto,
  RegionDuplicateResponseDto,
  RegionFindAllResponseDto,
  RegionNotFoundResponseDto,
  RegionUpdateOkResponseDto,
} from './dto/region-response.dto';
import { RegionRemoveManyDto } from './dto/region-remove-many.dto';

@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @ApiOperation({
    summary: '지역을 추가합니다.',
    description: '지역을 추가합니다.',
  })
  @ApiCreatedResponse({
    description: '지역이 추가된 경우 입니다.',
    type: RegionCreateResponseDto,
  })
  @ApiBadRequestResponse({
    description: '지역명 중복으로인해 수정에 실패한 경우입니다.',
    type: RegionDuplicateResponseDto,
  })
  @Post()
  create(
    @Body() createRegionDto: CreateRegionDto,
  ): Promise<RegionCreateResponseDto> {
    return this.regionService.create(createRegionDto);
  }
  @ApiOkResponse({
    description: '모든 지역 입니다.',
    type: [RegionFindAllResponseDto],
  })
  @Get()
  findAll(): Promise<RegionFindAllResponseDto> {
    return this.regionService.findAll();
  }

  @ApiOperation({
    summary: '지역명을 수정합니다.',
    description: '지역명을 수정합니다.',
  })
  @ApiOkResponse({
    description: '지역명이 수정된 경우입니다.',
    type: RegionUpdateOkResponseDto,
  })
  @ApiBadRequestResponse({
    description: '지역명 중복으로인해 수정에 실패한 경우입니다.',
    type: RegionDuplicateResponseDto,
  })
  @ApiNotFoundResponse({
    description: '해당하는 번호의 지역을 찾을 수 없는 경우입니다.',
    type: RegionNotFoundResponseDto,
  })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRegionDto: UpdateRegionDto,
  ) {
    return this.regionService.update(id, updateRegionDto);
  }

  @ApiOperation({
    summary: '지역을 삭제합니다.',
    description: '지역을 삭제합니다.',
  })
  @ApiOkResponse({
    description: '지역 삭제에 성공한 경우입니다.',
    type: RegionDeleteOkResponseDto,
  })
  @ApiNotFoundResponse({
    description: '해당하는 번호의 지역을 찾을 수 없는 경우입니다.',
    type: RegionNotFoundResponseDto,
  })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.regionService.remove(id);
  }

  @ApiOperation({
    summary: '여러 지역을 삭제합니다.',
    description: '여러 지역을 삭제합니다.',
  })
  @ApiOkResponse({
    description: '지역 삭제에 성공한 경우입니다.',
    type: RegionDeleteManyOkResponseDto,
  })
  @ApiNotFoundResponse({
    description: '지역삭제가 0개가 된 경우입니다.',
    type: RegionNotFoundResponseDto,
  })
  @Post('delete')
  removeMany(@Body() ids: RegionRemoveManyDto) {
    return this.regionService.removeMany(ids);
  }
}
