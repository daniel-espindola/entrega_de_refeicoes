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

  loginRestaurante: async (req, res) => {
    res.render("login", { tipo: "restaurante" });
  },

  loginRestaurantePost: async (req, res) => {
    res.render("login", { tipo: "restaurante" });
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

  loginCliente: async (req, res) => {
    res.render("login", { tipo: "cliente" });
  },

  loginClientePost: async (req, res) => {
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

  // Rotas dos Entregadores
  getAllEntregadores: async (req, res) => {
    res.render("entregadores", { entregadores: await bd.getEntregadores() });
  },

  cadastroEntregador: (req, res) => {
    res.render("cadastro-entregador");
  },

  cadastroEntregadorPost: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.senha, salt);
      req.body.senha = hashedPassword;
      result = await bd.insertEntregador(req.body);
      if (result == "sucesso") {
        res.status(201).send("sucesso");
      } else {
        res.status(500).send();
      }
    } catch {
      res.status(500).send();
    }
  },

  loginEntregadorPost: async (req, res) => {
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

  loginEntregador: async (req, res) => {
    res.render("login", { tipo: "entregador" });
  },
  // FIM - Rotas dos Entregadores

  cadastroPrato: (req, res) => {
    res.render("cadastro-prato");
  },

  cadastroRefeições: (req, res) => {
    res.render("cadastro-refeicoes");
  },
};
