const axios = require('axios');
const { OPENWEATHER_API_KEY, OPENWEATHER_BASE_URL } = require('../config/env');

class OpenWeatherProvider {
  /**
   * @param {object} options
   * @param {string} [options.baseUrl]
   * @param {string} [options.apiKey]
   */
  constructor({ baseUrl = OPENWEATHER_BASE_URL, apiKey = OPENWEATHER_API_KEY } = {}) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
    this.http = axios.create({
      baseURL: this.baseUrl,
      timeout: 10000,
    });
  }

  /**
   * Obtiene clima actual por ciudad o por coordenadas
   * @param {{ city?: string, lat?: number, lon?: number, units?: string, lang?: string }} params
   */
  async currentWeather({ city, lat, lon, units = 'metric', lang = 'es' }) {
    const query = city ? { q: city } : { lat, lon };
    const url = '/weather';

    try {
      const { data } = await this.http.get(url, {
        params: {
          ...query,
          appid: this.apiKey,
          units,
          lang,
        },
      });
      return data;
    } catch (err) {
      if (err.response && err.response.status === 404) {
        const label = city ? `ciudad: ${city}` : `coords: (${lat}, ${lon})`;
        const e = new Error(`No se encontró clima para ${label}`);
        e.status = 404;
        throw e;
      }
      const e = new Error('Error consultando OpenWeather');
      e.status = 502; // Bad Gateway al proveedor
      e.cause = err;
      throw e;
    }
  }
}

module.exports = { OpenWeatherProvider };
