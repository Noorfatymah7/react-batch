import mongoose from "mongoose";

function Dbconnect() {
  if (mongoose.connection >= 1) {
    return;
  }

  mongoose.connect("mongodb://127.0.0.1:27017/Blogs");
}

export default Dbconnect;
