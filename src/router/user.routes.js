import { Router } from "express";
import {
  forgotPassword,
  login,
  logout,
  register,
  resetPassword,
} from "../controller/user.controller.js";
import authenticate from "../middlewares/authenticate.middleware.js";

const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/logout", authenticate, logout);
userRouter.post("/forgot-password", authenticate, forgotPassword);
userRouter.post("/reset-password/:token", authenticate, resetPassword);
export default userRouter;
