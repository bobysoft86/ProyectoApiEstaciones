const { req } = require("express");
const Estacion = require("../models/estacion.model");
const Pirineo = require("../models/pirinieo.model");
const httpStatusCode = require("../../utils/httpStatusCode");

const getAllPirineos = async (req, res) => {
  try {
    const pirineo = await Pirineo.find();
    res.status(200).json(pirineo);

  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: "pirineos not found" });
  }
};

const getPirineo = async (req, res) => {
  try {
    const id = req.params.id;
    const pirineo = await Pirineo.findById(id);
    res.status(200).json(estacion);
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: `estacion ${id} not found` });
  }
};

const createPirineo = async (req, res) => {
  const pirineo = new Pirineo(req.body);
  try {
    await pirineo.save();
    res.status(201).json({ message: "la pelicula fue creada con exito", pirineo: pirineo });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: `bad request` });
  }
};
const addEstacion = async(request,response,next)=>{
  const{pirineo_id, estacion_id}= request.body;
  try {
    const pirineo = await Pirineo.findById(pirineo_id);
    const estacion = await Estacion.findById(estacion_id);

      if (pirineo && estacion){
        pirineo.estaciones.push(estacion_id);
        await pirineo.save();
        response.satus(200).json({
          status:200,
          message: "soy bien",
          data: pirineo
        })
      }

    
  } catch (error) {
    next(error);
  }


}
const updatePirineo = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    console.log("soy la req->",req.body);
    const pirineo = await pirineo.findByIdAndUpdate(id, body, { new: true });
    if (!pirineo){
      res.status(403).json({ message: `ID selected doesn't exists` })
    }
    res.status(200).json(pirineo);
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: `update estacion  fail` });
  }
};

const deletePirineo = async (req, res) => {
  try {
    const id = req.params.id;
    const pirineo = await Pirineo.findByIdAndDelete(id);
    res.status(200).json({ message: "pelicula borrada" });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: `update estacion  fail` });
  }
};

module.exports = {
  deletePirineo,
  updatePirineo,
  createPirineo,
  getPirineo,
  getAllPirineos,
  addEstacion,
};
