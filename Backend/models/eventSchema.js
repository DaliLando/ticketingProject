const mongoose = require ("mongoose");

const event = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    description: String,
    location : { type: String, required: true },
    category : String,
    ticketsAvailable: { type: Number, required: true },
    isActive: { type: Boolean, default: true }

})


module.exports = mongoose.model('Event',event)