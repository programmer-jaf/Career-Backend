import companySchema from "../schema/company.schema.js";
import mongoose from "mongoose";
const compnayModel = mongoose.model("Company", companySchema);
export default compnayModel;
