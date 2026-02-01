// 공장 종류 테이블

import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({ name: 'factory_type' })
export class FactoryType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false, type: 'varchar', length: 50 })
  name: string; // 아이템길이 50자는 안넘을 가능성이 매우높음

  @Column({ nullable: false, type: 'smallint', unsigned: true })
  electricityMinute: number; // 분당 전기 소모량

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt: Date;
}
