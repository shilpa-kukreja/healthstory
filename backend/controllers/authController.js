import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import sendEmail from '../utils/sendEmail.js';
import userModel from '../models/authmodel.js';
import newuserModel from '../models/userModel.js';
import VerifiedNumberModel from '../models/VerifiedNumberModel.js';
import axios from 'axios';
import PayoutRequest from '../models/PayoutRequest.js';
import orderModel from '../models/orderModel.js';
import ReferralConfig from '../models/ReferralConfig.js';
import mongoose from 'mongoose';



//user register code
export const registerUser = async (req, res) => {
  const { email, mobile, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      email,
      mobile,
      password: hashedPassword,
      provider: 'local',
    })

    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });
    res.status(201).json({ token, user: newUser })

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' });
  }
}



//verify token route

export const verifyToken = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header missing or malformed' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ valid: true, userId: decoded.id });
  } catch (err) {
    return res.status(401).json({ valid: false, message: 'Invalid or expired token' });
  }
};



//user login code

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (user.provider !== 'local') {
      user.provider = 'local';
      await user.save();
    }


    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.status(200).json({ token, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
// router.post("/send-otp", 

// // send OTP API
// export const loginotp= async (req, res) => {
//   try {
//     const { number, otp } = req.body; // number: user ka phone number, otp: random OTP

//     const response = await axios.post(
//       "https://www.fast2sms.com/dev/bulkV2",
//       {
//         route: "dlt",
//         sender_id: "HELSTR",
//         message: "195392",   // aapka DLT template ID
//         variables_values: otp, // OTP yaha jayega
//         numbers: number,
//       },
//       {
//         headers: {
//           authorization: "QH9YaUqbhOISv5y1g32wCjiDe7fFRJkTl6ru8tdnBLXGEKsWoZehYv31dD7z4MHPZIsWUj0pK2EOCXxi",
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     res.json({ success: true, data: response.data });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };



function generateOTP() {
  let otp = "";
  for (let i = 0; i < 6; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp;
}

export const loginotp = async (req, res) => {
  try {
    const { number } = req.body;
    const otp = generateOTP();

    const existingUser = await newuserModel.findOne({ number });
    if (existingUser) {
      existingUser.otp = otp;
      await existingUser.save();
    } else {
      await newuserModel.create({ number, otp });
    }
    // OTP DB me save

    // Fast2SMS API call
    await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      {
        route: "dlt",
        sender_id: "HELSTR",
        message: "195392", // Aapka DLT template ID
        variables_values: otp,
        numbers: number,
      },
      {
        headers: {
          authorization: process.env.FAST2SMS_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};



// router.post("/verify-otp",

// export const verifyotp= async (req, res) => {
//   try {
//     const { number, otp } = req.body;

//     const otpRecord = await newuserModel.findOne({ number, otp });
//     if (!otpRecord) {
//       return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
//     }

//     // Number verified collection me save
//     await VerifiedNumberModel.updateOne(
//       { number },
//       { number, verifiedAt: new Date() },
//       { upsert: true }
//     );

//     // OTP record delete kar do
//     await newuserModel.deleteMany({ number });
//    const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET,{
//             expiresIn: '30d',
//           });

//     res.json({ success: true, message: "Number verified successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// export const verifyotp = async (req, res) => {
//   try {
//     const { number, otp , referralCode, totalreferral } = req.body;

//     // Check OTP record
//     const otpRecord = await newuserModel.findOne({ number, otp });
//     if (!otpRecord) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid or expired OTP" });
//     }

//     // Save number to verified collection
//     await VerifiedNumberModel.updateOne(
//       { number },
//       { number, verifiedAt: new Date() },
//       { upsert: true }
//     );


//     // Validate referral code if provided
//     let referredByUser = null;
//     if (referralCode) {
//       referredByUser = await VerifiedNumberModel.findOne({ referralCode: referralCode });
//       if (!referredByUser) {
//         return res.status(400).json({ message: "Invalid referral code" });
//       }
//     }

//     // Delete OTP records for this number
//     await newuserModel.deleteMany({ number });

//     // ✅ Generate JWT token using otpRecord._id
//     const token = jwt.sign(
//       { id: otpRecord._id, number: otpRecord.number },
//       process.env.JWT_SECRET,
//       { expiresIn: "30d" }
//     );

//     res.json({
//       success: true,
//       message: "Number verified successfully",
//       token,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };


export const verifyotp = async (req, res) => {
  try {
    const { number, otp, referralCode } = req.body;

    const otpRecord = await newuserModel.findOne({ number, otp });
    if (!otpRecord)
      return res.status(400).json({ success: false, message: "Invalid OTP" });

    // ✅ Check if user exists already
    let newVerified = await VerifiedNumberModel.findOne({ number });

    // ✅ If user doesn't exist → create & trigger pre-save hook
    if (!newVerified) {
      newVerified = new VerifiedNumberModel({ number });
      await newVerified.save(); // <-- this triggers referralCode auto-create
    }

    // ✅ Referral Apply
    if (referralCode && !newVerified.referredBy) {
      const referrer = await VerifiedNumberModel.findOne({ referralCode });

      if (!referrer) {
        return res.status(400).json({ message: "Invalid referral code" });
      }

      newVerified.referredBy = referrer._id;
      await newVerified.save();

      await VerifiedNumberModel.findByIdAndUpdate(referrer._id, {
        $inc: { totalReferral: 1 }
      });
    }

    await newuserModel.deleteMany({ number });

    const token = jwt.sign(
      { id: newVerified._id, number },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.json({ success: true, message: "Verified", token });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const getallverifiedNumber = async (req, res) => {
  try {
    const allverified = await VerifiedNumberModel.find()
      .populate('referredBy', 'number') // Populate with the referrer's number
      .sort({ verifiedAt: -1 }); // Sort by latest verified first

    res.json({ success: true, allverified });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}






// export const getReferralDashboard = async (req, res) => {
//   const user = await VerifiedNumberModel.findById(req.user.id).populate("referredBy");

//   if (!user) return res.status(404).json({ success: false, message: "User not found" });

//   const referralLink = `${process.env.FRONTEND_URL}/login?ref=${user.referralCode}`;

//   res.json({
//     referralCode: user.referralCode,
//     referralLink,
//     totalReferral: user.totalReferral,
//     totalCommissionEarned: user.totalCommissionEarned
//   });
// };


// export const getReferralDashboard = async (req, res) => {
//   try {
//     const user = await VerifiedNumberModel.findById(req.user.id).populate("referredBy");

//     if (!user) return res.status(404).json({ success: false, message: "User not found" });

//     const referralLink = `${process.env.FRONTEND_URL}/login?ref=${user.referralCode}`;

//     // Get successful referral purchases count and total commission
//     const referralStats = await orderModel.aggregate([
//       { 
//         $match: { 
//           referredBy: user._id,
//           payment: true
//         } 
//       },
//       {
//         $group: {
//           _id: null,
//           totalCommission: { $sum: "$commissionEarned" },
//           successfulReferrals: { $sum: 1 }
//         }
//       }
//     ]);

//     const stats = referralStats[0] || { totalCommission: 0, successfulReferrals: 0 };

//     res.json({
//       referralCode: user.referralCode,
//       referralLink,
//       totalReferral: user.totalReferral,
//       successfulReferrals: stats.successfulReferrals,
//       totalCommissionEarned: stats.totalCommission || user.totalCommissionEarned || 0
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };





// export const getReferralDashboard = async (req, res) => {
//   try {
//     const user = await VerifiedNumberModel.findById(req.user.id).populate("referredBy");
//     if (!user) return res.status(404).json({ success: false, message: "User not found" });

//     const referralLink = `${process.env.FRONTEND_URL}/login?ref=${user.referralCode}`;

//     const referralStats = await orderModel.aggregate([
//       { $match: { referredBy: user._id, payment: true } },
//       {
//         $group: {
//           _id: null,
//           totalCommission: { $sum: "$commissionEarned" },
//           successfulReferrals: { $sum: 1 }
//         }
//       }
//     ]);

//     const stats = referralStats[0] || { totalCommission: 0, successfulReferrals: 0 };

//     // ✅ totalCommissionEarned should always reflect remaining balance
//     const availableBalance = user.totalCommissionEarned || stats.totalCommission || 0;

//     res.json({
//       referralCode: user.referralCode,
//       referralLink,
//       totalReferral: user.totalReferral,
//       successfulReferrals: stats.successfulReferrals,
//       totalCommissionEarned: availableBalance
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


export const getReferralDashboard = async (req, res) => {
  try {
    const user = await VerifiedNumberModel.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const referralLink = `${process.env.FRONTEND_URL}/login?ref=${user.referralCode}`;
    const couponShareLink = `${process.env.FRONTEND_URL}/checkout?coupon=${user.personalCouponCode}`;

    // Get direct referral stats
    const directReferralStats = await orderModel.aggregate([
      {
        $match: {
          referredBy: user._id,
          payment: true
        }
      },
      {
        $group: {
          _id: null,
          totalDirectCommission: { $sum: "$commissionEarned" },
          successfulDirectReferrals: { $sum: 1 },
          totalDirectSales: { $sum: "$amount" }
        }
      }
    ]);

    // Get coupon referral stats
    const couponReferralStats = await orderModel.aggregate([
      {
        $match: {
          "couponReferral.couponOwner": user._id,
          payment: true
        }
      },
      {
        $group: {
          _id: null,
          totalCouponCommission: { $sum: "$couponReferral.commissionEarned" },
          successfulCouponReferrals: { $sum: 1 },
          totalCouponSales: { $sum: "$amount" }
        }
      }
    ]);

    const directStats = directReferralStats[0] || {
      totalDirectCommission: 0,
      successfulDirectReferrals: 0,
      totalDirectSales: 0
    };

    const couponStats = couponReferralStats[0] || {
      totalCouponCommission: 0,
      successfulCouponReferrals: 0,
      totalCouponSales: 0
    };

    const totalCommission = directStats.totalDirectCommission + couponStats.totalCouponCommission;
    const totalSuccessfulReferrals = directStats.successfulDirectReferrals + couponStats.successfulCouponReferrals;

    res.json({
      // Direct Referral
      referralCode: user.referralCode,
      referralLink,
      totalReferral: user.totalReferral,
      successfulDirectReferrals: directStats.successfulDirectReferrals,
      totalDirectCommission: directStats.totalDirectCommission,

      // Coupon Referral
      personalCouponCode: user.personalCouponCode,
      couponShareLink,
      couponDiscountPercent: user.couponDiscountPercent,
      couponCommissionPercent: user.couponCommissionPercent,
      successfulCouponReferrals: couponStats.successfulCouponReferrals,
      totalCouponCommission: couponStats.totalCouponCommission,

      // Combined Stats
      totalCommissionEarned: totalCommission,
      totalSuccessfulReferrals: totalSuccessfulReferrals
    });
  } catch (error) {
    console.error("Error in getReferralDashboard:", error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Failed to load referral dashboard"
    });
  }
};




// export const getReferredUsers = async (req, res) => {
//   try {
//     const user = await VerifiedNumberModel.findById(req.user.id);
//     if (!user)
//       return res.status(404).json({ success: false, message: "User not found" });

//     // Step 1: Find all orders referred by this user
//     const referralOrders = await orderModel.aggregate([
//       {
//         $match: {
//           referredBy: user._id,
//           payment: true, // only successful orders
//         },
//       },
//       {
//         $group: {
//           _id: "$userId", // group by referred user
//           totalOrders: { $sum: 1 },
//           totalSpent: { $sum: "$amount" },
//           totalCommission: { $sum: "$commissionEarned" },
//           latestOrder: { $max: "$createdAt" },
//           userDetails: { $first: "$address" },
//         },
//       },
//       {
//         $project: {
//           _id: 1,
//           totalOrders: 1,
//           totalSpent: 1,
//           totalCommission: 1,
//           latestOrder: 1,
//           name: {
//             $concat: [
//               { $ifNull: ["$userDetails.firstName", ""] },
//               " ",
//               { $ifNull: ["$userDetails.lastName", ""] },
//             ],
//           },
//           email: "$userDetails.email",
//           phone: "$userDetails.phone",
//         },
//       },
//       { $sort: { latestOrder: -1 } },
//     ]);

//     res.json({
//       success: true,
//       referrals: referralOrders,
//     });
//   } catch (error) {
//     console.error("Error fetching referred users:", error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };



export const getReferredUsers = async (req, res) => {
  try {
    const user = await VerifiedNumberModel.findById(req.user.id);
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    // Step 1: Find all direct referral orders (referredBy)
    const directReferralOrders = await orderModel.aggregate([
      {
        $match: {
          referredBy: user._id,
          payment: true, // only successful orders
        },
      },
      {
        $group: {
          _id: "$userId", // group by referred user
          totalOrders: { $sum: 1 },
          totalSpent: { $sum: "$amount" },
          totalCommission: { $sum: "$commissionEarned" },
          latestOrder: { $max: "$date" },
          userDetails: { $first: "$address" },
          referralType: { $first: "direct" }
        },
      },
      {
        $project: {
          _id: 1,
          totalOrders: 1,
          totalSpent: 1,
          totalCommission: 1,
          latestOrder: 1,
          name: {
            $concat: [
              { $ifNull: ["$userDetails.firstName", ""] },
              " ",
              { $ifNull: ["$userDetails.lastName", ""] },
            ],
          },
          email: "$userDetails.email",
          phone: "$userDetails.phone",
          referralType: 1
        },
      }
    ]);

    // Step 2: Find all coupon referral orders (couponReferral.couponOwner)
    const couponReferralOrders = await orderModel.aggregate([
      {
        $match: {
          "couponReferral.couponOwner": user._id,
          payment: true, // only successful orders
        },
      },
      {
        $group: {
          _id: "$userId", // group by referred user
          totalOrders: { $sum: 1 },
          totalSpent: { $sum: "$amount" },
          totalCommission: { $sum: "$couponReferral.commissionEarned" },
          latestOrder: { $max: "$date" },
          userDetails: { $first: "$address" },
          couponCode: { $first: "$couponReferral.couponCode" },
          referralType: { $first: "coupon" }
        },
      },
      {
        $project: {
          _id: 1,
          totalOrders: 1,
          totalSpent: 1,
          totalCommission: 1,
          latestOrder: 1,
          name: {
            $concat: [
              { $ifNull: ["$userDetails.firstName", ""] },
              " ",
              { $ifNull: ["$userDetails.lastName", ""] },
            ],
          },
          email: "$userDetails.email",
          phone: "$userDetails.phone",
          couponCode: 1,
          referralType: 1
        },
      }
    ]);

    // Combine both types of referrals
    const allReferrals = [...directReferralOrders, ...couponReferralOrders]
      .sort((a, b) => new Date(b.latestOrder) - new Date(a.latestOrder));

    // Calculate totals
    const totalStats = {
      directReferrals: directReferralOrders.length,
      couponReferrals: couponReferralOrders.length,
      totalReferrals: allReferrals.length,
      totalCommission: allReferrals.reduce((sum, ref) => sum + (ref.totalCommission || 0), 0),
      totalRevenue: allReferrals.reduce((sum, ref) => sum + (ref.totalSpent || 0), 0)
    };

    res.json({
      success: true,
      referrals: allReferrals,
      stats: totalStats,
      userStats: {
        totalCommissionEarned: user.totalCommissionEarned || 0,
        totalReferral: user.totalReferral || 0,
        personalCouponCode: user.personalCouponCode
      }
    });
  } catch (error) {
    console.error("Error fetching referred users:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};



// export const getReferralConfig = async (req, res) => {
//   try {
//     let config = await ReferralConfig.findOne();

//     // If no config exists, create default one
//     if (!config) {
//       config = new ReferralConfig({
//         userDiscountPercent: 5,
//         referrerCommissionPercent: 5,
//         adminCommissionPercent: 10
//       });
//       await config.save();
//     }

//     res.json({
//       success: true,
//       config
//     });

//   } catch (error) {
//     console.error("Get Referral Config Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error fetching referral configuration"
//     });
//   }
// };



// Get referral configuration
export const getReferralConfig = async (req, res) => {
  try {
    let config = await ReferralConfig.findOne();

    // If no config exists, create default one
    if (!config) {
      config = new ReferralConfig({
        userDiscountPercent: 5,
        referrerCommissionPercent: 5,
        adminCommissionPercent: 10,
        couponDiscountPercent: 10,
        couponCommissionPercent: 5,
        maxDirectDiscountPercent: 20,
        maxCouponDiscountPercent: 15,
        maxTotalDiscountPercent: 30
      });
      await config.save();
    }

    res.json({
      success: true,
      config
    });

  } catch (error) {
    console.error("Get Referral Config Error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching referral configuration"
    });
  }
};


// Update referral configuration




// export const updateReferralConfig = async (req, res) => {
//   try {
//     const { userDiscountPercent, referrerCommissionPercent, adminCommissionPercent } = req.body;

//     // Validate percentages
//     if (userDiscountPercent < 0 || userDiscountPercent > 50) {
//       return res.status(400).json({
//         success: false,
//         message: "User discount must be between 0% and 50%"
//       });
//     }

//     if (referrerCommissionPercent < 0 || referrerCommissionPercent > 50) {
//       return res.status(400).json({
//         success: false,
//         message: "Referrer commission must be between 0% and 50%"
//       });
//     }

//     if (adminCommissionPercent < 0 || adminCommissionPercent > 50) {
//       return res.status(400).json({
//         success: false,
//         message: "Admin commission must be between 0% and 50%"
//       });
//     }

//     const totalPercent = userDiscountPercent + referrerCommissionPercent + adminCommissionPercent;
//     if (totalPercent > 100) {
//       return res.status(400).json({
//         success: false,
//         message: "Total percentage cannot exceed 100%"
//       });
//     }

//     // Find and update or create new config
//     let config = await ReferralConfig.findOne();

//     if (config) {
//       // Update existing config
//       config.userDiscountPercent = userDiscountPercent;
//       config.referrerCommissionPercent = referrerCommissionPercent;
//       config.adminCommissionPercent = adminCommissionPercent;
//     } else {
//       // Create new config
//       config = new ReferralConfig({
//         userDiscountPercent,
//         referrerCommissionPercent,
//         adminCommissionPercent
//       });
//     }

//     await config.save();

//     res.json({
//       success: true,
//       message: "Referral configuration updated successfully",
//       config
//     });

//   } catch (error) {
//     console.error("Update Referral Config Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error updating referral configuration"
//     });
//   }
// };




// Update referral configuration
export const updateReferralConfig = async (req, res) => {
  try {
    const {
      userDiscountPercent,
      referrerCommissionPercent,
      adminCommissionPercent,
      couponDiscountPercent,
      couponCommissionPercent,
      maxDirectDiscountPercent,
      maxCouponDiscountPercent,
      maxTotalDiscountPercent
    } = req.body;

    // Validate percentages
    const validatePercentage = (value, name, max = 100) => {
      if (value < 0 || value > max) {
        throw new Error(`${name} must be between 0% and ${max}%`);
      }
    };

    try {
      validatePercentage(userDiscountPercent, "User discount", 50);
      validatePercentage(referrerCommissionPercent, "Referrer commission", 50);
      validatePercentage(adminCommissionPercent, "Admin commission", 50);
      validatePercentage(couponDiscountPercent, "Coupon discount", 50);
      validatePercentage(couponCommissionPercent, "Coupon commission", 50);
      validatePercentage(maxDirectDiscountPercent, "Max direct discount", 50);
      validatePercentage(maxCouponDiscountPercent, "Max coupon discount", 50);
      validatePercentage(maxTotalDiscountPercent, "Max total discount", 50);
    } catch (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError.message
      });
    }

    // Find and update or create new config
    let config = await ReferralConfig.findOne();

    if (config) {
      // Update existing config
      config.userDiscountPercent = userDiscountPercent;
      config.referrerCommissionPercent = referrerCommissionPercent;
      config.adminCommissionPercent = adminCommissionPercent;
      config.couponDiscountPercent = couponDiscountPercent;
      config.couponCommissionPercent = couponCommissionPercent;
      config.maxDirectDiscountPercent = maxDirectDiscountPercent;
      config.maxCouponDiscountPercent = maxCouponDiscountPercent;
      config.maxTotalDiscountPercent = maxTotalDiscountPercent;
    } else {
      // Create new config
      config = new ReferralConfig({
        userDiscountPercent,
        referrerCommissionPercent,
        adminCommissionPercent,
        couponDiscountPercent,
        couponCommissionPercent,
        maxDirectDiscountPercent,
        maxCouponDiscountPercent,
        maxTotalDiscountPercent
      });
    }

    await config.save();

    res.json({
      success: true,
      message: "Referral configuration updated successfully",
      config
    });

  } catch (error) {
    console.error("Update Referral Config Error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating referral configuration"
    });
  }
};









// Get all referral data for admin
// controllers/referralController.js




// export const getAllReferrals = async (req, res) => {
//   try {
//     const referrals = await orderModel.aggregate([
//       {
//         $match: {
//           referredBy: { $exists: true, $ne: null },
//         },
//       },
//       // Ensure both IDs are ObjectId
//       {
//         $addFields: {
//           referredByObj: {
//             $cond: [
//               { $eq: [{ $type: "$referredBy" }, "string"] },
//               { $toObjectId: "$referredBy" },
//               "$referredBy",
//             ],
//           },
//           userIdObj: {
//             $cond: [
//               { $eq: [{ $type: "$userId" }, "string"] },
//               { $toObjectId: "$userId" },
//               "$userId",
//             ],
//           },
//         },
//       },

//       // Lookup referred user (buyer)
//       {
//         $lookup: {
//           from: "verifiednumbers", // ✅ correct collection
//           localField: "userIdObj",
//           foreignField: "_id",
//           as: "referredUserData",
//         },
//       },
//       { $unwind: { path: "$referredUserData", preserveNullAndEmptyArrays: true } },

//       // Lookup referrer (who referred)
//       {
//         $lookup: {
//           from: "verifiednumbers", // ✅ correct collection
//           localField: "referredByObj",
//           foreignField: "_id",
//           as: "referrerData",
//         },
//       },
//       { $unwind: { path: "$referrerData", preserveNullAndEmptyArrays: true } },

//       {
//         $project: {
//           orderId: "$orderid",
//           orderDate: "$date",
//           orderAmount: "$amount",
//           referralDiscount: { $toDouble: "$referralDiscount" },
//           commissionEarned: { $toDouble: "$commissionEarned" },
//           status: "$status",

//           referredUser: {
//             number: "$referredUserData.number", // ✅
//           },
//           referrer: {
//             number: "$referrerData.number", // ✅
//           },
//         },
//       },
//       { $sort: { orderDate: -1 } },
//     ]);

//     console.log("Referral Orders:", referrals);

//     res.json({
//       success: true,
//       data: referrals,
//       totalReferrals: referrals.length,
//       totalCommission: referrals.reduce(
//         (sum, r) => sum + (r.commissionEarned || 0),
//         0
//       ),
//     });
//   } catch (error) {
//     console.error("Error fetching referral data:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error fetching referral data",
//     });
//   }
// };

// Fix the getAllReferrals controller
export const getAllReferrals = async (req, res) => {
  try {
    const referrals = await orderModel.aggregate([
      {
        $match: {
          $or: [
            { referredBy: { $exists: true, $ne: null } },
            { "couponReferral.couponOwner": { $exists: true, $ne: null } }
          ]
        }
      },
      // Convert IDs to ObjectId if they are strings
      {
        $addFields: {
          referredByObj: {
            $cond: [
              { $and: [{ $ne: ["$referredBy", null] }, { $eq: [{ $type: "$referredBy" }, "string"] }] },
              { $toObjectId: "$referredBy" },
              "$referredBy"
            ]
          },
          couponOwnerObj: {
            $cond: [
              { $and: [{ $ne: ["$couponReferral.couponOwner", null] }, { $eq: [{ $type: "$couponReferral.couponOwner" }, "string"] }] },
              { $toObjectId: "$couponReferral.couponOwner" },
              "$couponReferral.couponOwner"
            ]
          },
          userIdObj: {
            $cond: [
              { $eq: [{ $type: "$userId" }, "string"] },
              { $toObjectId: "$userId" },
              "$userId"
            ]
          }
        }
      },

      // Lookup referred user (buyer)
      {
        $lookup: {
          from: "verifiednumbers",
          localField: "userIdObj",
          foreignField: "_id",
          as: "referredUserData"
        }
      },
      { $unwind: { path: "$referredUserData", preserveNullAndEmptyArrays: true } },

      // Lookup direct referrer
      {
        $lookup: {
          from: "verifiednumbers",
          localField: "referredByObj",
          foreignField: "_id",
          as: "directReferrerData"
        }
      },
      { $unwind: { path: "$directReferrerData", preserveNullAndEmptyArrays: true } },

      // Lookup coupon referrer
      {
        $lookup: {
          from: "verifiednumbers",
          localField: "couponOwnerObj",
          foreignField: "_id",
          as: "couponReferrerData"
        }
      },
      { $unwind: { path: "$couponReferrerData", preserveNullAndEmptyArrays: true } },

      {
        $project: {
          orderId: "$orderid",
          orderDate: "$date",
          orderAmount: "$amount",
          originalAmount: "$originalAmount",
          // FIX: Handle both direct referral discount and coupon discount
          referralDiscount: {
            $cond: {
              if: { $ne: ["$referredBy", null] },
              then: { $toDouble: "$referralDiscount" }, // Direct referral discount
              else: { $toDouble: "$discount" } // Coupon discount
            }
          },
          commissionEarned: {
            $cond: {
              if: { $gt: ["$commissionEarned", 0] },
              then: { $toDouble: "$commissionEarned" },
              else: { $toDouble: "$couponReferral.commissionEarned" }
            }
          },
          status: "$status",
          referralType: {
            $cond: {
              if: { $ne: ["$referredBy", null] },
              then: "direct",
              else: "coupon"
            }
          },
          couponCode: "$couponReferral.couponCode",
          discountType: {
            $cond: {
              if: { $ne: ["$referredBy", null] },
              then: "referral",
              else: "coupon"
            }
          },

          // Referred User (Buyer)
          referredUser: {
            name: {
              $concat: [
                { $ifNull: ["$address.firstName", ""] },
                " ",
                { $ifNull: ["$address.lastName", ""] }
              ]
            },
            email: "$address.email",
            phone: "$address.phone",
            number: "$referredUserData.number"
          },

          // Referrer (can be direct or coupon)
          referrer: {
            name: {
              $cond: {
                if: { $ne: ["$referredBy", null] },
                then: {
                  $concat: [
                    { $ifNull: ["$directReferrerData.name", ""] },
                    " ",
                    { $ifNull: ["$directReferrerData.lastName", ""] }
                  ]
                },
                else: {
                  $concat: [
                    { $ifNull: ["$couponReferrerData.name", ""] },
                    " ",
                    { $ifNull: ["$couponReferrerData.lastName", ""] }
                  ]
                }
              }
            },
            email: {
              $cond: {
                if: { $ne: ["$referredBy", null] },
                then: "$directReferrerData.email",
                else: "$couponReferrerData.email"
              }
            },
            number: {
              $cond: {
                if: { $ne: ["$referredBy", null] },
                then: "$directReferrerData.number",
                else: "$couponReferrerData.number"
              }
            }
          }
        }
      },
      { $sort: { orderDate: -1 } }
    ]);

    console.log("Processed Referrals:", referrals.length);

    // Log sample data to verify discount calculation
    if (referrals.length > 0) {
      console.log("Sample referral data:", {
        orderId: referrals[0].orderId,
        referralDiscount: referrals[0].referralDiscount,
        commissionEarned: referrals[0].commissionEarned,
        referralType: referrals[0].referralType,
        discountType: referrals[0].discountType
      });
    }

    res.json({
      success: true,
      data: referrals,
      totalReferrals: referrals.length,
      totalCommission: referrals.reduce((sum, r) => sum + (r.commissionEarned || 0), 0),
      totalDiscount: referrals.reduce((sum, r) => sum + (r.referralDiscount || 0), 0)
    });
  } catch (error) {
    console.error("Error fetching referral data:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching referral data",
      error: error.message
    });
  }
};



// ================== STATS CONTROLLER ==================
// export const getReferralStats = async (req, res) => {
//   try {
//     const stats = await orderModel.aggregate([
//       {
//         $match: {
//           referredBy: { $exists: true, $ne: null }
//         }
//       },
//       {
//         $group: {
//           _id: "$referredBy",
//           totalOrders: { $sum: 1 },
//           totalCommission: { $sum: { $toDouble: "$commissionEarned" } },
//           totalDiscount: { $sum: { $toDouble: "$referralDiscount" } }
//         }
//       },
//       {
//         $lookup: {
//           from: "verifiednumbers", // make sure collection name matches exactly
//           localField: "_id",
//           foreignField: "_id",
//           as: "referrer"
//         }
//       },
//       {
//         $unwind: {
//           path: "$referrer",
//           preserveNullAndEmptyArrays: true
//         }
//       },
//       {
//         $project: {
//           referrerName: {
//             $cond: {
//               if: {
//                 $and: [
//                   { $ne: ["$referrer.name", null] },
//                   { $ne: ["$referrer.name", ""] }
//                 ]
//               },
//               then: "$referrer.name",
//               else: {
//                 $ifNull: ["$referrer.number", "Unknown User"]
//               }
//             }
//           },
//           referrerEmail: "$referrer.email",
//           referrerNumber: "$referrer.number",
//           totalOrders: 1,
//           totalCommission: 1,
//           totalDiscount: 1
//         }
//       },
//       { $sort: { totalCommission: -1 } }
//     ]);

//     console.log("Referral Stats:", stats);

//     res.json({
//       success: true,
//       data: stats
//     });
//   } catch (error) {
//     console.error("Error fetching referral statistics:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error fetching referral statistics"
//     });
//   }
// };



// Enhanced Referral Stats Controller
export const getReferralStats = async (req, res) => {
  try {
    const stats = await orderModel.aggregate([
      {
        $match: {
          $or: [
            { referredBy: { $exists: true, $ne: null } },
            { "couponReferral.couponOwner": { $exists: true, $ne: null } }
          ],
          payment: true
        }
      },
      {
        $facet: {
          // Direct referral stats
          directReferrals: [
            {
              $match: {
                referredBy: { $exists: true, $ne: null }
              }
            },
            {
              $group: {
                _id: "$referredBy",
                totalOrders: { $sum: 1 },
                totalCommission: { $sum: { $toDouble: "$commissionEarned" } },
                totalDiscount: { $sum: { $toDouble: "$referralDiscount" } },
                totalSales: { $sum: { $toDouble: "$amount" } }
              }
            }
          ],
          // Coupon referral stats
          couponReferrals: [
            {
              $match: {
                "couponReferral.couponOwner": { $exists: true, $ne: null }
              }
            },
            {
              $group: {
                _id: "$couponReferral.couponOwner",
                totalOrders: { $sum: 1 },
                totalCommission: { $sum: { $toDouble: "$couponReferral.commissionEarned" } },
                totalDiscount: { $sum: { $toDouble: "$discount" } },
                totalSales: { $sum: { $toDouble: "$amount" } }
              }
            }
          ]
        }
      },
      {
        $project: {
          allStats: {
            $concatArrays: ["$directReferrals", "$couponReferrals"]
          }
        }
      },
      { $unwind: "$allStats" },
      {
        $group: {
          _id: "$allStats._id",
          totalOrders: { $sum: "$allStats.totalOrders" },
          totalCommission: { $sum: "$allStats.totalCommission" },
          totalDiscount: { $sum: "$allStats.totalDiscount" },
          totalSales: { $sum: "$allStats.totalSales" }
        }
      },
      {
        $lookup: {
          from: "verifiednumbers",
          localField: "_id",
          foreignField: "_id",
          as: "referrer"
        }
      },
      {
        $unwind: {
          path: "$referrer",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          referrerName: {
            $cond: {
              if: {
                $and: [
                  { $ne: ["$referrer.name", null] },
                  { $ne: ["$referrer.name", ""] }
                ]
              },
              then: "$referrer.name",
              else: "Unknown User"
            }
          },
          referrerEmail: "$referrer.email",
          referrerNumber: "$referrer.number",
          totalOrders: 1,
          totalCommission: 1,
          totalDiscount: 1,
          totalSales: 1,
          averageOrderValue: {
            $cond: {
              if: { $gt: ["$totalOrders", 0] },
              then: { $divide: ["$totalSales", "$totalOrders"] },
              else: 0
            }
          }
        }
      },
      { $sort: { totalCommission: -1 } }
    ]);

    console.log("Enhanced Referral Stats:", stats.length);

    res.json({
      success: true,
      data: stats,
      summary: {
        totalReferrers: stats.length,
        totalCommission: stats.reduce((sum, stat) => sum + stat.totalCommission, 0),
        totalSales: stats.reduce((sum, stat) => sum + stat.totalSales, 0),
        totalOrders: stats.reduce((sum, stat) => sum + stat.totalOrders, 0)
      }
    });
  } catch (error) {
    console.error("Error fetching referral statistics:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching referral statistics",
      error: error.message
    });
  }
};











// Request payout
// export const requestPayout = async (req, res) => {
//   try {
//     const { method, upiId, bankName, accountNumber, ifsc, amount } = req.body;
//     console.log(req.body);

//     const user = await VerifiedNumberModel.findById(req.user.id);
//     if (amount > user.totalCommissionEarned) {
//       return res.status(400).json({ message: "Insufficient balance" });
//     }

//     const payoutRequest = await  PayoutRequest.create({
//       user: req.user.id,
//       method,
//       upiId,
//       bankName,
//       accountNumber,
//       ifsc,
//       amount,
//     });

//     user.totalCommissionEarned -= amount;
//     await user.save();

//     res.json({ success: true, message: "Payout request submitted", payoutRequest });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };



export const requestPayout = async (req, res) => {
  try {
    const { method, upiId, bankName, accountNumber, ifsc, amount } = req.body;
    const user = await VerifiedNumberModel.findById(req.user.id);

    // ✅ Check for minimum withdrawal limit
    if (amount < 100) {
      return res.status(400).json({ message: "Minimum withdrawal amount is ₹100" });
    }

    if (amount > user.totalCommissionEarned) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    const payoutRequest = await PayoutRequest.create({
      user: req.user.id,
      method,
      upiId,
      bankName,
      accountNumber,
      ifsc,
      amount,
    });

    res.json({ success: true, message: "Payout request submitted", payoutRequest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};




// ✅ 1. USER: Fetch payout history (logged-in user)
export const getPayoutHistory = async (req, res) => {
  try {
    const payouts = await PayoutRequest.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, payouts });
  } catch (error) {
    console.error("Error fetching user payout history:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ 2. ADMIN: Fetch all payout requests
export const getAllPayouts = async (req, res) => {
  try {
    const payouts = await PayoutRequest.find()
      .populate("user", "name number email") // populate basic user details
      .sort({ createdAt: -1 });

    res.json({ success: true, payouts });
  } catch (error) {
    console.error("Error fetching all payouts:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ 3. ADMIN: Change payout status (Approve / Reject)
// export const updatePayoutStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     if (!["Approved", "Rejected"].includes(status)) {
//       return res.status(400).json({ success: false, message: "Invalid status" });
//     }

//     const payout = await PayoutRequest.findByIdAndUpdate(
//       id,
//       { status },
//       { new: true }
//     ).populate("user", "name email phone");

//     if (!payout) {
//       return res.status(404).json({ success: false, message: "Payout not found" });
//     }

//     res.json({ success: true, message: `Payout ${status}`, payout });
//   } catch (error) {
//     console.error("Error updating payout status:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };



export const updatePayoutStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const payout = await PayoutRequest.findById(id).populate("user");
    if (!payout) {
      return res.status(404).json({ success: false, message: "Payout not found" });
    }

    // ✅ If already approved or rejected, do nothing
    if (payout.status === "Approved" || payout.status === "Rejected") {
      return res.status(400).json({ success: false, message: "Payout already processed" });
    }

    payout.status = status;
    await payout.save();

    // ✅ Deduct commission only if approved
    if (status === "Approved") {
      const user = payout.user;

      // Ensure user.totalCommissionEarned is not negative
      user.totalCommissionEarned = Math.max(0, user.totalCommissionEarned - payout.amount);
      await user.save();
    }

    res.json({ success: true, message: `Payout ${status}`, payout });
  } catch (error) {
    console.error("Error updating payout status:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};




export const getTotalEarnings = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const totalApproved = await PayoutRequest.aggregate([
      { $match: { user: userId, status: "Approved" } },
      { $group: { _id: null, totalReceived: { $sum: "$amount" } } },
    ]);

    console.log(totalApproved);

    res.json({
      success: true,
      totalEarnings: totalApproved[0]?.totalReceived || 0,
    });
  } catch (error) {
    console.error("Error calculating total earnings:", error);
    res.status(500).json({ message: "Server error" });
  }
};







//api gogglelogin

export const GoggleloginUser = async (req, res) => {
  const { email, name, picture } = req.body
  try {
    let user = await userModel.findOne({ email })
    if (!user) {
      user = await userModel.create({
        email,
        name,
        avatar: picture,
        password: '',
        provider: 'google',
      });
    } else {
      // update provider if necessary
      if (user.provider !== 'google') {
        user.provider = 'google';
        await user.save();
      }
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    })

    res.json({ token })
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
}






//api forgot password

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log(email)

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 3600000; // 1 hour

    await user.save();

    const resetUrl = `http://localhost:5174/reset-password/${resetToken}`;
    const message = `You are receiving this email because you (or someone else) has requested a password reset. Please click the link to reset your password: \n\n ${resetUrl}`;

    await sendEmail({
      email: user.email,
      subject: 'Password Reset Request',
      message,
    });
    res.status(201).json({ message: "Email Sent" })

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' });
  }
}


//api for reset password

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const user = await userModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something Went Wrong" })
  }
}

//Route for admin Login

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET)
      return res.status(200).json({ success: true, token })
    } else {
      return res.status(401).json({ success: false, message: "Invalid email or password" })
    }
  } catch (error) {
    console.error("Admin Login Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

const alluser = async (req, res) => {
  try {
    const Users = await userModel.find({}).select('-password');
    res.json({ success: true, Users })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}


const deleteUser = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.body.id)
    res.status(200).json({ success: true, message: "User Removed" })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

export { alluser, deleteUser }