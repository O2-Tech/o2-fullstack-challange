import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { IProducts } from '@modules/products/domain/models/IProducts';
import { SaleItem } from '@modules/sales/infra/typeorm/entities/SalesItem.entity';
import { StockMovement } from '@modules/stock/infra/typeorm/entities/StockMovement.entity';

@Entity('products')
export default class Product implements IProducts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({ type: 'int', default: 0 })
  available_quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  unit_price: number;

  @Column({ length: 100, nullable: true })
  category: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @OneToMany(() => StockMovement, movement => movement.product)
  stock_movements: StockMovement[];

  @OneToMany(() => SaleItem, item => item.product)
  sale_items: SaleItem[];
}
