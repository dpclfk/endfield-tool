import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRegionalProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '변동물자탭의 아이템 이름을 추가해주세요.',
    example: '물자',
  })
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '최초 가격(변동전) 가격을 입력해주세요',
    example: '2000',
  })
  price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '지역 번호를 입력해주세요',
    example: '1',
  })
  regionId: number;
}
