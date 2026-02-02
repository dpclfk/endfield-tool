import { ApiProperty } from '@nestjs/swagger';

export class MysqlErrResponseDto {
  @ApiProperty({
    description: 'DB 제약조건에 맞지 않는 경우입니다.',
    example: 'fail',
  })
  status: string;

  @ApiProperty({
    description: '상세 메시지',
    example: '물자은(는) 이미 존재하는 값입니다.',
  })
  message: string;
}

export class MysqlForeingKeyDto {
  @ApiProperty({
    description: '참조대상이 존재하지 않습니다.',
    example: 'fail',
  })
  status: string;

  @ApiProperty({
    description: '상세 메시지',
    example:
      '연결하려는 부모 데이터가 존재하지 않습니다. regionId 값을 확인해주세요.',
  })
  message: string;
}
