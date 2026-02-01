// 지역 테이블

import { ApiProperty } from '@nestjs/swagger';
import {
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
} from 'typeorm';

@Entity({ name: 'region' })
export class Region {
  @ApiProperty({ description: '지역 ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '지역명', example: '무릉' })
  @Column({ unique: true, nullable: false, type: 'varchar', length: 20 })
  name: string; // 지역명 아무리길어도 10자내외일거 같은데 여유분으로 20자까지

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt: Date;
}
