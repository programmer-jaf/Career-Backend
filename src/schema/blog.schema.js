import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: [
        {
          url: String,
        },
      ],
    },
    tag: {
      type: String,
    },
    category: {
      type: String,
      required: true,
      enum: ["Marketing", "Design", "Development", "Ui-Ux Design", "Lifestyle"],
      default: "Development",
    },
    views: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      required: true,
      enum: ["published", "draft"],
      default: "draft",
    },
  },
  {
    timestamps: true,
  }
);
