const express = require ("express");
const {newEvent,updateEvent,deleteEvent} = require ("../handlers/eventHandler")
const {isAdmin} = require ("../middlewares/isAdmin")

let eventRouter = express.Router();

eventRouter.post('/newevent',isAdmin,newEvent)
eventRouter.put('/update/:id',isAdmin,updateEvent)
eventRouter.delete('/delete/:id',isAdmin,deleteEvent)

module.exports = eventRouter