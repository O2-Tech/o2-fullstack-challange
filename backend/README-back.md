# O2 Challenge API 🚀

API para gerenciamento de produtos com Node.js + Express + TypeORM

---

## 📋 Pré-requisitos
- [Node.js v20+](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [npm](https://www.npmjs.com/)

---

## 🛠️ Configuração Rápida

```bash
# 1. Clone o repositório
git clone https://github.com/jeeffsantoos/o2-challange.git
cd o2-challange

# 2. Crie o arquivo .env
echo "DB_PORT=3306
DB_USER=admin
DB_HOST=localhost
DB_PASSWORD=123
DB_NAME=o2-challange

# 3. Suba o container do MySQL
docker-compose up -d

# 4. Instale dependências
npm install

# 5. Execute as migrations
npm run migration:run

# 6. Inicie o servidor
npm run dev

```


## 📡 Rotas da API (v1)
Base URL: http://localhost:3000/api/v1

## Estrutura de Rotas

### Rotas dos Produtos

As seguintes rotas estão definidas na API:

-   `GET /products/`: Lista todos os produtos.
-   `GET /products/:id`: Exibe os detalhes do produto com o ID especificado.
-   `POST /products/create`: Cria um novo produto.
-   `PUT /products/update/:id`: Atualiza os dados do produto com o ID especificado.
-   `DELETE /products/delete/:id`: Exclui o produto com o ID especificado.
