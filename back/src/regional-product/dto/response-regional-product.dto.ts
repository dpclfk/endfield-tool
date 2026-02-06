import { ApiProperty } from '@nestjs/swagger';

export class RegionalProductCreateResponseDto {
  @ApiProperty({
    description: '지역 변동물자 추가 성공',
    example: 'success',
  })
  status: string;

  @ApiProperty({
    description: '상세 메시지',
    example: '물자이(가) 추가 되었습니다.',
  })
  message: string;
}

export class regionalProductList {
  @ApiProperty({
    description: '아이템 번호입니다.',
    example: '1',
  })
  id: number;

  @ApiProperty({
    description: '아이템 가격입니다.',
    example: '2000',
  })
  price: number;

  @ApiProperty({
    description: '아이템 이름입니다.',
    example: '물자',
  })
  regional_product_name: string;
}

export class RegionalProduct {
  @ApiProperty({
    description: '지역번호입니다.',
    example: '1',
  })
  region_id: number;

  @ApiProperty({
    description: '지역명입니다.',
    example: '무릉',
  })
  region_name: string;

  @ApiProperty({ type: [regionalProductList] })
  regional_product_list: regionalProductList[];
}

export class RegionalProductFindAllResponseDto {
  @ApiProperty({
    description: '지역 변동물자 추가 성공',
    example: 'success',
  })
  status: string;

  @ApiProperty({
    description: '상세 메시지',
    example: '물자이(가) 추가 되었습니다.',
  })
  message: string;

  @ApiProperty({ type: [RegionalProduct] })
  data: RegionalProduct[];
}

export class RegionalProductNotFoundResponseDto {
  @ApiProperty({
    description: '아이템 찾기 실패',
    example: 'fail',
  })
  status: string;

  @ApiProperty({
    description: '상세 메시지',
    example: '아이템을 찾을 수 없습니다.',
  })
  message: string;
}

export class RegionalProductUpdateOkResponseDto {
  @ApiProperty({
    description: '아이템 수정 성공',
    example: 'success',
  })
  status: string;

  @ApiProperty({
    description: '상세 메시지',
    example: '아이템 수정에 성공하였습니다.',
  })
  message: string;
}

export class RegionalProductDeleteOkResponseDto {
  @ApiProperty({
    description: '아이템 삭제 성공',
    example: 'success',
  })
  status: string;

  @ApiProperty({
    description: '상세 메시지',
    example: '아이템 삭제에 성공하였습니다.',
  })
  message: string;
}

export class RegionalProductDeleteManyOkResponseDto {
  @ApiProperty({
    description: '여러 아이템 삭제 성공',
    example: 'success',
  })
  status: string;

  @ApiProperty({
    description: '상세 메시지',
    example: '2개의 아이템 삭제에 성공하였습니다.',
  })
  message: string;
}
