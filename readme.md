# CREAR UN PROYECTO EN NODE
 
1. instalar node (https://nodejs.org/en/download/current)
2. Ejecutar en consola, dentro de la carpeta del proyecto
```bash
npm init
```
rellenar los campos que solicite
 
3. modificar el campo "scripts" del archivo package.json
 
```json
  "scripts": {
    "dev": "nodemon index.js",
    "start": "node index.js"
  },
```
 
4. instalar las librerías necesarias:
 
```bash
npm i express
npm i nodemon
npm i mongoose
...
```
 
 
 
 
 
# API BÁSICA
 
Este es el contenido básico que debe figurar en index.js
 
```javascript
/* INICIAR EXPRESS */
const express = require('express');
const app = express();
 
/* ROUTES */
app.get('/', (request, response) => {
    response.status(200).json({
        message: 'Welcome to server',
        app: 'My App'
    });
});
 
/* DEFINIR EL PUERTO E INICIAR LA ESCUCHA */
const port = 3000;
app.listen(port, () => {
    console.log(`app running in port ${port}`)
});
```
 
 
# PRINCIPIOS BÁSICOS
 
- Dividir la api en recursos lógicos: para una API de viajes podemos usar usuarios, destinos y valoraciones.
- Usar métodos http para definir el comportamiento de nuestra API: saveUser, getUser, updateUser, deleteUser
- Generar rutas basadas en las entidades: /users; /destinies; /reviews
- Enviar status y json (en general).
- Usar el paradigma Statelees: la API no debe guardar información del cliente, ni recordar peticiones previas.
 
 
 
 
 