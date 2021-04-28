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

const insertClientes = async (cliente) => {
  let usuarioExistenteQuery = `
  SELECT cpf_cliente
  FROM  cliente
  WHERE cpf_cliente = '${cliente.cpf}';
  `;
  let [results, metadata] = await sequelize.query(usuarioExistenteQuery);
  if (!results) {
    return "cpf já cadastrado";
  }

  let clienteQuery = ` 
    INSERT INTO 
      cliente (senha, cpf_cliente, rg, primeironome, sobrenome)
      VALUES ('${cliente.senha}', '${cliente.cpf}', '${cliente.rg}', '${cliente.primeiro_nome}', '${cliente.sobrenome}');
    `;
  [results, metadata] = await sequelize.query(clienteQuery);

  for (let endereco of cliente.enderecos) {
    enderecoClienteQuery = `
    INSERT INTO
      endereco (cpf, cep, logradouro, cidade, bairro, pais, numero, complemento)
      VALUES (
        '${cliente.cpf}', '${endereco.cep}', '${endereco.logradouro}', 
        '${endereco.cidade}', '${endereco.bairro}', '${endereco.pais}', 
        ${endereco.numero}, ${endereco.complemento || "null"});
    `;
    [results, metadata] = await sequelize.query(enderecoClienteQuery);
  }

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

module.exports = { insertClientes };
