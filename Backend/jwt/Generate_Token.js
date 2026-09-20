import jwt from "jsonwebtoken";

const createTokenAndSaveCookie = (userId, res) => {
  
  const token = jwt.sign(
    { userID: userId },
    process.env.JWT_TOKEN,
    {
      expiresIn: "7d",
    }
  );

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};

export default createTokenAndSaveCookie;