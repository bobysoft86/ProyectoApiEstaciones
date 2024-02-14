const { req, request } = require("express");
const Estacion = require("../models/estacion.model");

const getAllEstacions = async (req, res) => {
  try {
    const estacions = await Estacion.find();
    res.status(200).json(estacions);
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: "estacions not found" });
  }
};

const getEstacion = async (req, res) => {
  try {
    const id = req.params.id;
    const estacion = await Estacion.findById(id);
    res.status(200).json(estacion);
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: `estacion ${id} not found` });
  }
};

const createEstacion = async (req, res) => {
  const estacion = new Estacion(req.body);
  try {
    await estacion.save();
    console.log(estacion._id);
    
    res.status(201).json({ message: "la estacion fue creada con exito", estacion: estacion });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: `bad request` });
  }
};



const updateEstacion = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    console.log("soy la req->",req.body);
    const estacion = await Estacion.findByIdAndUpdate(id, body, { new: true });
    if (!estacion){
      res.status(403).json({ message: `ID selected doesn't exists` })
    }
    res.status(200).json(estacion);
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: `update estacion  fail` });
  }
};

const deleteEstacion = async (req, res) => {
  try {
    const id = req.params.id;
    const estacion = await Estacion.findByIdAndDelete(id);
    res.status(200).json({ message: "pelicula borrada" });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: `update estacion  fail` });
  }
};

module.exports = {
  deleteEstacion,
  updateEstacion,
  createEstacion,
  getEstacion,
  getAllEstacions,
};
