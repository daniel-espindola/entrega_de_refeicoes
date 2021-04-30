const bcrypt = require("bcrypt");
const bd = require("../model/indexModel");

module.exports = {
  index: (req, res) => {
    res.render("index");
  },

  // Rotas dos Restaurantes

  getAllRestaurantes: async (req, res) => {
    res.render("restaurantes", { restaurantes: await bd.getRestaurantes() });
  },

  cadastroRestaurante: (req, res) => {
    res.render("cadastro-restaurante");
  },

  cadastroRestaurantePost: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.senha, salt);
      req.body.senha = hashedPassword;
      result = await bd.insertRestaurantes(req.body);
      if (result == "sucesso") {
        res.status(201).send("sucesso");
      } else {
        res.status(500).send();
      }
    } catch {
      res.status(500).send();
    }
  },

  // FIM - Rotas dos Restaurantes

  // Rotas dos Clientes
  getAllClientes: async (req, res) => {
    res.render("clientes", { clientes: await bd.getClientes() });
  },

  cadastroCliente: (req, res) => {
    res.render("cadastro-cliente");
  },

  cadastroClientePost: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.senha, salt);
      req.body.senha = hashedPassword;
      result = await bd.insertClientes(req.body);
      if (result == "sucesso") {
        res.status(201).send("sucesso");
      } else {
        res.status(500).send();
      }
    } catch {
      res.status(500).send();
    }
  },

  loginClientPost: async (req, res) => {
    let senhaDoBanco = "testestes";
    try {
      if (await bcrypt.compare(req.body.senha, senhaDoBanco)) {
        res.send("success");
      } else {
        res.send("failed");
      }
    } catch {
      res.status(500).send();
    }
  },
  // FIM - Rotas dos Clientes

  cadastroPrato: (req, res) => {
    res.render("cadastro-prato");
  },

  cadastroRefeições: (req, res) => {
    res.render("cadastro-refeicoes");
  },
};
