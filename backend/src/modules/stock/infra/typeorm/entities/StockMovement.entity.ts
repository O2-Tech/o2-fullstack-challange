import Product from '@modules/products/infra/typeorm/entities/Products.entity';
import { IStockMovements } from '@modules/stock/domain/models/IStockMovement';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';

@Entity('stock_movements')
export class StockMovement implements IStockMovements {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ['in', 'out'] })
  type: 'in' | 'out';

  @Column()
  quantity: number;

  @CreateDateColumn({ type: 'datetime' })
  movement_date: Date;

  @Column()
  product_id: number;

  @ManyToOne(() => Product, product => product.stock_movements, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
