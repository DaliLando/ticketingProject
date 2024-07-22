

const mongoose = require ("mongoose")


const connectDB = async ()=> { 
    await mongoose.connect(process.env.URI)
    .then(()=>{
        console.log("database connected");
    })
    .catch((err)=>{
        console.error(err);
    })
            
}


module.exports = connectDB