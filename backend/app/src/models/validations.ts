import { t } from 'elysia';

export const productValidationSchema = t.Object({
  name: t.String({
    minLength: 1,
    error: 'Nome do produto é obrigatório',
  }),
  description: t.String({
    minLength: 1,
    error: 'Descrição do produto é obrigatória',
  }),
  price: t.Number({
    error: 'Preço é obrigatório',
  }),
  category: t.String({
    minLength: 1,
    error: 'Categoria é obrigatória',
  }),
  quantity: t.Number({
    minimum: 0,
    error: 'Quantidade deve ser maior ou igual a zero',
  }),
});

export const stockMovementValidationSchema = t.Object({
  productId: t.Number({
    error: 'ID do produto é obrigatório',
  }),
  quantity: t.Number({
    error: 'Quantidade é obrigatória',
  }),
  type: t.Enum(
    {
      IN: 'IN',
      OUT: 'OUT',
    },
    {
      error: "Tipo deve ser 'IN' ou 'OUT'",
    },
  ),
  reason: t.String({
    minLength: 1,
    error: 'Motivo é obrigatório',
  }),
});
