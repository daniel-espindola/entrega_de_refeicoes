const bcrypt = require("bcrypt");
const bd = require("../model/indexModel");

module.exports = {
  index: (req, res) => {
    res.render("index");
  },

  cadastroRestaurante: (req, res) => {
    res.render("cadastro-restaurante");
  },

  cadastroCliente: (req, res) => {
    res.render("cadastro-cliente");
  },

  cadastroClientePost: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.senha, salt);
      req.body.senha = hashedPassword;
      res = bd.insertClientes(req.body);
      if (res == "sucesso") {
        res.status(201).send();
      }
      res.status(500).send();
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

  cadastroPrato: (req, res) => {
    res.render("cadastro-prato");
  },

  cadastroRefeições: (req, res) => {
    res.render("cadastro-refeicoes");
  },
};
