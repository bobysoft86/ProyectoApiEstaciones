const express = require('express');
const userRouter = express.Router();
const { getUsers,createUser, authenticate, logout } = require("../controller/user.controller");
const { isAuth } = require("../middlewares/auth.middleware")

userRouter.get("/", getUsers);
userRouter.post("/register", createUser);
userRouter.post("/authenticate", authenticate);
userRouter.post("/logout", logout);

module.exports =  userRouter;