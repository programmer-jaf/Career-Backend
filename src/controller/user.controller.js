import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import userModel from "../model/user.model.js";
import bcrypt from "bcrypt";

// register controller
const register = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password, role } = req.body;

  // Check all fields
  if (!firstName || !lastName || !email || !password || !role) {
    throw new apiError("All fields are required", 400);
  }

  // Check if email already exists
  const existUser = await userModel.findOne({ email });
  if (existUser) {
    throw new apiError("Email already exists", 409);
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create a new user
  const user = await userModel.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
  });

  return apiResponse(res, 201, user, "User created successfully");
});

export { register };
