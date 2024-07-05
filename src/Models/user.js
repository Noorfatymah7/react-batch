import mongoose from "mongoose";

const UserScheme = new mongoose.Schema({
  Username: {
    type: String,
    required:[true,"Enter the User Name"]
  },
  Email: {
    type: String,
    required:[true,"Enter the Email"]
  },
  Password: {
    type: String,
    required:[true,"Enter the Password"]
  },
},{
  timestamps:true
});

export default mongoose.models?.User || mongoose.model("User", UserScheme);
