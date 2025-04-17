import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
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
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordTokenExpiry: {
      type: Date,
    },
    role: {
      type: String,
      required: true,
      enum: ["employee", "recruiter", "admin"],
      default: "employee",
    },
    resume: {
      type: String,
    },
    resumeOriginalName: {
      type: String,
    },
    phone: {
      type: String,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
    profile: {
      bio: {
        type: String,
      },
      skills: [
        {
          type: String,
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

export default userSchema;
