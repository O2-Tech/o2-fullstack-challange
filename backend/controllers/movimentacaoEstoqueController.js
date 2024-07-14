const {
  MovimentacaoEstoque: MovimentacaoEstoqueModel,
} = require("../models/MovimentacaoEstoque");
const { Produto: ProdutoModel } = require("../models/Produto");

const movimentacaoEstoqueController = {
  create: async (req, res) => {
    try {
      const produto = await ProdutoModel.findById(req.body.idProduto);

      const movimentacaoEstoque = {
        produto: produto,
        tipoMovimentacao: req.body.tipoMovimentacao,
        quantidade: req.body.quantidade,
        observacao: req.body.observacao,
      };

      if (
        movimentacaoEstoque.tipoMovimentacao == "SAÍDA" &&
        produto.quantidadeDisponivel - movimentacaoEstoque.quantidade < 0
      ) {
        res.status(400).json({
          msg: `A quantidade de saída não pode ser maior que a quantidade disponível (${produto.quantidadeDisponivel})`,
        });
        return;
      }

      await ProdutoModel.findByIdAndUpdate(req.body.idProduto, {
        ...produto._doc,
        quantidadeDisponivel:
          movimentacaoEstoque.tipoMovimentacao == "SAÍDA"
            ? Number(produto.quantidadeDisponivel) -
              Number(movimentacaoEstoque.quantidade)
            : Number(produto.quantidadeDisponivel) +
              Number(movimentacaoEstoque.quantidade),
      });

      const response = await MovimentacaoEstoqueModel.create(
        movimentacaoEstoque
      );

      res
        .status(201)
        .json({ response, msg: "Movimentação criada com sucesso!" });
    } catch (error) {
      console.log(error);
    }
  },
  getAll: async (req, res) => {
    try {
      const movimentacaoEstoque = req.query.dataInicial
        ? await MovimentacaoEstoqueModel.find({
            createdAt: {
              $gte: new Date(req.query.dataInicial),
              $lte: new Date(req.query.dataFinal),
            },
          })
        : await MovimentacaoEstoqueModel.find();

      res.json(movimentacaoEstoque);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = movimentacaoEstoqueController;
