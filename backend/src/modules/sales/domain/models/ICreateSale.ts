interface ICreateSales {
  sale_date: Date;
  sale_items: {
    product_id: number;
    quantity: number;
    unit_price: number;
  }[];
}

export { ICreateSales };
