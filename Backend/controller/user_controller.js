import User from "../models/User-model.js";
import bcrypt from "bcryptjs"

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
  await newUser
  .save()
  .then(() => res.status(201).json({ message: "User Register Successfully"}))
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error"})
  }
}