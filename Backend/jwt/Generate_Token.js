import jwt from "jsonwebtoken"


const createTokenAndSaveCookie = ( userID , res ) => {
  const token = jwt.sign({ userID },process.env.JWT_TOKEN,{
    expiresIn: "2d"
  })
  res.cookie("jet",token,{
    httpOnly: true, //xss
    secure: true,
    sameSite: "strict", //csrf
  })
}
export default createTokenAndSaveCookie