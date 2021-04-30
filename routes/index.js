var express = require("express");
var router = express.Router();

const IndexController = require("../controllers/indexController");

/* GET home page. */
router.get("/", IndexController.index);

router.get("/restaurantes", IndexController.getAllRestaurantes);
router.get("/cadastro/restaurante", IndexController.cadastroRestaurante);
router.post("/cadastro/restaurante", IndexController.cadastroRestaurantePost);

router.get("/clientes", IndexController.getAllClientes);
router.get("/cadastro/cliente", IndexController.cadastroCliente);
router.post("/cadastro/cliente", IndexController.cadastroClientePost);

router.get("/cadastro/restaurante/prato", IndexController.cadastroPrato);

module.exports = router;
