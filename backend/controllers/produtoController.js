const { Produto: ProdutoModel } = require("../models/Produto");
const {
  MovimentacaoEstoque: MovimentacaoEstoqueModel,
} = require("../models/MovimentacaoEstoque");

const produtoController = {
  create: async (req, res) => {
    try {
      const produto = {
        nome: req.body.nome,
        descricao: req.body.descricao,
        quantidadeDisponivel: req.body.quantidadeDisponivel,
        precoUnitario: Number(req.body.precoUnitario.replaceAll(",", ".")),
        categoria: req.body.categoria,
      };

      const response = await ProdutoModel.create(produto);

      if (produto.quantidadeDisponivel > 0) {
        const movimentacaoEstoque = {
          produto: response,
          tipoMovimentacao: "ENTRADA",
          quantidade: produto.quantidadeDisponivel,
          observacao:
            "Movimentação gerada automaticamente ao cadastrar o produto",
        };
        await MovimentacaoEstoqueModel.create(movimentacaoEstoque);
      }

      res.status(201).json({ response, msg: "Produto criado com sucesso!" });
    } catch (error) {
      console.log(error);
    }
  },
  getAll: async (req, res) => {
    try {
      const produtos = req.query.pesquisa
        ? await ProdutoModel.find({
            nome: { $regex: req.query.pesquisa, $options: "i" },
          })
        : await ProdutoModel.find();

      res.json(produtos);
    } catch (error) {
      console.log(error);
    }
  },
  get: async (req, res) => {
    try {
      const id = req.params.id;
      const produto = await ProdutoModel.findById(id);

      if (!produto) {
        res.status(404).json({ msg: "Produto não encotrado" });
        return;
      }
      res.json(produto);
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const produto = await ProdutoModel.findById(id);

      if (!produto) {
        res.status(404).json({ msg: "Produto não encotrado" });
        return;
      }

      if (produto.quantidadeDisponivel > 0) {
        const movimentacaoEstoque = {
          produto: produto,
          tipoMovimentacao: "SAÍDA",
          quantidade: produto.quantidadeDisponivel,
          observacao:
            "Movimentação gerada automaticamente ao excluir o produto",
        };
        await MovimentacaoEstoqueModel.create(movimentacaoEstoque);
      }

      const deleteProduto = await ProdutoModel.findByIdAndDelete(id);

      res
        .status(200)
        .json({ deleteProduto, msg: "Produto excluído com sucesso!" });
    } catch (error) {
      console.log(error);
    }
  },
  update: async (req, res) => {
    const id = req.params.id;

    const produto = {
      nome: req.body.nome,
      descricao: req.body.descricao,
      quantidadeDisponivel: req.body.quantidadeDisponivel,
      precoUnitario: Number(req.body.precoUnitario.replaceAll(",", ".")),
      categoria: req.body.categoria,
    };

    const updateProduto = await ProdutoModel.findByIdAndUpdate(id, produto);

    if (!updateProduto) {
      res.status(404).json({ msg: "Produto não encotrado" });
      return;
    }

    res.status(200).json({ produto, msg: "Produto atualizado com sucesso! " });
  },
};

module.exports = produtoController;
