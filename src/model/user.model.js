import userSchema from "../schema/user.schema.js";
import mongoose from "mongoose";
const userModel = mongoose.model("User", userSchema);
export default userModel;
