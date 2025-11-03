import mongoose from "mongoose";

const payoutRequestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "VerifiedNumber", required: true },
  method: { type: String, enum: ["UPI", "BANK"], required: true },
  upiId: { type: String },
  bankName: { type: String },
  accountNumber: { type: String },
  ifsc: { type: String },
  amount: { type: Number, required: true },
  status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" }
}, { timestamps: true });

export default mongoose.models.PayoutRequest || mongoose.model("PayoutRequest", payoutRequestSchema);
