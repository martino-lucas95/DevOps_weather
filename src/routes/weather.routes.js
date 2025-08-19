const { Router } = require('express');
const { getByCity, getByCoords } = require('../controllers/weather.controller');

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Weather
 *   description: Endpoints de clima
 */

/**
 * @swagger
 * /api/weather/city/{city}:
 *   get:
 *     summary: Clima por ciudad
 *     tags: [Weather]
 *     parameters:
 *       - in: path
 *         name: city
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre de la ciudad
 *       - in: query
 *         name: units
 *         schema:
 *           type: string
 *           enum: [standard, metric, imperial]
 *           default: metric
 *       - in: query
 *         name: lang
 *         schema:
 *           type: string
 *           default: es
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Ciudad no encontrada
 *       502:
 *         description: Error del proveedor
 */
router.get('/city/:city', getByCity);

/**
 * @swagger
 * /api/weather/coords:
 *   get:
 *     summary: Clima por coordenadas
 *     tags: [Weather]
 *     parameters:
 *       - in: query
 *         name: lat
 *         required: true
 *         schema:
 *           type: number
 *         description: Latitud
 *       - in: query
 *         name: lon
 *         required: true
 *         schema:
 *           type: number
 *         description: Longitud
 *       - in: query
 *         name: units
 *         schema:
 *           type: string
 *           enum: [standard, metric, imperial]
 *           default: metric
 *       - in: query
 *         name: lang
 *         schema:
 *           type: string
 *           default: es
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Coordenadas no encontradas
 *       400:
 *         description: Parámetros inválidos
 *       502:
 *         description: Error del proveedor
 */
router.get('/coords', getByCoords);

module.exports = router;
