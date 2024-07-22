const eventSchema = require ("../models/eventSchema")

exports.newEvent = async (req,res)=> {
    let {name,date,description,location,category,ticketsAvailable}=req.body

    try {
       if (!name || !date || !description || !location|| !category||!ticketsAvailable) {
        return res.status(400).json({msg:" All event fields are required"})
       } 
// test conditionnel fel date, faut pas avoir une date antérieure à la date d'aujourd'hui
       let currentDate = new Date();
       if (date <= currentDate.toISOString()){
        return res.status(400).json({msg:"you can't set and old date"})

       }
    let nvEvent = new eventSchema(req.body)

    await nvEvent.save()
    res.status(200).json({msg:"Event created successfuly",nvEvent})
       
    } catch (error) {
        res.status(500).json({msg:" Server error occured"})
    }
}

exports.updateEvent = async (req,res)=> { 
    let {date,location,ticketsAvailable,isActive}=req.body
    let {id}=req.params
    let currentDate = new Date();
    if (date <= currentDate.toISOString()){
     return res.status(400).json({msg:"you can't set and old date"})

    }
    let search = await eventSchema.findById(id)
if (!search) {
 return   res.status(400).json({msg:"event doesn't exist"})
}
     await eventSchema.findByIdAndUpdate({_id:id},{date:date,location:location,ticketsAvailable:ticketsAvailable, isActive:isActive},{new:true}) // chercher par id et modifer champs date et location
     .then((modifEvent)=>{
        res.status(200).json ({msg:"Event updated successfully", modifEvent})
     })
    .catch((err)=>{
        res.status(500).json({msg:"server error"})
    })
    
}

exports.deleteEvent=async (req,res) => {

let {id}= req.params;
let search = await eventSchema.findById(id)
if (!search) {
 return   res.status(400).json({msg:"event doesn't exist"})
}
await eventSchema.findByIdAndDelete({_id:id})
.then(()=>{
    res.status(200).json({msg:"Event deleted successfully"})
})
.catch((err)=>{
    res.status(500).json({msg:"server error"})
})
}