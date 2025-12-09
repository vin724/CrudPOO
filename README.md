# Sistema de Mapeamento de Pontos de Acessibilidade  
API REST desenvolvida com Spring Boot

Este projeto consiste em um sistema CRUD para mapear locais e avaliar sua acessibilidade, permitindo cadastrar, consultar, atualizar e remover pontos acessíveis.  
O sistema também calcula automaticamente um Índice de Acessibilidade baseado nas características cadastradas.

## Tecnologias Utilizadas
- Java 17+
- Spring Boot 3+
- Spring Web
- Oracle Database 
- Maven

## Funcionalidades
- Cadastro de pontos de acessibilidade  
- Atualização de informações  
- Exclusão de pontos  
- Listagem completa  
- Consulta por ID  
- Cálculo automático do Índice de Acessibilidade  

## 🗂 Endpoints da API
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/pontos-acessibilidade` | Lista todos os pontos |
| GET | `/pontos-acessibilidade/nome/{nome}` | Busca por nome |
| POST | `/pontos-acessibilidade` | Cria um novo ponto |
| PUT | `/pontos-acessibilidade/{id}` | Atualiza um ponto |
| DELETE | `/pontos-acessibilidade/{id}` | Remove um ponto |

## Cálculo do Índice de Acessibilidade
Cada item soma 25 pontos:

- Possui rampa  
- Possui banheiro adaptado  
- Possui vaga PCD  
- Não possui obstáculos  

Total máximo: 100 pontos

## Modelo da tabela no Oracle
```sql
CREATE TABLE pontoacessibilidade (
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome_local VARCHAR2(255) NOT NULL,
    endereco VARCHAR2(255) NOT NULL,
    tipo_local VARCHAR2(255),
    tem_rampa NUMBER(1),
    tem_banheiro_adaptado NUMBER(1),
    tem_vaga_pcd NUMBER(1),
    possui_obstaculos NUMBER(1),
    acessibilidade_geral VARCHAR2(255),
    descricao VARCHAR2(500)
);
```
## Autor:
Projeto desenvolvido por
- João Antônio Campos Jacintho de Oliviera Moraes
- Vinicius Shiro Nishie Kitazawa
