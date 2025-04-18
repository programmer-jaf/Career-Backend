import mongoose from "mongoose";
const contactSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export default contactSchema;
