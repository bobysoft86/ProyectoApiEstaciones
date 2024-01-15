const mongoose = require("mongoose");

const pirineoScheme = new mongoose.Schema({
  pirineo: {
    type: String,
    required: true,
  },
  estaciones:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Estacion"
    
  }],
});

const Pirineo = mongoose.model("Pirineo", pirineoScheme);

module.exports = Pirineo;




