import companySchema from "../schema/company.schema.js";
import mongoose from "mongoose";
const companyModel = mongoose.model("Company", companySchema);
export default companyModel;
