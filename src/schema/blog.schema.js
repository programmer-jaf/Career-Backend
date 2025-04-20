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
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: [
        {
          url: String,
        },
      ],
      default: [],
    },
    tag: [
      {
        type: String,
      },
    ],
    category: {
      type: String,
      required: true,
      enum: ["Marketing", "Design", "Development", "Ui_Ux Design", "Lifestyle"],
      default: "Development",
    },
    views: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      required: true,
      enum: ["published", "draft", "archived"],
      default: "draft",
    },
  },
  {
    timestamps: true,
  }
);

export default blogSchema;
