const mongoose = require("mongoose");
require("dotenv").config();
const faker = require("faker");

const Estacion = require("../models/estacion.model");

// const arrayEstaciones = [
//   {
//     estacion: faker.address.city(),
//     estado: faker.random.arrayElement(["Abierta", "Cerrada"]),
//     km_abiertos: faker.datatype.number({ min: 0, max: 100 }),
//     nieveEnCm: faker.datatype.number({ min: 0, max: 300 }),
//     meteo: {
//       temperatura: faker.datatype.number({ min: -10, max: 10 }),
//       viento: faker.datatype.number({ min: 0, max: 30 }),
//       condiciones: faker.random.arrayElement(["Despejado", "Lluvia", "Nieve"]),
//       pronostico: faker.lorem.sentence(),
//     },
//   },
//   {
//     estacion: faker.address.city(),
//     estado: faker.random.arrayElement(["Abierta", "Cerrada"]),
//     km_abiertos: faker.datatype.number({ min: 0, max: 100 }),
//     nieveEnCm: faker.datatype.number({ min: 0, max: 300 }),
//     meteo: {
//       temperatura: faker.datatype.number({ min: -10, max: 10 }),
//       viento: faker.datatype.number({ min: 0, max: 30 }),
//       condiciones: faker.random.arrayElement(["Despejado", "Lluvia", "Nieve"]),
//       pronostico: faker.lorem.sentence(),
//     },
//   },
//   {
//     estacion: faker.address.city(),
//     estado: faker.random.arrayElement(["Abierta", "Cerrada"]),
//     km_abiertos: faker.datatype.number({ min: 0, max: 100 }),
//     nieveEnCm: faker.datatype.number({ min: 0, max: 300 }),
//     meteo: {
//       temperatura: faker.datatype.number({ min: -10, max: 10 }),
//       viento: faker.datatype.number({ min: 0, max: 30 }),
//       condiciones: faker.random.arrayElement(["Despejado", "Lluvia", "Nieve"]),
//       pronostico: faker.lorem.sentence(),
//     },
//   },
//   {
//     estacion: faker.address.city(),
//     estado: faker.random.arrayElement(["Abierta", "Cerrada"]),
//     km_abiertos: faker.datatype.number({ min: 0, max: 100 }),
//     nieveEnCm: faker.datatype.number({ min: 0, max: 300 }),
//     meteo: {
//       temperatura: faker.datatype.number({ min: -10, max: 10 }),
//       viento: faker.datatype.number({ min: 0, max: 30 }),
//       condiciones: faker.random.arrayElement(["Despejado", "Lluvia", "Nieve"]),
//       pronostico: faker.lorem.sentence(),
//     },
//   },
//   {
//     estacion: faker.address.city(),
//     estado: faker.random.arrayElement(["Abierta", "Cerrada"]),
//     km_abiertos: faker.datatype.number({ min: 0, max: 100 }),
//     nieveEnCm: faker.datatype.number({ min: 0, max: 300 }),
//     meteo: {
//       temperatura: faker.datatype.number({ min: -10, max: 10 }),
//       viento: faker.datatype.number({ min: 0, max: 30 }),
//       condiciones: faker.random.arrayElement(["Despejado", "Lluvia", "Nieve"]),
//       pronostico: faker.lorem.sentence(),
//     },
//   },
//   {
//     estacion: faker.address.city(),
//     estado: faker.random.arrayElement(["Abierta", "Cerrada"]),
//     km_abiertos: faker.datatype.number({ min: 0, max: 100 }),
//     nieveEnCm: faker.datatype.number({ min: 0, max: 300 }),
//     meteo: {
//       temperatura: faker.datatype.number({ min: -10, max: 10 }),
//       viento: faker.datatype.number({ min: 0, max: 30 }),
//       condiciones: faker.random.arrayElement(["Despejado", "Lluvia", "Nieve"]),
//       pronostico: faker.lorem.sentence(),
//     },
//   },
  
// ];

const generarEstacion = () => {
  return {
    estacion: faker.address.city(),
    estado: faker.random.arrayElement(['Abierta', 'Cerrada']),
    km_abiertos: faker.datatype.number({ min: 0, max: 100 }),
    km_estacion: faker.datatype.number({ min: 0, max: 100 }), 
    nieveEnCm: faker.datatype.number({ min: 0, max: 300 }),
    meteo: {
      temperatura: faker.datatype.number({ min: -10, max: 10 }),
      viento: faker.datatype.number({ min: 0, max: 30 }),
      condiciones: faker.random.arrayElement(['Despejado', 'Lluvia', 'Nieve']),
      pronostico: faker.lorem.sentence()
    }
  };
};

const arrayEstaciones = Array.from({ length: 3 }, generarEstacion);


mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    const allEstacions = await Estacion.find();
    if (allEstacions.length > 0) {
      await Estacion.collection.drop();
      console.log("Estacions ereased");
    }
  })
  .catch((error) => console.log("error borrando"))
  .then(async () => {
    const estacionsMap = arrayEstaciones.map((estacion) => new Estacion(estacion));
    await Estacion.insertMany(estacionsMap);
    console.log("estaciones insertadas");
  })
  .catch((error) => console.log(error))
  .finally(() => mongoose.disconnect());

// console.log("hola soy semilla");
