import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRegionDto {
  @IsString({ message: 'name은 문자열로 넣어주세요' })
  @IsNotEmpty({ message: 'name은 빈값이 불가능합니다.' })
  @ApiProperty({
    description: '지역명을 추가해주세요.',
    example: '무릉',
  })
  name: string;
}
