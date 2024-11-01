import path from 'path';
import { fileURLToPath } from 'url';
import { readFile } from 'fs/promises';

import { Router } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import config from '../config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageJson = JSON.parse(
  await readFile(path.resolve(__dirname, '../../package.json'), 'utf-8')
);

const { version } = packageJson;

const docsRouter = Router();

const specs = swaggerJsdoc({
  definition: {
    openapi: '3.1.0',
    info: {
      version,
      title: 'task-management-api',
    },
    servers: [{ url: config.server.url }],
  },
  apis: ['src/**/*.js'],
});

docsRouter.use('/', swaggerUi.serve);
docsRouter.get('/', swaggerUi.setup(specs));

export default docsRouter;
