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
import { RegionalProductService } from './regional-product.service';
import { CreateRegionalProductDto } from './dto/create-regional-product.dto';
import { UpdateRegionalProductDto } from './dto/update-regional-product.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import {
  RegionalProductCreateResponseDto,
  RegionalProductDeleteManyOkResponseDto,
  RegionalProductDeleteOkResponseDto,
  RegionalProductFindAllResponseDto,
  RegionalProductNotFoundResponseDto,
  RegionalProductUpdateOkResponseDto,
} from './dto/response-regional-product.dto';
import {
  MysqlErrResponseDto,
  MysqlForeingKeyDto,
} from 'src/filter/mysql-err/mysql-err-response';
import { RegionalProductRemoveManyDto } from './dto/remove-many-regional-product.dto';

@Controller('regional-product')
export class RegionalProductController {
  constructor(
    private readonly regionalProductService: RegionalProductService,
  ) {}

  @ApiOperation({
    summary: '지역 변동물자를 추가합니다.',
    description: '지역 변동물자를 추가합니다.',
  })
  @ApiCreatedResponse({
    description: '지역 변동물자가 추가된 경우입니다.',
    type: RegionalProductCreateResponseDto,
  })
  @ApiBadRequestResponse({
    description: `
    상황에 따라 메시지가 다릅니다.
      - 중복된 값인 경우: "물자은(는) 이미 존재하는 값입니다."
      - 필수값이 누락된 경우: "name 값을 입력해주세요."
      - 값이 너무 긴 경우: "name의 입력값이 길어 저장할 수 없습니다."
  `,
    type: MysqlErrResponseDto,
  })
  @ApiNotFoundResponse({
    description: `참조대상이 존재하지 않는경우`,
    type: MysqlForeingKeyDto,
  })
  @Post()
  create(@Body() createRegionalProductDto: CreateRegionalProductDto) {
    return this.regionalProductService.create(createRegionalProductDto);
  }

  @ApiOperation({
    summary: '모든 지역 변동물자를 보여줍니다.',
    description: '모든 지역 변동물자를 보여줍니다.',
  })
  @ApiCreatedResponse({
    description: '지역 변동물자 리스트입니다.',
    type: RegionalProductFindAllResponseDto,
  })
  @Get()
  findAll() {
    return this.regionalProductService.findAll();
  }

  @ApiOperation({
    summary: '지역 변동물자를 수정합니다.',
    description: '지역 변동물자를 수정합니다.',
  })
  @ApiOkResponse({
    description: '지역 변동물자가 수정된 경우입니다.',
    type: RegionalProductUpdateOkResponseDto,
  })
  @ApiBadRequestResponse({
    description: `
    상황에 따라 메시지가 다릅니다.
      - 중복된 값인 경우: "물자은(는) 이미 존재하는 값입니다."
      - 필수값이 누락된 경우: "name 값을 입력해주세요."
      - 값이 너무 긴 경우: "name의 입력값이 길어 저장할 수 없습니다."
      `,
    type: MysqlErrResponseDto,
  })
  @ApiNotFoundResponse({
    description: `
    상황에 따라 메시지가 다릅니다.
      - 해당하는 번호의 지역 변동물자를 찾을 수 없는 경우: "지역 변동물자를 찾을 수 없습니다."
      - 참조대상이 존재하지 않는경우: "연결하려는 부모 데이터가 존재하지 않습니다. regionId 값을 확인해주세요."
      `,

    type: RegionalProductNotFoundResponseDto,
  })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRegionalProductDto: UpdateRegionalProductDto,
  ) {
    return this.regionalProductService.update(id, updateRegionalProductDto);
  }

  @ApiOperation({
    summary: '지역 변동물자를 삭제합니다.',
    description: '지역 변동물자를 삭제합니다.',
  })
  @ApiOkResponse({
    description: '지역 변동물자 삭제에 성공한 경우입니다.',
    type: RegionalProductDeleteOkResponseDto,
  })
  @ApiNotFoundResponse({
    description: '해당하는 번호의 지역 변동물자를 찾을 수 없는 경우입니다.',
    type: RegionalProductNotFoundResponseDto,
  })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.regionalProductService.remove(id);
  }

  @ApiOperation({
    summary: '여러 지역 변동물자를 삭제합니다.',
    description: '여러 지역 변동물자를 삭제합니다.',
  })
  @ApiOkResponse({
    description: '지역 변동물자 삭제에 성공한 경우입니다.',
    type: RegionalProductDeleteManyOkResponseDto,
  })
  @ApiNotFoundResponse({
    description: '지역 변동물자 삭제가 0개가 된 경우입니다.',
    type: RegionalProductNotFoundResponseDto,
  })
  @Post('delete')
  @HttpCode(HttpStatus.OK)
  removeMany(@Body() ids: RegionalProductRemoveManyDto) {
    return this.regionalProductService.removeMany(ids);
  }
}
