import { cors } from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';
import { Elysia } from 'elysia';
import { productController } from './controllers/productController';
import { stockMovementController } from './controllers/stockMovementController';
import { reportController } from './controllers/reportController';
import { opentelemetry } from '@elysiajs/opentelemetry';

const app = new Elysia()
  .use(cors({ origin: '*' }))
  .use(opentelemetry())
  .use(
    swagger({
      documentation: {
        info: {
          title: 'API de Gestão de Estoque',
          version: '1.0.0',
        },
      },
    }),
  )
  .onError(({ code, error, request }) => {
    const errorMessage =
      error instanceof Error ? error.message : 'Erro desconhecido';
    const timestamp = new Date().toISOString();

    console.error(
      `[${timestamp}] [${code}] [${request.method}] ${request.url}: ${errorMessage}`,
    );

    if (code === 'NOT_FOUND') {
      return {
        success: false,
        error: 'Recurso não encontrado',
        code: 404,
      };
    }

    if (code === 'VALIDATION') {
      return {
        success: false,
        error: 'Dados inválidos',
        details: errorMessage,
        code: 400,
      };
    }

    return {
      success: false,
      error: errorMessage,
      code: code === 'INTERNAL_SERVER_ERROR' ? 500 : 400,
    };
  })
  .use(productController)
  .use(stockMovementController)
  .use(reportController)
  .get('/', () => ({
    success: true,
    message: 'API de Gestão de Estoque',
    version: '1.0.0',
    docs: '/swagger',
    environment: process.env.NODE_ENV || 'development',
  }))
  .listen(process.env.PORT || 3000);

console.log(
  `🦊 Servidor rodando em ${app.server?.hostname}:${app.server?.port} (${process.env.NODE_ENV || 'development'})`,
);
