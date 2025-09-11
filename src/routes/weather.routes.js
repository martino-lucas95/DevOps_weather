const { Router } = require('express');
const { getByCity, getByCoords, getByPlusCode } = require('../controllers/weather.controller');

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

/**
 * @swagger
 * /api/weather/pluscode/{code}:
 *   get:
 *     summary: Clima por Plus Code (Open Location Code)
 *     tags: [Weather]
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: "Plus Code Largo no requiere ciudad, Corto requiere ?city=ciudad"
 *         example: 48Q54R6R+GC
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: "Ciudad de referencia (requerida si el Plus Code es corto)"
 *         example: Montevideo
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Parámetros inválidos / Plus Code inválido
 *       404:
 *         description: Ubicación no encontrada
 *       502:
 *         description: Error del proveedor
 */
router.get('/pluscode/:code', getByPlusCode);

module.exports = router;
