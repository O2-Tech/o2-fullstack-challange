/* eslint-disable no-unused-vars */

import { ICreateProduct } from '../models/ICreateProduct';
import { IProducts } from '../models/IProducts';
import { IUpdateProduct } from '../models/IUpdateProduct';

export interface IProductsRepository {
  findAll(): Promise<IProducts[]>;
  findOne(id: number): Promise<IProducts | null>;
  create(data: ICreateProduct): Promise<IProducts>;
  update(data: IUpdateProduct): Promise<IProducts | null>;
  save(product: IProducts): Promise<IProducts>;
  delete(id: number): Promise<void>;
}
