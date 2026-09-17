import User from "../models/User-model.js";
import bcrypt from "bcryptjs"
import createTokenAndSaveCookie from "../jwt/Generate_Token.js"

 export const signup = async (req,res) => {
  try {
    const { name, email, password, confirmpassword } = req.body;
  if(password !== confirmpassword) {
    return res.status(400).json({ message: "Password Does Not Match"})
  }
  const user = await User.findOne({ email })
  if(user) {
    return res.status(400).json({ message: "Email Already Exists"})
  }
  //Hashing Password

  const hashedPassword = await bcrypt.hash(password,10)
  const newUser = await new User({
    name,
    email,
    password : hashedPassword,
  })
  await newUser.save()
  if(newUser){
    createTokenAndSaveCookie(newUser._id,res)
    res.status(201).json({ message: "User Register Successfully",newUser})
  }
 
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error"})
  }
}


export const login = async (req,res) => {
  const { email , password } = req.body
  try {
    
    const user = await User.findOne({ email })
    const isMatch = await bcrypt.compare(password,user.password)
    if(!user || !isMatch){
      return res.status(404).json({ message: "Invilid User or Password"})
    }
    createTokenAndSaveCookie(user._id,res)
    res.status(201).json({ message: "User logged in Successfully", user:{
      _id: user._id,
      name: user.name,
      email: user.email,
    },})
    if(!user){
      return res.status(404).json({ message: "User not found"})
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error"})
  }
}


export const logout = async ( req , res )=>{
   try {
    res.clearCookie('jwt')
    res.status(200).json({ message: "User logged out successfully"})
    
   } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error"})
   }
}