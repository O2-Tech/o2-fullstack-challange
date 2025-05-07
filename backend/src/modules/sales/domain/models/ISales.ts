import { ISaleItems } from './ISalesItem';

interface ISales {
  id: number;
  sale_date: Date;
  total_value: number;

  sale_items?: ISaleItems[];
}

export { ISales };
