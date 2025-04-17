import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import userModel from "../model/user.model.js";
import bcrypt from "bcrypt";
// register controller
const register = asyncHandler(async (req, re, next) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    // check all the fields
    if (!firstName || !lastName || !email || !password || !role) {
      throw new apiError("All fields are required", 400);
    }
    // check email already exist in the database
    const existUser = await userModel({ email });
    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create a new user
    const user = await userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });
    return apiResponse(user, 200, "User created successfully");
  } catch (error) {
    throw new apiError("Internal Server Error", 500);
  }
});

export { register };
