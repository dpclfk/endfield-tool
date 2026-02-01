// 공장이랑 상품 n:m 테이블

import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { ProductionType } from './production-type.entity';
import { FactoryType } from './factory-type.entity';

@Entity({ name: 'production_factory' })
@Unique(['productionTypeId', 'factoryTypeId'])
export class ProductionFactory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false, type: 'varchar', length: 50 })
  name: string; // 아이템길이 50자는 안넘을 가능성이 매우높음

  @Column({ nullable: false, type: 'tinyint', unsigned: true })
  usageCount: number; //생산품 뽑기위해 몇개 들어가는지

  @ManyToOne(() => ProductionType, { onDelete: 'CASCADE' }) // OneToMany 생략가능해서 생략
  @JoinColumn({ name: 'production_type_id' })
  productionType: ProductionType;

  @Column({ nullable: false })
  productionTypeId: number; // typeorm이 컬럼이 아니라 객체 취급하여 이렇게 추가해야됨

  @ManyToOne(() => FactoryType, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'factory_type_id' })
  factoryType: FactoryType;

  @Column({ nullable: false })
  factoryTypeId: number;

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt: Date;
}
