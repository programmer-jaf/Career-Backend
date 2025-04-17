class apiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = "ApiError";
    Error.captureStackTrace(this, this.constructor);
  }
}

export default apiError;
