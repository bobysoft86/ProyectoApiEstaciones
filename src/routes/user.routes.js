const express = require('express');
const userRouter = express.Router();
const { getUsers,createUser, authenticate, getUser, logout } = require("../controller/user.controller");
const { isAuth } = require("../middlewares/auth.middleware")

userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);
userRouter.post("/register", createUser);
userRouter.post("/authenticate", authenticate);
userRouter.post("/logout", logout);

module.exports =  userRouter;