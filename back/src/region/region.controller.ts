import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
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
  RegionFindAllResponseDto,
  RegionNotFoundResponseDto,
  RegionUpdateOkResponseDto,
} from './dto/response-region.dto';
import { RegionRemoveManyDto } from './dto/remove-many-region.dto';
import { MysqlErrResponseDto } from 'src/filter/mysql-err/mysql-err-response';

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
    description: `
    상황에 따라 메시지가 다릅니다.
    - 중복된 값인 경우: "무릉은(는) 이미 존재하는 값입니다."
    - 필수값이 누락된 경우: "name 값을 입력해주세요."`,
    type: MysqlErrResponseDto,
  })
  @Post()
  create(
    @Body() createRegionDto: CreateRegionDto,
  ): Promise<RegionCreateResponseDto> {
    return this.regionService.create(createRegionDto);
  }

  @ApiOperation({
    summary: '모든 지역을 보여줍니다.',
    description: '모든 지역을 보여줍니다.',
  })
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
    description: `
    상황에 따라 메시지가 다릅니다.
    - 중복된 값인 경우: "무릉은(는) 이미 존재하는 값입니다."
    - 필수값이 누락된 경우: "name 값을 입력해주세요."`,
    type: MysqlErrResponseDto,
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
    description: '지역 삭제가 0개가 된 경우입니다.',
    type: RegionNotFoundResponseDto,
  })
  @Post('delete')
  @HttpCode(HttpStatus.OK)
  removeMany(@Body() ids: RegionRemoveManyDto) {
    return this.regionService.removeMany(ids);
  }
}
