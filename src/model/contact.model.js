import contactSchema from "../schema/contact.schema.js";
import mongoose from "mongoose";
const contactModel = mongoose.model("Contact", contactSchema);
export default contactModel;
