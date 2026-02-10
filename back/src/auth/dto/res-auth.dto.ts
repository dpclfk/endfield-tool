import { ApiProperty } from '@nestjs/swagger';

export class resLoginDto {
  @ApiProperty()
  access_token: string;
}

export class AuthSuccessResponseDto {
  @ApiProperty({
    description: 'success or fail 중 하나로 성공 혹은 실패 상태를 보여줍니다.',
    example: 'success',
  })
  status: string;

  @ApiProperty({
    description: '상세 메시지',
    example: '회원가입이 완료 되었습니다.',
  })
  message: string;
}
