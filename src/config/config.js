import dotenv from "dotenv";
dotenv.config();

const _config = {
  port: process.env.PORT,
  mongodb_uri: process.env.MONGODB_URI,
  frontend_domain: process.env.FRONTEND_DOMAIN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  access_token_expiry: process.env.ACCESS_TOKEN_EXPIRY,
  refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
  refresh_token_expiry: process.env.REFRESH_TOKEN_EXPIRY,
  node_env: process.env.NODE_ENV,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_cloud_api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
  cloudinary_cloud_api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET,
  mail_user: process.env.MAIL_USER,
  mail_email: process.env.MAIL_EMAIL,
  mail_password: process.env.MAIL_PASSWORD,
  mail_service: process.env.MAIL_SERVICE,
  admin_email: process.env.ADMIN_EMAIL,
  admin_password: process.env.ADMIN_PASSWORD,
};

const config = Object.freeze(_config);
export default config;
