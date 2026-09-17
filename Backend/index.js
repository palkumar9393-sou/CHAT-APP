import express from "express";
import dotenv from "dotenv";
import  mongoose from "mongoose";
import userRoute from "./route/user_route.js"
import cors from "cors"


const app = express()
dotenv.config();

app.use(express.json())
app.use(cors());

const PORT = process.env.PORT || 5001
const URI = process.env.MONGODB_URI
try {
  mongoose.connect(URI)
  console.log("MongoDB Connected")
  
} catch (error) {
   console.log(error)
}

app.use("/user",userRoute)

app.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`)
})