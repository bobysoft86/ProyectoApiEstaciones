const mongoose = require("mongoose");

const estacionScheme = new mongoose.Schema({
  
  name: { type: String, unique: true, trim: true},
  img: { type: String, trim: true },
  capacity:{type: Number},
  propertySpace:{ type: String},
  propertyTipe:{type:String},
  aviable:{type:Boolean},
  latitude:{type:Number},
  longitude:{type:Number},
  bookings:[{type: String}]

});

const Estacion = mongoose.model("Estacion", estacionScheme);

module.exports = Estacion;
