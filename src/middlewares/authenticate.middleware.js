import config from "../config/config.js";
import jwt from "jsonwebtoken";
const authenticate = (req, res, next) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
  const decoded = jwt.verify(token, config.refresh_token_secret);

  if (!decoded) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
  req.user = decoded._id;
  next();
};

export default authenticate;
