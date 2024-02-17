const express = require("express");

const estacionRouter = express.Router();

const {
  deleteEstacion,
  updateEstacion,
  createEstacion,
  getEstacion,
  getAllEstacions,
} = require("../controller/estacion.controller");
const { isAuth } = require("../middlewares/auth.middleware");

estacionRouter.get('/',getAllEstacions);
estacionRouter.get('/:id',getEstacion);
estacionRouter.post('/',[isAuth], createEstacion);
estacionRouter.patch('/:id', updateEstacion);
estacionRouter.delete('/:id',[isAuth], deleteEstacion);

module.exports = estacionRouter;
