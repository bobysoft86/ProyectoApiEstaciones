//LIBRERIAS IMPORTADAS

require('dotenv').config();
const HTTPSTATUSCODE = require('./utils/httpStatusCode');
const express = require('express');
const connectMongo = require('./utils/db');
const logger =require('morgan');
const cors = require('cors');

const app = express();
const mongoSanitize = require('express-mongo-sanitize');
 
 
app.use(mongoSanitize());

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');

    next();
});
app.use(cors({
    origin: ["*",'http://localhost:4200','http://127.0.0.1:5500'],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.set("secretKey", "nodeRestApi");
 connectMongo();


/* ROUTES */
const estacionesRouter = require('./src/routes/estaciones.routes');
const userRouter = require('./src/routes/user.routes');
app.use('/api/estaciones', estacionesRouter);
app.use('/api/user', userRouter);


app.get('/', (request, response) => {
    response.status(200).json({
        message: 'Welcome to server',
        app: 'maleteo App'
    });
});
 
/* DEFINIR EL PUERTO E INICIAR LA ESCUCHA */
app.listen(process.env.PORT, () => {
    console.log(`app running in port ${process.env.PORT}`)
});

app.use((request, response, next) => {
    let error = new Error();
    error.status = 404;
    error.message = HTTPSTATUSCODE[404];
    next(error);
  });
 
app.use((error, request, response, next) => {
    return response.status(error.status || 500).json(error.message || 'Unexpected error');
})
 
app.disable('x-powered-by');