require('dotenv').config();
const { createServer } = require('./src/app');
const { PORT } = require('./src/config/env');

const app = createServer();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Documentación:       http://localhost:${PORT}/api-docs`);
});
