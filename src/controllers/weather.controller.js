const { OpenWeatherProvider } = require('../providers/openweather.provider');
const { WeatherService } = require('../services/weather.service');
const { OpenLocationCode } = require('open-location-code');

// Referencias locales
// Agrega aquí más ciudades según se necesiten
const CITY_TO_COORDS = {
  montevideo: { lat: -34.9011, lon: -56.1645 },
};

const service = new WeatherService(new OpenWeatherProvider());

/**
 * GET /api/weather/city/:city
 */
async function getByCity(req, res, next) {
  try {
    const { city } = req.params;
    const { units = 'metric', lang = 'es' } = req.query;
    const data = await service.getByCity(city, { units, lang });
    res.json(data);
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/weather/coords?lat=...&lon=...
 */
async function getByCoords(req, res, next) {
  try {
    const { lat, lon, units = 'metric', lang = 'es' } = req.query;
    const data = await service.getByCoords(lat, lon, { units, lang });
    res.json(data);
  } catch (err) {
    next(err);
  }
}

module.exports = { getByCity, getByCoords };

/**
 * GET /api/weather/pluscode/:code
 * Acepta Plus Code largo directamente (ej: "48Q54R6R+GC").
 * Si es corto (ej: "4V3Q+PC"), requiere ?city= para referencia.
 */
async function getByPlusCode(req, res, next) {
  try {
    const { code } = req.params;
    const { city } = req.query;

    if (!code) {
      const e = new Error('Parámetro "code" es requerido');
      e.status = 400;
      throw e;
    }

    const olc = new OpenLocationCode();

    let fullCode = code.trim();

    // Intentar decodificar como Plus Code largo
    let decoded;
    try {
      decoded = olc.decode(fullCode);
    } catch (_ignored) {
      // Si falla, asumimos código corto y usamos la ciudad como referencia
      if (!city) {
        const e = new Error('Plus Code corto: agregue ?city= como referencia');
        e.status = 400;
        throw e;
      }
      const cityKey = String(city).trim().toLowerCase();
      const ref = CITY_TO_COORDS[cityKey];
      if (!ref) {
        const e = new Error('Ciudad no soportada en este entorno académico');
        e.status = 400;
        throw e;
      }
      fullCode = olc.recoverNearest(fullCode, ref.lat, ref.lon);
      try {
        decoded = olc.decode(fullCode);
      } catch (_err) {
        const e = new Error('Plus Code inválido');
        e.status = 400;
        throw e;
      }
    }

    const lat = decoded.latitudeCenter;
    const lon = decoded.longitudeCenter;

    const data = await service.getByCoords(lat, lon);
    res.json(data);
  } catch (err) {
    next(err);
  }
}

module.exports.getByPlusCode = getByPlusCode;
