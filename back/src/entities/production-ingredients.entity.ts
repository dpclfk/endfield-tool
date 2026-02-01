// 생산품 테이블과 기본재료 중류 n:m테이블

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
import { IngredientsType } from './ingredients-type.entity';

@Entity({ name: 'production_ingredients' })
@Unique(['productionTypeId', 'ingredientsTypeId'])
export class ProductionIngredients {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'smallint', unsigned: true })
  usageMinute: number; // 재료들의 분당 사용량

  @ManyToOne(() => ProductionType, { onDelete: 'CASCADE' }) // OneToMany 생략가능해서 생략
  @JoinColumn({ name: 'production_type_id' })
  productionType: ProductionType;

  @Column({ nullable: false })
  productionTypeId: number; // typeorm이 컬럼이 아니라 객체 취급하여 이렇게 추가해야됨

  @ManyToOne(() => IngredientsType, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ingredients_type_id' })
  ingredientsType: IngredientsType;

  @Column({ nullable: false })
  ingredientsTypeId: number;

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt: Date;
}
