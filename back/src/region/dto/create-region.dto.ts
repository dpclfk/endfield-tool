import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRegionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '지역명을 추가해주세요.',
    example: '무릉',
  })
  name: string;
}
