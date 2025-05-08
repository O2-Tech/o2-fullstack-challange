import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { productController } from "./controllers/productController";
import { stockMovementController } from "./controllers/stockMovementController";
import { reportController } from "./controllers/reportController";

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
  .onError(({ code, error }) => {
    console.error(
      `[${code}] ${error instanceof Error ? error.message : "Erro desconhecido"}`
    );
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  })
  .use(productController)
  .use(stockMovementController)
  .use(reportController)
  .get("/", () => ({
    success: true,
    message: "API de Gestão de Estoque",
    version: "1.0.0",
    docs: "/swagger",
  }))
  .listen(process.env.PORT || 3000);

console.log(
  `🦊 Servidor rodando em ${app.server?.hostname}:${app.server?.port}`
);
