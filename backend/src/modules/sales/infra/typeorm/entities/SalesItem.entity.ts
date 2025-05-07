import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Sales } from './Sales.entity';
import Product from '@modules/products/infra/typeorm/entities/Products.entity';
import { ISaleItems } from '@modules/sales/domain/models/ISalesItem';

@Entity('sale_items')
export class SaleItem implements ISaleItems {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  product_id: number;

  @Column()
  sale_id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  unit_price: number;

  @ManyToOne(() => Sales, sale => sale.sale_items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sale_id' })
  sale: Sales;

  @ManyToOne(() => Product, product => product.sale_items, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
