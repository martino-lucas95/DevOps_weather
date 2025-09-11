# 🌦️ Weather API

API simple para consultar el clima actual por **ciudad** o por **coordenadas** usando [OpenWeatherMap](https://openweathermap.org/api).  
Incluye documentación con **Swagger** y está lista para correr en **Docker**.

---

## 📂 Estructura del proyecto

```
.
├─ .env
├─ .env.example
├─ Dockerfile
├─ docker-compose.yml
├─ package.json
├─ server.js
├─ src
│  ├─ app.js
│  ├─ config/
│  ├─ controllers/
│  ├─ middlewares/
│  ├─ providers/
│  ├─ routes/
│  ├─ services/
│  └─ swagger/
```

---

## ⚙️ Variables de entorno

Crear un archivo `.env` en la raíz:

```env
PORT=3000
OPENWEATHER_API_KEY=tu_api_key_aqui
```

Podés usar `.env.example` como plantilla.

---

## 🚀 Ejecutar en local

### Instalar dependencias
```bash
npm install
```

### Levantar servidor
```bash
npm run dev
```

Servidor: [http://localhost:3000](http://localhost:3000)  
Swagger Docs: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## 🐳 Ejecutar con Docker

### Build y run
```bash
docker-compose up --build
```

### Endpoints

- Por ciudad  
  ```
  GET http://localhost:3000/api/weather/city/Montevideo
  ```

- Por coordenadas  
  ```
  GET http://localhost:3000/api/weather/coords?lat=-34.9011&lon=-56.1645
  ```

- Por [plus code](https://plus.codes/map "Plus code"):   
  ```
  # Plus Code largo (no requiere ciudad)
  GET 'http://localhost:3000/api/weather/pluscode/48Q54R6R+GC'

  # Plus Code corto (requiere ciudad)
  GET 'http://localhost:3000/api/weather/pluscode/4V3Q+PC?city=Montevideo'
  ```

- Swagger  
  ```
  http://localhost:3000/api-docs
  ```

---

## 📖 Ejemplo de respuesta

```json
{
  "coord": { "lon": -56.1645, "lat": -34.9011 },
  "weather": [
    { "id": 801, "main": "Clouds", "description": "algo de nubes", "icon": "02d" }
  ],
  "main": {
    "temp": 18.5,
    "feels_like": 18.2,
    "humidity": 72
  },
  "name": "Montevideo"
}
```

---

## 🔧 Extensibilidad

- `providers/`: lógica para distintos proveedores de clima.
- `services/`: orquestan la lógica de negocio.
- `controllers/`: exponen endpoints HTTP.
- Para agregar otro proveedor basta con implementar un nuevo provider y usarlo en el servicio.

---

## 📜 Licencia
