// // models/VerifiedNumber.js
// import mongoose from "mongoose";
// import crypto from "crypto";
// import { type } from "os";

// const verifiedNumberSchema = new mongoose.Schema({
//   number: { type: String, required: true, unique: true },
//   verifiedAt: { type: Date, default: Date.now },
//    referralCode: { type: String, unique: true },
//     totalreferral:{type:Number,default:0},
//     referredBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       default: null,
//     },
//     referralUsed: { type: Boolean, default: false },
//     discountAmount: { type: Number, default: 0 },
// });

// userSchema.pre("save", function (next) {
//   if (!this.referralCode) {
//     this.referralCode = crypto.randomBytes(3).toString("hex").toUpperCase();
//   }
//   next();
// });

// const VerifiedNumberModel = mongoose.models.VerifiedNumber || mongoose.model("VerifiedNumber", verifiedNumberSchema);
// export default VerifiedNumberModel;





// import mongoose from "mongoose";
// import crypto from "crypto";

// const verifiedNumberSchema = new mongoose.Schema({
//   number: { type: String, required: true, unique: true },

//   referralCode: { type: String, unique: true },

//   referredBy: { 
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "VerifiedNumber",
//     default: null,
//   },

//   totalReferral: { type: Number, default: 0 },
//   totalCommissionEarned: { type: Number, default: 0 },
//   usedReferral: { type: Boolean, default: false },

//   verifiedAt: { type: Date, default: Date.now }
// });

// // Auto-generate referral code
// verifiedNumberSchema.pre("save", function(next) {
//   if (!this.referralCode) {
//     this.referralCode = crypto.randomBytes(3).toString("hex").toUpperCase();
//   }
//   next();
// });

// export default mongoose.models.VerifiedNumber || mongoose.model("VerifiedNumber", verifiedNumberSchema);

import mongoose from "mongoose";
import crypto from "crypto";

// In your VerifiedNumber model
const verifiedNumberSchema = new mongoose.Schema({
  number: { type: String, required: true, unique: true },
  referralCode: { type: String, unique: true },
  
  // New coupon referral fields with proper defaults
  personalCouponCode: { type: String, unique: true },
  couponDiscountPercent: { 
    type: Number, 
    default: 10, // Default 10% discount
    min: 5,
    max: 50 
  },
  couponCommissionPercent: { 
    type: Number, 
    default: 5, // Default 5% commission
    min: 1,
    max: 20 
  },
  
  referredBy: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "VerifiedNumber",
    default: null,
  },
  totalReferral: { type: Number, default: 0 },
  totalCommissionEarned: { type: Number, default: 0 },
  usedReferral: { type: Boolean, default: false },
  verifiedAt: { type: Date, default: Date.now }
});

// Auto-generate referral code AND personal coupon code
verifiedNumberSchema.pre("save", function(next) {
  if (!this.referralCode) {
    this.referralCode = crypto.randomBytes(3).toString("hex").toUpperCase();
  }
  if (!this.personalCouponCode) {
    this.personalCouponCode = `HS${crypto.randomBytes(2).toString("hex").toUpperCase()}${Date.now().toString().slice(-4)}`;
  }
  next();
});

export default mongoose.models.VerifiedNumber || mongoose.model("VerifiedNumber", verifiedNumberSchema);