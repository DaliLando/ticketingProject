const express = require ("express");
const {newTicket,cancelTicket} = require ("../handlers/ticketHandler");
const { isAuth } = require("../middlewares/isAuth");

let ticketRouter = express.Router()

ticketRouter.post ("/newticket/:id",isAuth,newTicket)
ticketRouter.put ("/cancelticket/:id",isAuth,cancelTicket)

module.exports = ticketRouter