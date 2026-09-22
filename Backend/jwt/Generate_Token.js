import jwt from "jsonwebtoken";

const createTokenAndSaveCookie = (userId, res) => {
  
  const token = jwt.sign(
    {  userId },
    process.env.JWT_TOKEN,
    {
      expiresIn: "7d",
    }
  );

  res.cookie("jwt", token, {
    httpOnly: true,//xss
    secure: true,
    sameSite: "strict",//csrf
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};

export default createTokenAndSaveCookie;