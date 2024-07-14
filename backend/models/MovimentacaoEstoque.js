const mongoose = require("mongoose");
const { produtoSchema } = require("./Produto");

const { Schema } = mongoose;

const movimentacaoEstoqueSchema = new Schema(
  {
    produto: {
      type: produtoSchema,
      required: true,
    },
    tipoMovimentacao: {
      type: String,
      required: true,
    },
    quantidade: {
      type: Number,
      required: true,
    },
    observacao: {
      type: String,
    },
  },
  { timestamps: true }
);

const MovimentacaoEstoque = mongoose.model(
  "MovimentacaoEstoque",
  movimentacaoEstoqueSchema
);

module.exports = {
  MovimentacaoEstoque,
  movimentacaoEstoqueSchema,
};
