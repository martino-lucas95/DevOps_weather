/**
 * Servicio de dominio que usa un provider (Open/Closed).
 * Permite cambiar de proveedor sin tocar controladores ni rutas.
 */
class WeatherService {
  /**
   * @param {import('../providers/weather.provider')} provider
   */
  constructor(provider) {
    this.provider = provider;
  }

  async getByCity(city, opts = {}) {
    if (!city) {
      const e = new Error('Parámetro "city" es requerido');
      e.status = 400;
      throw e;
    }
    return this.provider.currentWeather({ city, ...opts });
  }

  async getByCoords(lat, lon, opts = {}) {
    const latNum = Number(lat);
    const lonNum = Number(lon);
    if (Number.isNaN(latNum) || Number.isNaN(lonNum)) {
      const e = new Error('Parámetros "lat" y "lon" deben ser numéricos');
      e.status = 400;
      throw e;
    }
    return this.provider.currentWeather({ lat: latNum, lon: lonNum, ...opts });
  }
}

module.exports = { WeatherService };
