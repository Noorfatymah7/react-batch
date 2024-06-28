import mongoose from "mongoose";

const blogScheme = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: [true, "Enter the title"],
    },
    Description: {
      type: String,
      required: [true, "Enter the Description"],
    },
    Author: {
      type: String,
      required: [true, "Enter the Author name"],
    },
    Catagorise: {
      type: String,
    },

    isFeatured: {
      type: Boolean,
      required: true,
      default: false,
    },
    Images: {
      type: String,
      require: [true, "Enter the Author name"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models?.blog || mongoose.model("blog", blogScheme);
