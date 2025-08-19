const { OpenWeatherProvider } = require('../providers/openweather.provider');
const { WeatherService } = require('../services/weather.service');

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
