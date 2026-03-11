import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      res.json({
        success: false,
        message: "Not Authorized!!!",
      });
    }
    const token_decode =await jwt.verify(token, process.env.JWT_SECRET);
    
    if (token_decode.email !== process.env.ADMIN_EMAIL) {
      res.json({
        success: false,
        message: "Not Authorized.",
      });
    }
    next();
  } catch (error) {}
};

export default adminAuth;
