import config from "../config/config.js";
const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  const response = {
    success: false,
    message,
  };
  // in development mode
  if (config.node_env === "development") {
    response.stack = err.stack;
    response.error = err;
  }
  // in production mode
  if (config.node_env === "production") {
    // Optionally override generic errors
    if (err.name === "ValidationError") {
      response.message = "Invalid data provided.";
    }
  }
  res.status(statusCode).json(response);
};

export default globalErrorHandler;
