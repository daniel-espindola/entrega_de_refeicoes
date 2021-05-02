var express = require("express");
var router = express.Router();

const IndexController = require("../controllers/indexController");

/* GET home page. */
router.get("/", IndexController.index);

router.get("/restaurantes", IndexController.getAllRestaurantes);
router.get("/cadastro/restaurante", IndexController.cadastroRestaurante);
router.post("/cadastro/restaurante", IndexController.cadastroRestaurantePost);
router.get("/cadastro/prato", IndexController.cadastroPrato);
router.post("/cadastro/prato", IndexController.cadastroPratoPost);
router.get("/login/restaurante", IndexController.loginRestaurante);
router.get("/:id/pratos", IndexController.getAllPratosFromRestaurante);
router.post("/login/restaurante", IndexController.loginRestaurantePost);

router.get("/clientes", IndexController.getAllClientes);
router.get("/cadastro/cliente", IndexController.cadastroCliente);
router.post("/cadastro/cliente", IndexController.cadastroClientePost);
router.get("/login/cliente", IndexController.loginCliente);
router.post("/login/cliente", IndexController.loginClientePost);
router.post("/cadastro/pedidos", IndexController.cadastroPedidosPost);

router.get("/entregadores", IndexController.getAllEntregadores);
router.get("/cadastro/entregador", IndexController.cadastroEntregador);
router.post("/cadastro/entregador", IndexController.cadastroEntregadorPost);
router.get("/login/entregador", IndexController.loginEntregador);
router.post("/login/entregador", IndexController.loginEntregadorPost);
router.get("/pedidos", IndexController.getAllPedidos);

router.get("/cadastro/restaurante/prato", IndexController.cadastroPrato);

module.exports = router;
