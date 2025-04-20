import { Router } from "express";
import {
  forgotPassword,
  login,
  logout,
  refreshedToken,
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
userRouter.get("/refresh-token", authenticate, refreshedToken);
export default userRouter;
