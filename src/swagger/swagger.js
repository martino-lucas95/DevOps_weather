const swaggerJsdoc = require('swagger-jsdoc');
const { PORT } = require('../config/env');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Clima',
      version: '1.2.0',
      description: 'API para obtener clima por ciudad, coordenadas y Plus Code (OLC).',
    },
    servers: [
      { url: `http://localhost:${PORT}`, description: 'Local' },
    ],
  },
  apis: ['src/routes/*.js'], // JSDoc en rutas
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = { swaggerSpec };
