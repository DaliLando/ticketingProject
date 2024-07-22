const jwt = require ("jsonwebtoken")
const User = require ("../models/userSchema")

exports.isAuth = (req,res,next) => {

    let token = req.header('Authorization');

  jwt.verify(token, process.env.SECRET_KEY,async (err,decoded)=>{
           if (!decoded) {
            return res.status(400).json({msg:"Actions not allowed"})
           } else if(decoded.role !== "user"){
            return res.status(400).json({msg:"action restricted for admin"})
           }
           else {
            let user = await User.findById({_id:decoded.id});
            req.user= user
            next();
           }

  })  
}