

const mongoose = require ("mongoose");


const user = new mongoose.Schema ({
      firstName : {
        type: String, 
        required : true
      },
      lastName : {
        type: String,
        required : true
      },
      email:{
        type:String,
        required: true
      },
      password :{
        type: String,
        required:true
      },
      role : {
        type: String,
        default :"user"
      }
})

 module.exports = mongoose.model("User",user)