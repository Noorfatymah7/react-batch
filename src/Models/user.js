import mongoose from "mongoose";

const blogSchemee = new mongoose.Schema({
  username: {
    type: String,
  },
  fathername: {
    type: String,
  },
});

export default mongoose.models?.user || mongoose.model("user", blogSchemee);