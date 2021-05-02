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

const insertEntregador = async (entregador) => {
  let entregadorExistenteQuery = `
  SELECT cpf_entregador
  FROM  entregador
  WHERE cpf_entregador = '${entregador.cpf}';
  `;
  let [results, metadata] = await sequelize
    .query(entregadorExistenteQuery)
    .catch((err) => console.log(err));
  if (results.length > 0) {
    return "cpf já cadastrado";
  }

  let entregadorQuery = ` 
    INSERT INTO 
      entregador (senha, cpf_entregador, rg, primeronome, sobrenome)
      VALUES ('${entregador.senha}', '${entregador.cpf}', '${entregador.rg}', '${entregador.primeiro_nome}', '${entregador.sobrenome}');
    `;

  [results, metadata] = await sequelize
    .query(entregadorQuery)
    .catch((err) => console.log(err));

  //TODO VERIFICAR SE O ENTREGADOR JÁ EXISTE COMO CLIENTE
  enderecoEntregadorQuery = `
    INSERT INTO
      endereco (cpf, cep, logradouro, cidade, bairro, pais, numero, complemento)
      VALUES (
        '${entregador.cpf}', '${entregador.cep}', '${entregador.logradouro}', 
        '${entregador.cidade}', '${entregador.bairro}', '${entregador.pais}', 
        ${entregador.numero}, ${entregador.complemento || "null"});
    `;
  [results, metadata] = await sequelize
    .query(enderecoEntregadorQuery)
    .catch((err) => console.log(err));

  emailQuery = `
    INSERT INTO
      email
    VALUES('${entregador.cpf}','${entregador.email}');
  `;
  [results, metadata] = await sequelize
    .query(emailQuery)
    .catch((err) => console.log(err));

  telefone = entregador.telefone.split(" ");
  telefoneQuery = `
    INSERT INTO
      telefone
    VALUES('${entregador.cpf}', 
    ${parseInt(telefone[0])}, 
    ${parseInt(telefone[1])},
    ${parseInt(telefone[2])}
    );
  `;
  [results, metadata] = await sequelize
    .query(telefoneQuery)
    .catch((err) => console.log(err));

  veiculoQuery = `
    INSERT INTO
      veiculo
    VALUES('${entregador.placa}', '${entregador.cpf}', '${entregador.modelo}', '${entregador.marca}');
  `;

  [results, metadata] = await sequelize
    .query(veiculoQuery)
    .catch((err) => console.log(err));

  return "sucesso";
};

const getEntregadores = async () => {
  let getAllEntregadoresQuery = `
  select 
  *, t.numero as numero_telefone, en.numero as numero_endereco   
  from entregador c
    inner join email e on e.cpf = c.cpf_entregador
    inner join telefone t on t.cpf = c.cpf_entregador
    inner join endereco en on en.cpf = c.cpf_entregador
    inner join veiculo ve on ve.cpf_entregador = c.cpf_entregador;
  `;
  let [results, metadata] = await sequelize.query(getAllEntregadoresQuery);
  return results;
};

const getAllPratosFromRestaurante = async (cnpjRestaurante) => {
  let pratos = `
  select 
  *
  from prato p
  left join restaurante r on r.cnpj = p.cnpj
  where p.cnpj = '${cnpjRestaurante}';
  `;
  let [results, metadata] = await sequelize.query(pratos);
  return results;
};

const insertPrato = async (prato) => {
  insertPratoQuery = `
    INSERT INTO
      prato (tipocomida, cnpj, preco, descricao, foto)
    VALUES('${prato.tipoComida}', '${prato.cnpj}', '${prato.preco}', '${prato.descricao}', '${prato.foto}');
  `;

  let [results, metadata] = await sequelize
    .query(insertPratoQuery)
    .catch((err) => console.log(err));

  return "sucesso";
};

const getAllPedidos = async () => {
  let pedidos = `
  SELECT *, e.logradouro as clogradouro, e.bairro as cbairro, e.cidade as ccidade, e.numero as cnumero FROM 
    pedido p
  INNER JOIN 
    item i on i.idPedido = p.idPedido
  INNER JOIN 
    prato pr on pr.idPrato = i.idPrato
  INNER JOIN
  	restaurante r on r.cnpj = pr.cnpj
  INNER JOIN
  	cliente c on c.cpf_cliente = p.cpf_cliente
  INNER JOIN
    endereco e on e.cpf = c.cpf_cliente
  INNER JOIN
  	enderecoRestaurante er on er.cnpj = r.cnpj
  
  `;
  let [results, metadata] = await sequelize.query(pedidos);
  return results;
};

const insertPedidos = async (pedidos) => {
  queryInsertPedido = `
      INSERT INTO
        pedido (formapagamento, cpf_cliente)
      VALUES('${pedidos[0].formapagamento}', '${pedidos[0].cpf}');
    `;
  let [results, metadata] = await sequelize
    .query(queryInsertPedido)
    .catch((err) => console.log(err));

  queryIdPedido = `
    SELECT idpedido FROM pedido
    ORDER BY idpedido DESC
    LIMIT 1
  `;
  [results, metadata] = await sequelize
    .query(queryIdPedido)
    .catch((err) => console.log(err));
  let idPedido = results[0].idpedido;

  queryInsertItem = `
      INSERT INTO 
        item(idPedido, idPrato, quantidadeitem)
      VALUES
    `;
  let pedido;
  for (pedido of pedidos) {
    queryInsertItem += `
      ('${idPedido}', '${pedido.idprato}', '${pedido.qtd}'),`;
  }
  queryInsertItem = queryInsertItem.replace(/.$/, ";");

  [results, metadata] = await sequelize
    .query(queryInsertItem)
    .catch((err) => console.log(err));
};

module.exports = {
  insertClientes,
  getClientes,
  insertRestaurantes,
  getRestaurantes,
  insertEntregador,
  getEntregadores,
  insertPrato,
  getAllPratosFromRestaurante,
  insertPedidos,
  getAllPedidos,
};
