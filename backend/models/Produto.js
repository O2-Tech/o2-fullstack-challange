const mongoose = require("mongoose");

const { Schema } = mongoose;

const produtoSchema = new Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    descricao: {
      type: String,
      required: true,
    },
    quantidadeDisponivel: {
      type: Number,
      required: true,
    },
    precoUnitario: {
      type: Number,
      required: true,
    },
    categoria: {
      type: String,
      rquired: true,
    },
  },
  { timestamps: true }
);

const Produto = mongoose.model("Produto", produtoSchema);

module.exports = {
  Produto,
  produtoSchema,
};
