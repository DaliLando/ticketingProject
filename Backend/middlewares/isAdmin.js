const jwt = require ("jsonwebtoken")
const User = require ("../models/userSchema")

exports.isAdmin = (req,res,next) => {

    let token = req.header('Authorization');

  jwt.verify(token, process.env.SECRET_KEY,async (err,decoded)=>{
    
    console.log(decoded);
    if(decoded.role !== "admin"){
        return res.status(400).json({msg:"action restricted for simple user"})
       }
          if (!decoded ) {
            return res.status(400).json({msg:"Actions not allowed"})
           } 
           else {
            let admin = await User.findById({_id:decoded.id});
            req.user= admin
            next();
           }

  })  
}