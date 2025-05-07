import { IProducts } from '@modules/products/domain/models/IProducts';
import { Entity } from 'typeorm';

@Entity('Products')
class Products implements IProducts {}
export default Products;
