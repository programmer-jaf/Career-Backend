import config from "../config/config.js";
import jwt from "jsonwebtoken";
const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { _id: user._id, role: user.role },
    config.access_token_secret,
    { expiresIn: config.access_token_expiry }
  );
  const refreshToken = jwt.sign(
    { _id: user._id, role: user.role },
    config.refresh_token_secret,
    { expiresIn: config.refresh_token_expiry }
  );
  return { accessToken, refreshToken };
};

export default generateTokens;
