use entrega_de_refeicoes;


-- Traz todos os usuários cadastrados
select 
    *, t.numero as numero_telefone, en.numero as numero_endereco 
from 
    cliente c
    left join email e on e.cpf = c.cpf_cliente
    left join telefone t on t.cpf = c.cpf_cliente
    left join endereco en on en.cpf = c.cpf_cliente;

select 
    *, te.numero as numero_telefone, er.numero as numero_endereco  
from restaurante r
    inner join emailRestaurante e on e.cnpj = r.cnpj
    inner join telefoneRestaurante te on te.cnpj = r.cnpj
    inner join enderecoRestaurante er on er.cnpj = r.cnpj;
