interface ICreateProduct {
  name: string;
  description?: string;
  available_quantity?: number;
  unit_price: number;
  category?: string;
}

export { ICreateProduct };
