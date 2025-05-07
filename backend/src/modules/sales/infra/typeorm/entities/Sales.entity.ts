import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { SaleItem } from './SalesItem.entity';
import { ISales } from '@modules/sales/domain/models/ISales';

@Entity('sales')
export class Sales implements ISales {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'datetime' })
  sale_date: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total_value: number;

  @OneToMany(() => SaleItem, item => item.sale)
  sale_items: SaleItem[];
}
