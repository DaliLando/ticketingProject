const ticketSchema = require ("../models/ticketSchema")
const eventSchema = require("../models/eventSchema")

exports.newTicket = async (req,res)=> { 
    let {price} = req.body;
    let  user= req.user;
    let {id}= req.params
  console.log(user);
  try {
   
   let nvTicket = new ticketSchema({price,event:id,user:user._id})
   await nvTicket.save()
  let dec = await eventSchema.findByIdAndUpdate(id,{$inc:{ticketsAvailable:-1}},{new:true})
   res.status(200).json({msg:"Ticket booked successfully",nvTicket,dec}) 

  } catch (error) {
    console.log(error);
    res.status(500).json({msg:" Server error occured"})
  }
}

exports.cancelTicket = async(req,res)=> {
    let {id} = req.params;

    try {
       let result= await ticketSchema.findByIdAndUpdate(id,{isBooked:false},{new:true})
       let inc = await eventSchema.findByIdAndUpdate(result.event,{$inc:{ticketsAvailable:1}},{new:true})
       res.status(200).json({msg:"Ticket cancelled with success"},result,inc)
    } catch (error) {
        res.status(500).json({msg:" Server error occured"})
    }
}

