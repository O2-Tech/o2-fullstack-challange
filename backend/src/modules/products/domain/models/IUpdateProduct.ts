interface IUpdateProduct {
  id: number;
  name?: string;
  description?: string;
  available_quantity?: number;
  unit_price?: number;
  category?: string;
}

export { IUpdateProduct };
