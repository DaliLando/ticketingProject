const UserSchema = require ("../models/userSchema")
const bcrypt = require ("bcrypt")

const jwt = require('jsonwebtoken');

/// register function 
exports.register = async (req,res) => {

   let {firstName,lastName,email,password} = req.body;
   try {
    if ( !firstName || !lastName || !email || !password) { /// making sure fields are filled
     return res.status(400).json({msg:"All fields are required"})
    }
  
   let doesExit =  await UserSchema.findOne({email : email}) /// testing to see if email exists
    if (doesExit) {
      return res.status(400).json({msg:"Email already exists"})
    }
    
    let newUser = new UserSchema (req.body); // creating a user from the scheema
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);  /// crypting the password
    
    newUser.password = hash;  /// affecting the crypted password to the new user before sending it to db

    await newUser.save()  /// new user saved to database
    res.status(200).json ({msg:"User created successfuly", newUser})
    }

    catch (error) {
        res.status(500).json({msg:" Server error occured"})
   }

}


exports.login = async (req,res)=> {

    let {email,password} = req.body;

 try {
    let doesExist =  await UserSchema.findOne({email : email})
    if (!doesExist) {
        return res.status(400).json ({msg:"this email does not exist"})
    }

   let checked = bcrypt.compareSync(password,doesExist.password) ;

   if(!checked){
    return res.status(400).json ({msg:"wrong credentials"})
   }
   let paylod = {firstName :doesExist.firstName , email : email, id:doesExist._id , role: doesExist.role}
   let token = jwt.sign(paylod, process.env.SECRET_KEY,{ expiresIn: '2h' });

   res.status(200).json({msg:"logged in with success", token ,doesExist})


 } catch (error) {
    res.status(500).json({msg:"server error occured"})
 }
}

exports.changePassword = async (req,res) => {

    let user = req.user
    let {oldpswd,password,confirmPassword} = req.body
    
    try {
        let match = bcrypt.compareSync(oldpswd,user.password)
        if (!match) {
            return res.status(400).json ({msg:"Old password is incorrect"})
        }
        let matchNew=bcrypt.compareSync(password,user.password)

            if (matchNew) {
        return res.status(400).json ({msg:"You can't use old password for new password"})
    }
      if (password!== confirmPassword) {
        return res.status(400).json({msg:"New passwords are not matching"})
      }

     const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    
    let findUser = await UserSchema.findByIdAndUpdate({_id:user._id},{password:hash},{new:true})
        res.status(200).json ({msg:"Password Changed successfuly", findUser})
    } catch (error) {
        res.status(500).json({msg:"server error occured"})
    }
}