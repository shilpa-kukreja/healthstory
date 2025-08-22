import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  number: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 } // 5 min expiry
});


const userModel = mongoose.models.User || mongoose.model("User", userSchema);
export default userModel;
