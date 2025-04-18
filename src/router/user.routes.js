import { Router } from "express";
import {
  forgotPassword,
  login,
  logout,
  register,
} from "../controller/user.controller.js";
import authenticate from "../middlewares/authenticate.middleware.js";

const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/logout", authenticate, logout);
userRouter.post("/forgot-password", forgotPassword);
export default userRouter;
