# O2 Challenge API 🚀

API para gerenciamento de produtos com Node.js + Express + TypeORM

## 📋 Pré-requisitos

* [Node.js v20+](https://nodejs.org/)
* [Docker](https://www.docker.com/)
* [npm](https://www.npmjs.com/)

## 🛠️ Configuração Rápida

1.  Clone o repositório

    ```bash
    git clone [https://github.com/jeeffsantoos/o2-challange.git](https://github.com/jeeffsantoos/o2-challange.git)
    cd o2-challange
    ```
2.  Crie o arquivo .env

    ```bash
    echo "DB_PORT=3306
    DB_USER=admin
    DB_HOST=localhost
    DB_PASSWORD=123
    DB_NAME=o2-challange" > .env
    ```
3.  Suba o container do MySQL

    ```bash
    docker-compose up -d
    ```
4.  Instale as dependências

    ```bash
    npm install
    ```
5.  Execute as migrations

    ```bash
    npm run migration:run
    ```
6.  Inicie o servidor

    ```bash
    npm run dev
    ```

## 📡 Rotas da API (v1)

Base URL: http://localhost:3000/api/v1

## Estrutura de Rotas

### Rotas dos Produtos

As seguintes rotas estão definidas na API:

* `GET /products/`: Lista todos os produtos.
* `GET /products/:id`: Exibe os detalhes do produto com o ID especificado.
* `POST /products/create`: Cria um novo produto.
* `PUT /products/update/:id`: Atualiza os dados do produto com o ID especificado.
* `DELETE /products/delete/:id`: Exclui o produto com o ID especificado.

### Rotas de Movimentação de Estoque

* `GET /stocks/`: Lista todas as movimentações de estoque.
* `GET /stocks/:id`: Exibe os detalhes da movimentação de estoque com o ID especificado.
* `POST /stocks/create`: Cria uma nova movimentação de estoque.

### Rotas de Vendas

* `POST /sales/create`: Cria uma nova venda.
* `GET /sales/`: Lista todas as vendas.
* `GET /sales/show/:id`: Exibe os detalhes da venda com o ID especificado.
* `POST /sales/period`: Lista as vendas dentro de um período específico.
* `GET /sales/total-stock-value`: Obtém o valor total do estoque.
* `GET /sales/total-items-sold`: Obtém o total de itens vendidos.
* `GET /sales/most-sold-products`: Obtém os produtos mais vendidos.
