const router = require("express").Router();

const produtoRouter = require("./produtos");
router.use("/", produtoRouter);

const movimentacaoEstoqueRouter = require("./movimentacaoEstoque");
router.use("/", movimentacaoEstoqueRouter);

module.exports = router;
