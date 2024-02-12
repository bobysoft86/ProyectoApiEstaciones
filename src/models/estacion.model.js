const mongoose = require("mongoose");

const estacionScheme = new mongoose.Schema({
  
  name: { type: String, unique: true, trim: true, required: true },
  img: { type: String, trim: true, required: true },
  capacity:{type: Number,required:true},
  propertySpace:{ type: String},
  propertyTipe:{type:String},
  aviable:{type:Boolean},
  location:{
      latitude:{type:Number},
      longitude:{type:Number}
      },
});

const Estacion = mongoose.model("Estacion", estacionScheme);

module.exports = Estacion;
