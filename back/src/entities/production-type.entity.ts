import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Region } from './region.entity';

@Entity({ name: 'production_type' })
export class ProductionType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false, type: 'varchar', length: 50 })
  name: string; // 아이템길이 50자는 안넘을 가능성이 매우높음

  @Column({ nullable: false, type: 'smallint', unsigned: true })
  productionMinute: number; // 분당 생산량

  @Column({ nullable: false, type: 'int', unsigned: true })
  price: number;

  @ManyToOne(() => Region, { onDelete: 'CASCADE' }) // OneToMany 생략가능해서 생략
  @JoinColumn({ name: 'region_id' })
  region: Region;

  @Column({ nullable: false })
  regionId: number;

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt: Date;
}
