import { API } from '@/utils/constants';
import { Router, Express } from 'express';
import { readdirSync } from 'fs';
import { join } from 'path';

export const setupRoutes = (app: Express): void => {
  const router = Router();
  readdirSync(join(__dirname, '../routes'))
    .filter(file => !file.endsWith('.map'))
    .map(async file => {
      // Importar o módulo dinamicamente usando import()
      const routeModule = await import(`../routes/${file}`);
      // Verificar se a função padrão existe no módulo
      if (typeof routeModule.default === 'function') {
        // Chamar a função padrão passando o router
        routeModule.default(router);
      } else {
        console.error(`No default export found in ${file}`);
      }
    });
  // Registrar o router após todas as rotas terem sido configuradas
  app.use(API, router);
};