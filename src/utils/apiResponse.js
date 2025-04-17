const apiResponse = (res, statusCode, data, message = "success") => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};
export default apiResponse;
