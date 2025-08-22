// models/VerifiedNumber.js
import mongoose from "mongoose";

const verifiedNumberSchema = new mongoose.Schema({
  number: { type: String, required: true, unique: true },
  verifiedAt: { type: Date, default: Date.now }
});

const VerifiedNumberModel = mongoose.models.VerifiedNumber || mongoose.model("VerifiedNumber", verifiedNumberSchema);
export default VerifiedNumberModel;
