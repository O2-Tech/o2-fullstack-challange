import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { productController } from "./controllers/productController";
import { stockMovementController } from "./controllers/stockMovementController";

const app = new Elysia()
  .use(cors())
  .use(
    swagger({
      documentation: {
        info: {
          title: "API de Gestão de Estoque",
          version: "1.0.0",
        },
      },
    })
  )
  .use(productController)
  .use(stockMovementController)
  .get("/", () => "API de Gestão de Estoque")
  .listen(process.env.PORT || 3000);

console.log(
  `🦊 Servidor rodando em ${app.server?.hostname}:${app.server?.port}`
);
