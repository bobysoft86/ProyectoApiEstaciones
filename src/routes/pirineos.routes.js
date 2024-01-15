const express = require("express");

const pirineosRouter = express.Router();

const {
  deletePirineo,
  updatePirineo,
  createPirineo,
  getPirineo,
  getAllPirineos,
  addEstacion,
} = require("../controller/pirineo.controller");
const { isAuth } = require("../middlewares/auth.middleware");

pirineosRouter.get('/',getAllPirineos);
pirineosRouter.get('/includeEstacion', addEstacion);
pirineosRouter.get('/:id',getPirineo);
pirineosRouter.get('/',addEstacion);
pirineosRouter.post('/',[isAuth], createPirineo);
pirineosRouter.patch('/:id',[isAuth], updatePirineo);
pirineosRouter.delete('/:id',[isAuth], deletePirineo);

module.exports = pirineosRouter;
