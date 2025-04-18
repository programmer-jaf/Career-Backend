import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import userModel from "../model/user.model.js";
import bcrypt from "bcrypt";
import config from "../config/config.js";
import generateTokens from "../helper/generateTokens.js";
import crypto from "crypto";
import sendResetEmail from "../helper/sendEmails.js";
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
    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user);

    // Set refresh token in cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, // JS cannot access this cookie
      secure: config.node_env === "production", // only send over HTTPS in production
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    // Send response with access token and user info
    return apiResponse(
      res,
      200,
      {
        user,
        accessToken,
      },
      "User logged in successfully"
    );
  } catch (error) {
    throw new apiError(error.message, 500);
  }
});

// logout controller
const logout = asyncHandler(async (req, res, next) => {
  res.clearCookie("refreshToken", {
    httpOnly: true, // JS cannot access this cookie
    secure: config.node_env === "production", // only send over HTTPS in production
    sameSite: "strict",
  });
  return apiResponse(res, 200, null, "User logged out successfully");
});

// reset-password controller
const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  // check if email is valid
  if (!email) {
    throw new apiError("Email is required", 400);
  }
  // check if user exists
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new apiError("User not found", 404);
  }
  // send reset password token
  const token = crypto.randomBytes(32).toString("hex");
  const expiry = Date.now() + 1000 * 60 * 15; // 15 mins

  // update user in the database
  user.resetPasswordToken = token;
  user.resetPasswordTokenExpiry = expiry;
  // save user in the database
  await user.save();

  await sendResetEmail(user.email, token);
  return apiResponse(res, 200, null, "Password reset email sent successfully");
});

// reset-password controller
const resetPassword = asyncHandler(async (req, res, next) => {
  const { password } = req.body;
  const { token } = req.params;
  if (!token || !password) {
    throw new apiError("Token and new password are required", 400);
  }

  // Find user by token and check expiry
  const user = await userModel.findOne({
    resetPasswordToken: token,
    resetPasswordTokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    throw new apiError("Invalid or expired token", 400);
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;

  // Clear reset token
  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpiry = undefined;

  await user.save();

  return apiResponse(res, 200, null, "Password reset successfully");
});

export { register, login, logout, forgotPassword, resetPassword };
