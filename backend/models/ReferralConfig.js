// // models/ReferralConfig.js
// import mongoose from "mongoose";

// const referralConfigSchema = new mongoose.Schema({
//   userDiscountPercent: { type: Number, default: 5 },
//   referrerCommissionPercent: { type: Number, default: 5 },
//   adminCommissionPercent: { type: Number, default: 10 },
//   couponDiscountPercent: { type: Number, default: 10 }, // Add this
//   couponCommissionPercent: { type: Number, default: 5 } // Add this
// });

// export default mongoose.models.ReferralConfig || mongoose.model("ReferralConfig", referralConfigSchema);

// models/ReferralConfig.js
import mongoose from "mongoose";

const referralConfigSchema = new mongoose.Schema({
  // Direct Referral Settings
  userDiscountPercent: { type: Number, default: 5 },
  referrerCommissionPercent: { type: Number, default: 5 },
  adminCommissionPercent: { type: Number, default: 10 },
  
  // Coupon Referral Settings
  couponDiscountPercent: { type: Number, default: 10 },
  couponCommissionPercent: { type: Number, default: 5 },
  
  // Maximum limits for safety
  maxDirectDiscountPercent: { type: Number, default: 20 },
  maxCouponDiscountPercent: { type: Number, default: 15 },
  maxTotalDiscountPercent: { type: Number, default: 30 }
}, { timestamps: true });

export default mongoose.models.ReferralConfig || mongoose.model("ReferralConfig", referralConfigSchema);