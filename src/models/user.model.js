const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const salt = 10; // complejidad del encriptado

const userSchema = new mongoose.Schema({
  userName:{type: String, unique: true, trim: true, required: true},
  name: { type: String,  trim: true, required: true },
  surname: { type: String,  trim: true, required: true },
  password: { type: String, trim: true, required: true },
  img: { type: String},
  email:{type:String,required:true},
  estaciones: [{ type: mongoose.Schema.Types.ObjectId, ref: "Estacion" }],
});

userSchema.pre("save", (next) => {
  if (this.password) {
    this.password = bcrypt.hashSync(this.password, salt);
  }
  next();
});

const User = mongoose.model("users", userSchema);
module.exports = User;
