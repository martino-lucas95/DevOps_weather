const PORT = process.env.PORT || 3000;
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const OPENWEATHER_BASE_URL = process.env.OPENWEATHER_BASE_URL || 'https://api.openweathermap.org/data/2.5';

if (!OPENWEATHER_API_KEY) {
  console.warn('[WARN] Falta OPENWEATHER_API_KEY en .env');
}

module.exports = {
  PORT,
  OPENWEATHER_API_KEY,
  OPENWEATHER_BASE_URL,
};
