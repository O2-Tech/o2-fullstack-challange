/* eslint-disable no-unused-vars */

import { ICreateStockMovement } from '../models/ICreateStockMovement';
import { IStockMovements } from '../models/IStockMovement';
import { EntityManager } from 'typeorm'; // Importe EntityManager

export interface IStockRepository {
  executeInTransaction<T>(
    callback: (entityManager: EntityManager) => Promise<T>,
  ): Promise<T>;
  findAll(): Promise<IStockMovements[]>;
  findById(id: number): Promise<IStockMovements | null>;
  create(
    data: ICreateStockMovement,
    entityManager?: EntityManager,
  ): Promise<IStockMovements>;
}
