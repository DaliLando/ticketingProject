const express = require ("express");
const { register,login, changePassword } = require("../handlers/auth");
const {isAuth} = require("../middlewares/isAuth")

let authRouter = express.Router ();

authRouter.post ('/register', register)
authRouter.post('/login',login)
authRouter.put('/password',isAuth,changePassword)

module.exports = authRouter;