import mongoose from "mongoose";
import applicationSchema from "../schema/application.schema.js";

const applicationModel = mongoose.model("Application", applicationSchema);

export default applicationModel;
