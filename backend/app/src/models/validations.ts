import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().optional(),
  quantity: z.number().int().min(0, "Quantidade deve ser maior ou igual a 0"),
  price: z.number().positive("Preço deve ser maior que 0").transform(String),
  category: z.string().min(1, "Categoria é obrigatória"),
  minQuantity: z.number().int().min(0).default(0),
});

export const stockMovementSchema = z.object({
  productId: z.number().int().positive("ID do produto é obrigatório"),
  quantity: z.number().int().positive("Quantidade deve ser maior que 0"),
  type: z.enum(["entrada", "saida"], {
    required_error: "Tipo é obrigatório",
    invalid_type_error: "Tipo deve ser 'entrada' ou 'saida'",
  }),
  description: z.string().optional(),
});

export type ProductInput = z.infer<typeof productSchema>;
export type StockMovementInput = z.infer<typeof stockMovementSchema>;
