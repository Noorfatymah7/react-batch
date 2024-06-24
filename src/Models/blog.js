import mongoose from "mongoose";

const blogScheme = new mongoose.Schema({
  fullname: {
    type: String,
  },
  lastname: {
    type: String,
  },
});

export default mongoose.models?.blog || mongoose.model("blog", blogScheme);
