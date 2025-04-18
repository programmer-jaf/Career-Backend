import mongoose from "mongoose";
import blogSchema from "../schema/blog.schema.js";
const blogModel = mongoose.model("Blog", blogSchema);
export default blogModel;
