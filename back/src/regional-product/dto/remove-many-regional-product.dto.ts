import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsInt } from 'class-validator';

export class RegionalProductRemoveManyDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @ApiProperty({
    description: '아이템 아이디를 넣어주세요',
    example: '[1,2]',
  })
  ids: number[];
}
