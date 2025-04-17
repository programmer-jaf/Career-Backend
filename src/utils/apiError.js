class apiError extends Error {
  constructor(message, statusCode) {
    (this.statusCode = statusCode),
      (this.message = message),
      (this.name = "ApiError"),
      Error.captureStackTrace(this, this.constructor);
  }
}

export default apiError;
