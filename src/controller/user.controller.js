const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const HTTPSTATUSCODE = require("../../utils/httpStatusCode");
const { request } = require("express");

const createUser = async (request, response, next) => {
  try {
    const user =  new User(request.body);
    // Hash de la contraseña antes de guardarla en la base de datos
    const saltRounds = 10;  // Número de rondas para generar el salt
    user.password = await bcrypt.hash(request.body.password, saltRounds);
    // Verificar si ya existe el usuario
    if (await User.findOne({ name: request.body.name })) {
      return response.status(409).json({
        status: 409,
        message: HTTPSTATUSCODE[409],
        data: null
      });
    }
    // Guardar el usuario en la base de datos
    const userDb = await user.save();
    return response.status(201).json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      data: null
    });
  } catch (error) {
    next(error);
  }
};
const addstation = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    // Obtener el usuario actual
    const user = await User.findById(id);
    // Verificar si el usuario existe
    if (!user) {
      return res.status(403).json({ message: `ID selected doesn't exist` });
    }

    // Aplicar lógica general para mantener valores existentes y agregar nuevos
    for (const key in body) {
      if (body.hasOwnProperty(key)) {
        if (Array.isArray(user[key])) {
          // Si es un array, concatenar valores
          user[key] = user[key].concat(body[key] || []);
        } else {
          // Si no es un array, simplemente asignar el nuevo valor
          user[key] = body[key];
        }
      }
    }

    // Guardar el usuario actualizado
    const result = await user.save();

    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(404).json({ message: `Update estacion fail` });
  }
};


const authenticate = async (req, res, next) => {
  try {
    const userInfo = await User.findOne({ name: req.body.name });
    if (userInfo && bcrypt.compareSync(req.body.password, userInfo.password)) {
      userInfo.password = null;
      const token = jwt.sign(
        {
          id: userInfo._id,
          name: userInfo.name,
        },
        req.app.get("secretKey"),
        { expiresIn: "1d" }
      );

      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        data: { user: userInfo, token: token },
      });
    } else {
      return res.json({
        status: 400,
        message: HTTPSTATUSCODE[400],
        data: null,
      });
    }
  } catch (error) {
    return next(error);
  }
};

const logout = (req, res, next) => {
  try {
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      token: null,
    });
  } catch (error) {
    return next(error);
  }
};
const getUser = async (request, response, next) => {
  try {
    const id = request.params.id;
    const user = await User.findById(id).populate("estaciones");
    response.status(200).json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        data: user
    });

} catch (error) {
    next(error)
}
}



const getUsers = async (request, response, next) => {
    try {
        const users = await User.find().populate("estaciones");
        response.status(200).json({
            status: 200,
            message: HTTPSTATUSCODE[200],
            data: users
        });
 
    } catch (error) {
        next(error)
    }
}
module.exports = {
  getUser,
    getUsers,
  createUser,
  authenticate,
  logout,
  addstation,
};
