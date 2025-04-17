import mongoose from "mongoose";
import jobSchema from "../schema/job.schema.js";
const jobModel = mongoose.model("Job", jobSchema);
export default jobModel;
