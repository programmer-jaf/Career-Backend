import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import contactModel from "../model/contact.model.js";
import apiResponse from "../utils/apiResponse.js";
import userModel from "../model/user.model.js";
const contact = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, phone, email, message, role, subject } =
    req.body;
  const user = req.user;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !message ||
    !role ||
    !subject
  ) {
    throw new apiError("All fields are required", 400);
  }
  const userId = await userModel.findById(user);
  const contact = await contactModel.create({
    userId,
    firstName,
    lastName,
    phone,
    email,
    message,
    role,
    subject,
  });
  return apiResponse(res, 201, contact, "Your message sent successfully");
});
export default contact;
