const express = require('express');
const swaggerUi = require('swagger-ui-express');
const { swaggerSpec } = require('./swagger/swagger');
const weatherRoutes = require('./routes/weather.routes');
const errorMiddleware = require('./middlewares/error.middleware');

function createServer() {
  const app = express();

  app.use(express.json());

  // Rutas
  app.use('/api/weather', weatherRoutes);

  // Swagger
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Manejo de errores centralizado
  app.use(errorMiddleware);

  return app;
}

module.exports = { createServer };
