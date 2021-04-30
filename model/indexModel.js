const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "entrega_de_refeicoes",
  "postgres",
  "senha123",
  {
    host: "localhost",
    dialect: "postgres",
  }
);

const insertRestaurantes = async (restaurante) => {
  let restauranteExistenteQuery = `
  SELECT cnpj
  FROM  restaurante
  WHERE cnpj = '${restaurante.cnpj}';
  `;
  let [results, metadata] = await sequelize.query(restauranteExistenteQuery);
  if (results.length > 0) {
    return "cnpj já cadastrado";
  }

  let restauranteQuery = ` 
    INSERT INTO 
      restaurante (senha, cnpj, horariofuncionamento, horariofechamento, nomeoficial, nomefantasia)
      VALUES ('${restaurante.senha}', '${restaurante.cnpj}', '${restaurante.abertura}', '${restaurante.fechamento}', '${restaurante.nomeOficial}', '${restaurante.nomeFantasia}');
    `;
  [results, metadata] = await sequelize.query(restauranteQuery);

  enderecoQuery = `
    INSERT INTO
      enderecoRestaurante (cnpj, cep, logradouro, cidade, bairro, pais, numero, complemento)
      VALUES (
        '${restaurante.cnpj}', '${restaurante.cep}', 
        '${restaurante.logradouro}', '${restaurante.cidade}', 
        '${restaurante.bairro}', '${restaurante.pais}', 
        ${restaurante.numero}, ${restaurante.complemento || "null"});
    `;
  [results, metadata] = await sequelize.query(enderecoQuery);

  emailQuery = `
    INSERT INTO
      emailRestaurante
    VALUES('${restaurante.cnpj}','${restaurante.email}');
  `;
  [results, metadata] = await sequelize.query(emailQuery);

  telefone = restaurante.telefone.split(" ");
  telefoneQuery = `
    INSERT INTO
      telefoneRestaurante
    VALUES('${restaurante.cnpj}', 
    ${parseInt(telefone[0])}, 
    ${parseInt(telefone[1])},
    ${parseInt(telefone[2])}
    );
  `;
  try {
    [results, metadata] = await sequelize.query(telefoneQuery);
  } catch {
    (err) => console.log(err);
  }

  return "sucesso";
};

const getRestaurantes = async () => {
  let getAllRestaurantesQuery = `
  SELECT 
    *, te.numero as numero_telefone, er.numero as numero_endereco  
  FROM restaurante r
    INNER JOIN emailRestaurante e on e.cnpj = r.cnpj
    INNER JOIN telefoneRestaurante te on te.cnpj = r.cnpj
    INNER JOIN enderecoRestaurante er on er.cnpj = r.cnpj; 
  `;
  let [results, metadata] = await sequelize.query(getAllRestaurantesQuery);
  return results;
};

const insertClientes = async (cliente) => {
  let usuarioExistenteQuery = `
  SELECT cpf_cliente
  FROM  cliente
  WHERE cpf_cliente = '${cliente.cpf}';
  `;
  let [results, metadata] = await sequelize.query(usuarioExistenteQuery);
  if (results.length > 0) {
    return "cpf já cadastrado";
  }

  let clienteQuery = ` 
    INSERT INTO 
      cliente (senha, cpf_cliente, rg, primeironome, sobrenome)
      VALUES ('${cliente.senha}', '${cliente.cpf}', '${cliente.rg}', '${cliente.primeiro_nome}', '${cliente.sobrenome}');
    `;
  [results, metadata] = await sequelize.query(clienteQuery);

  enderecoClienteQuery = `
    INSERT INTO
      endereco (cpf, cep, logradouro, cidade, bairro, pais, numero, complemento)
      VALUES (
        '${cliente.cpf}', '${cliente.cep}', '${cliente.logradouro}', 
        '${cliente.cidade}', '${cliente.bairro}', '${cliente.pais}', 
        ${cliente.numero}, ${cliente.complemento || "null"});
    `;
  [results, metadata] = await sequelize.query(enderecoClienteQuery);

  emailQuery = `
    INSERT INTO
      email
    VALUES('${cliente.cpf}','${cliente.email}');
  `;
  [results, metadata] = await sequelize.query(emailQuery);

  telefone = cliente.telefone.split(" ");
  telefoneQuery = `
    INSERT INTO
      telefone
    VALUES('${cliente.cpf}', 
    ${parseInt(telefone[0])}, 
    ${parseInt(telefone[1])},
    ${parseInt(telefone[2])}
    );
  `;
  try {
    [results, metadata] = await sequelize.query(telefoneQuery);
  } catch {
    (err) => console.log(err);
  }

  return "sucesso";
};

const getClientes = async () => {
  let getAllClientesQuery = `
  select *, t.numero as numero_telefone, en.numero as numero_endereco from cliente c
  left join email e on e.cpf = c.cpf_cliente
  left join telefone t on t.cpf = c.cpf_cliente
  left join endereco en on en.cpf = c.cpf_cliente
  `;
  let [results, metadata] = await sequelize.query(getAllClientesQuery);
  return results;
};

module.exports = {
  insertClientes,
  getClientes,
  insertRestaurantes,
  getRestaurantes,
};
