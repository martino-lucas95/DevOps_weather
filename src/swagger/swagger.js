const swaggerJsdoc = require('swagger-jsdoc');
const { PORT } = require('../config/env');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Clima',
      version: '1.1.0',
      description: 'API simple para consultar el clima por ciudad o coordenadas.',
    },
    servers: [
      { url: `http://localhost:${PORT}`, description: 'Local' },
    ],
  },
  apis: ['src/routes/*.js'], // JSDoc en rutas
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = { swaggerSpec };
