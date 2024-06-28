import mongoose from "mongoose";

const blogScheme = new mongoose.Schema({
  schoolname: {
    type: String,
  },
  collegename: {
    type: String,
  },
});

export default mongoose.models?.blg || mongoose.model("blg", blogScheme);
