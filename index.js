
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
const port = process.env.PORT || 3000;

// --- Configuración de Swagger ---
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Clima',
      version: '1.0.0',
      description: 'Una API simple para consultar el clima de una ciudad.',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: 'Servidor Local',
      },
    ],
  },
  apis: ['index.js'], // Archivos que contienen la documentación (JSDoc)
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// --- Rutas de la API ---

/**
 * @swagger
 * /weather/{city}:
 *   get:
 *     summary: Obtiene el clima de una ciudad específica.
 *     description: Retorna los datos del clima actual para la ciudad proporcionada.
 *     parameters:
 *       - in: path
 *         name: city
 *         required: true
 *         description: El nombre de la ciudad.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Datos del clima obtenidos con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Ciudad no encontrada.
 *       500:
 *         description: Error en el servidor.
 */
app.get('/weather/:city', async (req, res) => {
  const { city } = req.params;
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey || apiKey === 'SU_API_KEY_AQUI') {
    return res.status(500).json({ message: 'Error: La API Key de OpenWeatherMap no está configurada en el archivo .env' });
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ message: 'Ciudad no encontrada' });
    } else {
      console.error('Error fetching weather data:', error.message);
      res.status(500).json({ message: 'Error al consultar el servicio de clima' });
    }
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
  console.log(`Documentación de la API disponible en http://localhost:${port}/api-docs`);
});
