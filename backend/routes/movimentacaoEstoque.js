const router = require("express").Router();

const MovimentacaoEstoqueController = require("../controllers/movimentacaoEstoqueController");

router
  .route("/movimentacaoEstoque")
  .post((req, res) => MovimentacaoEstoqueController.create(req, res));

router
  .route("/movimentacaoEstoque")
  .get((req, res) => MovimentacaoEstoqueController.getAll(req, res));

module.exports = router;
