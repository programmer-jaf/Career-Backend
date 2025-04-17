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

// login controller
const login = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // check all the fields
    if (!email || !password) {
      throw new apiError("All fields are required", 400);
    }
    // check if user exists or not
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new apiError("User not found", 404);
    }
    // check if password is correct or not
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new apiError("Password is incorrect", 401);
    }
    // find the user in the database
    const userInDB = await userModel.findOne({ email });
    return apiResponse(res, 200, userInDB, "User logged in successfully");
  } catch (error) {
    throw new apiError(error.message, 500);
  }
});

export { register, login };
