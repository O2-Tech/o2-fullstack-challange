/* eslint-disable no-unused-vars */

import { EntityManager } from 'typeorm';
import { ICreateSales } from '../models/ICreateSale';
import { ISales } from '../models/ISales';

export interface ISalesRepository {
  create(data: ICreateSales): Promise<ISales>;
  findAll(): Promise<ISales[]>;
  findById(id: number): Promise<ISales | null>;
  findByPeriod(startDate: Date, endDate: Date): Promise<ISales[]>;
  getTotalStockValue(): Promise<number>;
  getTotalItemsSold(): Promise<number>;
  getMostSoldProducts(): Promise<
    {
      product_id: number;
      name: string;
      total_sold: number;
    }[]
  >;
  executeInTransaction<T>(
    callback: (entityManager: EntityManager) => Promise<T>,
  ): Promise<T>;
}
