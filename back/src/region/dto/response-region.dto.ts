import { ApiProperty } from '@nestjs/swagger';
import { Region } from 'src/entities/region.entity';

export class RegionCreateResponseDto {
  @ApiProperty({
    description: '지역추가 성공',
    example: 'success',
  })
  status: string;

  @ApiProperty({
    description: '상세 메시지',
    example: '지역 추가에 성공하였습니다.',
  })
  message: string;
}

export class RegionFindAllResponseDto {
  @ApiProperty({
    description: '지역 조회 성공',
    example: 'success',
  })
  status: string;

  @ApiProperty({
    description: '상세 메시지',
    example: '전체 지역 조회에 성공하였습니다.',
  })
  message: string;

  @ApiProperty({ type: [Region] })
  data: Region[];
}

export class RegionNotFoundResponseDto {
  @ApiProperty({
    description: '지역 찾기 실패',
    example: 'fail',
  })
  status: string;

  @ApiProperty({
    description: '상세 메시지',
    example: '지역을 찾을 수 없습니다.',
  })
  message: string;
}

export class RegionUpdateOkResponseDto {
  @ApiProperty({
    description: '지역 수정 성공',
    example: 'success',
  })
  status: string;

  @ApiProperty({
    description: '상세 메시지',
    example: '지역 수정에 성공하였습니다.',
  })
  message: string;
}

export class RegionDeleteOkResponseDto {
  @ApiProperty({
    description: '지역 삭제 성공',
    example: 'success',
  })
  status: string;

  @ApiProperty({
    description: '상세 메시지',
    example: '지역 삭제에 성공하였습니다.',
  })
  message: string;
}

export class RegionDeleteManyOkResponseDto {
  @ApiProperty({
    description: '여러 지역 삭제 성공',
    example: 'success',
  })
  status: string;

  @ApiProperty({
    description: '상세 메시지',
    example: '2개의 지역 삭제에 성공하였습니다.',
  })
  message: string;
}
