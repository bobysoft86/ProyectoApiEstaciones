const mongoose = require("mongoose");

const estacionScheme = new mongoose.Schema({
  estacion: {
    type: String,
    required: true,
  },
  estado: {
    type: String,
    enum: ['Abierta', 'Cerrada'],
    required: true,
  },
  km_abiertos: {
    type: Number,
    required: true,
  },
  km_estacion: {
    type: Number,
    required: true,
  },
  nieveEnCm: {
    type: Number,
    required: true,
  },
  meteo: {
    temperatura: {
      type: Number,
      required: true,
    },
    viento: {
      type: Number,
      required: true,
    },
    condiciones: {
      type: String,
      required: true,
    },
    pronostico: {
      type: String,
      required: true,
    },
  },
});

const Estacion = mongoose.model("Estacion", estacionScheme);

module.exports = Estacion;
