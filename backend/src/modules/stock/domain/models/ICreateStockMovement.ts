interface ICreateStockMovement {
  product_id: number;
  type: 'in' | 'out';
  quantity: number;
}

export { ICreateStockMovement };
