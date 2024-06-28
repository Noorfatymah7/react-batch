import mongoose from "mongoose";

const blogSchemeee = new mongoose.Schema({
  testname: {
    type: String,
  },
  mothername: {
    type: String,
  },
});

export default mongoose.models?.test || mongoose.model("test", blogSchemeee);