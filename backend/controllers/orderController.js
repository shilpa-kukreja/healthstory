import Razorpay from "razorpay";
import crypto from "crypto";
import userModel from "../models/authmodel.js";
import orderModel from "../models/orderModel.js";
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';
import axios from "axios";
import orderModels from "../models/orderModels.js";
import VerifiedNumberModel from "../models/VerifiedNumberModel.js";
import ReferralConfig from "../models/ReferralConfig.js";


// Initialize Razorpay instance
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const currency = "INR";

console.log("Razorpay Key ID:", process.env.RAZORPAY_KEY_ID);
console.log("Razorpay Key Secret:", process.env.RAZORPAY_KEY_SECRET);



// const placeOrderCOD = async (req, res) => {
//   try {
//     console.log("Received Data:", req.body);

//     const { userId, items, amount, address, couponCode, discount,phone } = req.body;

//     if (!items || items.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "No items provided in the order",
//       });
//     }
//      const user = await VerifiedNumberModel.findOne({ number: phone }).populate("referredBy");
//     const config = await ReferralConfig.findOne() || { userDiscountPercent: 5, referrerCommissionPercent: 5 };

//     let refferldiscount = 0;
//     let commission = 0;

//     if (user && user.referredBy) {
//       refferldiscount = (amount * config.userDiscountPercent) / 100;
//       commission = (amount * config.referrerCommissionPercent) / 100;

//       await VerifiedNumberModel.findByIdAndUpdate(user.referredBy._id, {
//         $inc: { totalCommissionEarned: commission }
//       });
//     }

//     // Generate unique order ID
//     const uniqueOrderId = `COD-${Date.now()}-${crypto.randomBytes(3).toString("hex")}`;
//     const finalAmount = amount - discount - refferldiscount;

//     const orderData = {
//       orderid: uniqueOrderId,
//       userId,
//       items,
//       amount: finalAmount,
//       address,
//       paymentMethod: "COD",
//       payment: false,
//       date: Date.now(),
//       couponCode,
//       discount,
//     };

//     const newOrder = new orderModel(orderData);
//     await newOrder.save();

//     await userModel.findByIdAndUpdate(userId, { cartData: {} });

//     // ✅ Send email using nodemailer
//     const transporter = nodemailer.createTransport({
//       service: "Gmail",
//       auth: {
//         user: "shubshukla2332@gmail.com", // Use env variable in production
//         pass: "nbnv efod azbm dpwz",      // Use App Password
//       },
//     });

//     const itemsHTML = items.map((item) => `
//       <tr>
//         <td style="padding: 10px; border: 1px solid #ccc;">
//           <img src="${item.image}" alt="${item.name}" width="60" style="border-radius: 6px;">
//         </td>
//         <td style="padding: 10px; border: 1px solid #ccc;">
//           ${item.name} <br>
//           ${item.variant ? `<span style="font-size: 12px; color: #888;">Size : ${item.variant}</span>` : ''}
//         </td>
//         <td style="padding: 10px; border: 1px solid #ccc;">
//           ₹${item.price}
//         </td>
//       </tr>
//     `).join("");

//     const mailOptions = {
//       from: "shubshukla2332@gmail.com",
//       to: address.email,
//       subject: "🧾 Order Confirmation - Cash On Delivery",
//       html: `
//         <div style="font-family: 'Segoe UI', sans-serif; padding: 20px; background: #f6f9fc;">
//           <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 0 10px #ccc;">
//             <div style="padding: 20px; border-bottom: 1px solid #eee;">
//               <h2 style="margin-bottom: 5px;">Thank you for your order, ${address.firstName}!</h2>
//               <p style="color: #555;">Your Cash On Delivery order has been placed successfully.</p>
//             </div>

//             <div style="padding: 20px;">
//               <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Order Summary</h3>
//               <p><strong>Order ID:</strong> ${uniqueOrderId}</p>
//               <p><strong>Total Amount:</strong> ₹${amount}</p>
//               <p><strong>Payment Method:</strong> Cash On Delivery</p>
//               <p><strong>Order Date:</strong> ${new Date().toLocaleString()}</p>
//             </div>

//             <div style="padding: 20px;">
//               <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Shipping Details</h3>
//               <p>
//                 ${address.firstName} ${address.lastName}<br>
//                 ${address.street}<br>
//                 ${address.city}, ${address.state}<br>
//                 ${address.country} - ${address.zipcode}
//               </p>
//             </div>

//             <div style="padding: 20px;">
//               <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Items Ordered</h3>
//               <table style="width: 100%; border-collapse: collapse;">
//                 <thead>
//                   <tr style="background: #f0f0f0;">
//                     <th style="padding: 10px; border: 1px solid #ccc;">Image</th>
//                     <th style="padding: 10px; border: 1px solid #ccc;">Item</th>
//                     <th style="padding: 10px; border: 1px solid #ccc;">Price</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   ${itemsHTML}
//                 </tbody>
//               </table>
//             </div>

//             <div style="padding: 20px; text-align: center; color: #999;">
//               <p>Need help? Contact us at <a href="mailto:support@example.com">support@example.com</a></p>
//               <p style="font-size: 12px;">Thank you for shopping with us!</p>
//             </div>
//           </div>
//         </div>
//       `,
//     };

//     await transporter.sendMail(mailOptions);

//     res.json({
//       success: true,
//       message: "Order placed successfully (COD)",
//       orderid: uniqueOrderId,
//       finalAmount: amount,
//       discountApplied: discount 

//     });

//   } catch (error) {
//     console.error("Error in placeOrderCOD:", error);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };


// const placeOrderCOD = async (req, res) => {
//   try {
//     console.log("Received Data:", req.body);

//     const { userId, items, amount, address, couponCode, discount, phone } = req.body;

//     if (!items || items.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "No items provided in the order",
//       });
//     }

//     // Find user with referral data using phone number
//     const user = await VerifiedNumberModel.findOne({ number: phone }).populate("referredBy");

//     // Get referral configuration
//     const config = await ReferralConfig.findOne() || { 
//       userDiscountPercent: 5, 
//       referrerCommissionPercent: 5,
//       adminCommissionPercent: 10 
//     };

//     console.log("Referral Config:", config);
//     console.log("User:", user);


//     let referralDiscount = 0;
//     let commission = 0;
//     let referredBy = null;




//     if (user && user.referredBy) {
//       referredBy = user.referredBy._id;

//       // Calculate discount for the referred user
//       referralDiscount = (amount * config.userDiscountPercent) / 100;

//       // Calculate commission for the referrer
//       commission = (amount * config.referrerCommissionPercent) / 100;

//       // ✅ FIX: Update referrer's commission using VerifiedNumberModel
//       await VerifiedNumberModel.findByIdAndUpdate(referredBy, {
//         $inc: { 
//           totalCommissionEarned: Math.floor(commission),
//           totalReferral: 1
//         }
//       });

//       console.log(`🎯 Referral applied: User got ₹${referralDiscount} discount, Referrer earned ₹${commission} commission`);
//     }

//     // Generate unique order ID
//     const uniqueOrderId = `COD-${Date.now()}-${crypto.randomBytes(3).toString("hex")}`;

//     // Calculate final amount after all discounts
//     const finalAmount = Math.max(0, amount - discount - referralDiscount);

//     // Create order data with referral information
//     const orderData = {
//       orderid: uniqueOrderId,
//       userId,
//       items,
//       amount: finalAmount,
//       originalAmount: amount,
//       address,
//       status: 'Order Placed',
//       paymentMethod: "COD",
//       payment: true, // COD is considered paid
//       date: Date.now(),
//       couponCode: couponCode || '',
//       discount: discount || 0,
//       referralDiscount: referralDiscount,
//       commissionEarned: commission,
//       referredBy: referredBy,
//     };

//     const newOrder = new orderModel(orderData);
//     await newOrder.save();

//     // Clear user's cart after successful order
//     if (userId) {
//       await userModel.findByIdAndUpdate(userId, { cartData: {} });
//     }


//     // Send email confirmation
//     const transporter = nodemailer.createTransport({
//       service: "Gmail",
//       auth: {
//         user: "shubshukla2332@gmail.com",
//         pass: "nbnv efod azbm dpwz",
//       },
//     });

//     const itemsHTML = items.map((item) => `
//       <tr>
//         <td style="padding: 10px; border: 1px solid #ccc;">
//           <img src="${item.image}" alt="${item.name}" width="60" style="border-radius: 6px;">
//         </td>
//         <td style="padding: 10px; border: 1px solid #ccc;">
//           ${item.name} <br>
//           ${item.variant ? `<span style="font-size: 12px; color: #888;">Size : ${item.variant}</span>` : ''}
//         </td>
//         <td style="padding: 10px; border: 1px solid #ccc;">
//           ₹${item.price} x ${item.quantity}
//         </td>
//       </tr>
//     `).join("");

//     const mailOptions = {
//       from: "shubshukla2332@gmail.com",
//       to: address.email,
//       subject: "🧾 Order Confirmation - Cash On Delivery",
//       html: `
//         <div style="font-family: 'Segoe UI', sans-serif; padding: 20px; background: #f6f9fc;">
//           <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 0 10px #ccc;">
//             <div style="padding: 20px; border-bottom: 1px solid #eee;">
//               <h2 style="margin-bottom: 5px;">Thank you for your order, ${address.firstName}!</h2>
//               <p style="color: #555;">Your Cash On Delivery order has been placed successfully.</p>
//             </div>

//             <div style="padding: 20px;">
//               <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Order Summary</h3>
//               <p><strong>Order ID:</strong> ${uniqueOrderId}</p>
//               <p><strong>Original Amount:</strong> ₹${amount}</p>
//               ${discount > 0 ? `<p><strong>Coupon Discount:</strong> -₹${discount}</p>` : ''}
//               ${referralDiscount > 0 ? `<p><strong>Referral Discount (${config.userDiscountPercent}%):</strong> -₹${referralDiscount}</p>` : ''}
//               <p><strong>Final Amount:</strong> ₹${finalAmount}</p>
//               <p><strong>Payment Method:</strong> Cash On Delivery</p>
//               <p><strong>Order Date:</strong> ${new Date().toLocaleString()}</p>
//               ${referralDiscount > 0 ? `<p style="color: green; font-weight: bold;">🎉 You saved ₹${referralDiscount} using referral!</p>` : ''}
//             </div>

//             <div style="padding: 20px;">
//               <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Shipping Details</h3>
//               <p>
//                 ${address.firstName} ${address.lastName}<br>
//                 ${address.street}<br>
//                 ${address.city}, ${address.state}<br>
//                 ${address.country} - ${address.zipcode}<br>
//                 Phone: ${address.phone}
//               </p>
//             </div>

//             <div style="padding: 20px;">
//               <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Items Ordered</h3>
//               <table style="width: 100%; border-collapse: collapse;">
//                 <thead>
//                   <tr style="background: #f0f0f0;">
//                     <th style="padding: 10px; border: 1px solid #ccc;">Image</th>
//                     <th style="padding: 10px; border: 1px solid #ccc;">Item</th>
//                     <th style="padding: 10px; border: 1px solid #ccc;">Price</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   ${itemsHTML}
//                 </tbody>
//               </table>
//             </div>

//             <div style="padding: 20px; text-align: center; color: #999;">
//               <p>Need help? Contact us at <a href="mailto:support@example.com">support@example.com</a></p>
//               <p style="font-size: 12px;">Thank you for shopping with us!</p>
//             </div>
//           </div>
//         </div>
//       `,
//     };

//     await transporter.sendMail(mailOptions);

//      res.json({
//       success: true,
//       message: "Order placed successfully (COD)",
//       orderid: uniqueOrderId,
//       finalAmount: finalAmount,
//       originalAmount: amount,
//       discountApplied: discount || 0,
//       referralDiscount: referralDiscount,
//       commissionEarned: commission,
//       wasReferred: !!(user && user.referredBy)
//     });

//   } catch (error) {
//     console.error("Error in placeOrderCOD:", error);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };


// const placeOrderCOD = async (req, res) => {
//   try {
//     console.log("Received Data:", req.body);

//     const { userId, items, amount, address, couponCode, discount, phone } = req.body;

//     if (!items || items.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "No items provided in the order",
//       });
//     }

//     // Find user with referral data using phone number
//     const user = await VerifiedNumberModel.findOne({ number: phone }).populate("referredBy");

//     // Get referral configuration from database
//     let config = await ReferralConfig.findOne();

//     // If no config exists, create default one
//     if (!config) {
//       config = new ReferralConfig({
//         userDiscountPercent: 5,
//         referrerCommissionPercent: 5,
//         adminCommissionPercent: 10
//       });
//       await config.save();
//       console.log("✅ Created default referral config");
//     }

//     console.log("🔧 Referral Config:", config);
//     console.log("👤 User:", user ? {
//       number: user.number,
//       referredBy: user.referredBy ? user.referredBy._id : null,
//       referralCode: user.referralCode
//     } : "User not found");

//     let referralDiscount = 0;
//     let commission = 0;
//     let referredBy = null;

//     // Apply referral benefits if user was referred by someone
//     // ✅ Apply referral benefits only if user was referred AND hasn't used it before
//     if (user && user.referredBy && !user.usedReferral) {
//       referredBy = user.referredBy._id;

//       // Calculate discount for the referred user (from admin settings)
//       referralDiscount = (amount * config.userDiscountPercent) / 100;

//       // Calculate commission for the referrer (from admin settings)
//       commission = (amount * config.referrerCommissionPercent) / 100;

//       console.log(`💰 Calculating commission: ${amount} * ${config.referrerCommissionPercent}% = ${commission}`);
//       console.log(`🎁 Calculating discount: ${amount} * ${config.userDiscountPercent}% = ${referralDiscount}`);

//       // Update referrer's commission and referral count
//       const updatedReferrer = await VerifiedNumberModel.findByIdAndUpdate(
//         referredBy,
//         {
//           $inc: {
//             totalCommissionEarned: Math.floor(commission),
//             totalReferral: 1
//           }
//         },
//         { new: true }
//       );

//       // ✅ Mark referral as used so user cannot use again
//       await VerifiedNumberModel.findByIdAndUpdate(user._id, { usedReferral: true });

//       console.log(`✅ Referral applied and marked used for ${user.number}`);
//     }
//     else if (user && user.usedReferral) {
//       console.log("⚠️ User already used referral previously — skipping discount & commission.");
//     }
//     else {
//       console.log("ℹ️ No referral applied - user was not referred by anyone");
//     }

//     // Generate unique order ID
//     const uniqueOrderId = `COD-${Date.now()}-${crypto.randomBytes(3).toString("hex")}`;

//     // Calculate final amount after all discounts
//     const totalReferralDeduction = referralDiscount + commission;
//     const finalAmount = Math.max(0, amount - discount - totalReferralDeduction);

//     console.log(`🧮 Final amount calculation:
//   Original: ₹${amount}
//   Coupon Discount: -₹${discount || 0}
//   Referral Discount (${config.userDiscountPercent}%): -₹${referralDiscount}
//   Referrer Commission (${config.referrerCommissionPercent}%): -₹${commission}
//   Final Amount (Payable): ₹${finalAmount}
// `);

//     // Create order data with referral information
//     const orderData = {
//       orderid: uniqueOrderId,
//       userId,
//       items,
//       amount: finalAmount,
//       originalAmount: amount,
//       address,
//       status: 'Order Placed',
//       paymentMethod: "COD",
//       payment: true, // COD is considered paid
//       date: Date.now(),
//       couponCode: couponCode || '',
//       discount: discount || 0,
//       referralDiscount: referralDiscount,
//       commissionEarned: commission,
//       referredBy: referredBy,
//       referralConfigUsed: {
//         userDiscountPercent: config.userDiscountPercent,
//         referrerCommissionPercent: config.referrerCommissionPercent,
//         adminCommissionPercent: config.adminCommissionPercent
//       }
//     };

//     const newOrder = new orderModel(orderData);
//     await newOrder.save();

//     console.log(`✅ Order saved: ${uniqueOrderId}`);

//     // Clear user's cart after successful order
//     if (userId) {
//       await userModel.findByIdAndUpdate(userId, { cartData: {} });
//       console.log("🛒 User cart cleared");
//     }

//     // Send email confirmation
//     try {
//       const transporter = nodemailer.createTransport({
//         service: "Gmail",
//         auth: {
//           user: "shubshukla2332@gmail.com",
//           pass: "nbnv efod azbm dpwz",
//         },
//       });

//       const itemsHTML = items.map((item) => `
//         <tr>
//           <td style="padding: 10px; border: 1px solid #ccc;">
//             <img src="${item.image}" alt="${item.name}" width="60" style="border-radius: 6px;">
//           </td>
//           <td style="padding: 10px; border: 1px solid #ccc;">
//             ${item.name} <br>
//             ${item.variant ? `<span style="font-size: 12px; color: #888;">Size : ${item.variant}</span>` : ''}
//           </td>
//           <td style="padding: 10px; border: 1px solid #ccc;">
//             ₹${item.price} x ${item.quantity}
//           </td>
//         </tr>
//       `).join("");

//       const mailOptions = {
//         from: "shubshukla2332@gmail.com",
//         to: address.email,
//         subject: "🧾 Order Confirmation - Cash On Delivery",
//         html: `
//           <div style="font-family: 'Segoe UI', sans-serif; padding: 20px; background: #f6f9fc;">
//             <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 0 10px #ccc;">
//               <div style="padding: 20px; border-bottom: 1px solid #eee;">
//                 <h2 style="margin-bottom: 5px;">Thank you for your order, ${address.firstName}!</h2>
//                 <p style="color: #555;">Your Cash On Delivery order has been placed successfully.</p>
//               </div>

//               <div style="padding: 20px;">
//                 <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Order Summary</h3>
//                 <p><strong>Order ID:</strong> ${uniqueOrderId}</p>
//                 <p><strong>Original Amount:</strong> ₹${amount}</p>
//                 ${discount > 0 ? `<p><strong>Coupon Discount:</strong> -₹${discount}</p>` : ''}
//                 ${referralDiscount > 0 ? `<p><strong>Referral Discount (${config.userDiscountPercent}%):</strong> -₹${referralDiscount}</p>` : ''}
//                 <p><strong>Final Amount:</strong> ₹${finalAmount}</p>
//                 <p><strong>Payment Method:</strong> Cash On Delivery</p>
//                 <p><strong>Order Date:</strong> ${new Date().toLocaleString()}</p>
//                 ${referralDiscount > 0 ? `<p style="color: green; font-weight: bold;">🎉 You saved ₹${referralDiscount} using referral!</p>` : ''}
//               </div>

//               <div style="padding: 20px;">
//                 <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Shipping Details</h3>
//                 <p>
//                   ${address.firstName} ${address.lastName}<br>
//                   ${address.street}<br>
//                   ${address.city}, ${address.state}<br>
//                   ${address.country} - ${address.zipcode}<br>
//                   Phone: ${address.phone}
//                 </p>
//               </div>

//               <div style="padding: 20px;">
//                 <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Items Ordered</h3>
//                 <table style="width: 100%; border-collapse: collapse;">
//                   <thead>
//                     <tr style="background: #f0f0f0;">
//                       <th style="padding: 10px; border: 1px solid #ccc;">Image</th>
//                       <th style="padding: 10px; border: 1px solid #ccc;">Item</th>
//                       <th style="padding: 10px; border: 1px solid #ccc;">Price</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     ${itemsHTML}
//                   </tbody>
//                 </table>
//               </div>

//               <div style="padding: 20px; text-align: center; color: #999;">
//                 <p>Need help? Contact us at <a href="mailto:support@example.com">support@example.com</a></p>
//                 <p style="font-size: 12px;">Thank you for shopping with us!</p>
//               </div>
//             </div>
//           </div>
//         `,
//       };

//       await transporter.sendMail(mailOptions);
//       console.log("📧 Order confirmation email sent");
//     } catch (emailError) {
//       console.error("Email sending error:", emailError);
//       // Don't fail the order if email fails
//     }

//     res.json({
//       success: true,
//       message: "Order placed successfully (COD)",
//       orderid: uniqueOrderId,
//       finalAmount: finalAmount,
//       originalAmount: amount,
//       discountApplied: discount || 0,
//       referralDiscount: referralDiscount,
//       commissionEarned: commission,
//       wasReferred: !!(user && user.referredBy),
//       referralConfig: {
//         userDiscountPercent: config.userDiscountPercent,
//         referrerCommissionPercent: config.referrerCommissionPercent
//       }
//     });

//   } catch (error) {
//     console.error("❌ Error in placeOrderCOD:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server Error in order placement",
//       error: error.message
//     });
//   }
// };




// const placeOrderCOD = async (req, res) => {
//   try {
//     console.log("Received Data:", req.body);

//     const { userId, items, amount, address, couponCode, discount, phone, couponReferralInfo } = req.body;

//     if (!items || items.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "No items provided in the order",
//       });
//     }

//     // Find user with referral data using phone number
//     const user = await VerifiedNumberModel.findOne({ number: phone }).populate("referredBy");

//     // Get referral configuration from database
//     let config = await ReferralConfig.findOne();

//     // If no config exists, create default one
//     if (!config) {
//       config = new ReferralConfig({
//         userDiscountPercent: 5,
//         referrerCommissionPercent: 5,
//         adminCommissionPercent: 10,
//         maxCouponDiscountPercent: 15,
//         maxCouponCommissionPercent: 10
//       });
//       await config.save();
//       console.log("✅ Created default referral config");
//     }

//     console.log("🔧 Referral Config:", config);

//     let referralDiscount = 0;
//     let commission = 0;
//     let referredBy = null;
//     let couponCommission = 0;
//     let couponOwnerId = null;

//     // 🔥 NEW: Handle Coupon Referral
//     if (couponReferralInfo && couponReferralInfo.couponOwnerId) {
//       couponOwnerId = couponReferralInfo.couponOwnerId;
//       couponCommission = couponReferralInfo.commission || 0;

//       // Update coupon owner's commission
//       const updatedCouponOwner = await VerifiedNumberModel.findByIdAndUpdate(
//         couponOwnerId,
//         {
//           $inc: {
//             totalCommissionEarned: Math.floor(couponCommission),
//             totalReferral: 1
//           }
//         },
//         { new: true }
//       );

//       console.log(`💰 Coupon commission added to ${updatedCouponOwner.number}: ₹${couponCommission}`);
//     }

//     // ✅ Existing: Handle Direct Referral (only if not already used)
//     if (user && user.referredBy && !user.usedReferral) {
//       referredBy = user.referredBy._id;

//       // Calculate discount for the referred user
//       referralDiscount = (amount * config.userDiscountPercent) / 100;

//       // Calculate commission for the referrer
//       commission = (amount * config.referrerCommissionPercent) / 100;

//       console.log(`💰 Direct referral commission: ${amount} * ${config.referrerCommissionPercent}% = ${commission}`);

//       // Update referrer's commission and referral count
//       const updatedReferrer = await VerifiedNumberModel.findByIdAndUpdate(
//         referredBy,
//         {
//           $inc: {
//             totalCommissionEarned: Math.floor(commission),
//             totalReferral: 1
//           }
//         },
//         { new: true }
//       );

//       // ✅ Mark referral as used so user cannot use again
//       await VerifiedNumberModel.findByIdAndUpdate(user._id, { usedReferral: true });

//       console.log(`✅ Direct referral applied and marked used for ${user.number}`);
//     }
//     else if (user && user.usedReferral) {
//       console.log("⚠️ User already used direct referral previously");
//     }

//     // Generate unique order ID
//     const uniqueOrderId = `COD-${Date.now()}-${crypto.randomBytes(3).toString("hex")}`;

//     // Calculate final amount after all discounts
//     const totalDeductions = discount + referralDiscount;
//     const finalAmount = Math.max(0, amount - totalDeductions);

//     console.log(`🧮 Final amount calculation:
//   Original: ₹${amount}
//   Coupon Discount: -₹${discount || 0}
//   Referral Discount: -₹${referralDiscount}
//   Final Amount (Payable): ₹${finalAmount}
//   Commission to Referrer: ₹${commission}
//   Commission to Coupon Owner: ₹${couponCommission}
// `);

//     // Create order data with referral information
//     const orderData = {
//       orderid: uniqueOrderId,
//       userId,
//       items,
//       amount: finalAmount,
//       originalAmount: amount,
//       address,
//       status: 'Order Placed',
//       paymentMethod: "COD",
//       payment: true,
//       date: Date.now(),
//       couponCode: couponCode || '',
//       discount: discount || 0,
//       referralDiscount: referralDiscount,
//       commissionEarned: commission,
//       referredBy: referredBy,
//       // NEW: Coupon referral fields
//       couponReferral: couponOwnerId ? {
//         couponOwner: couponOwnerId,
//         couponCode: couponReferralInfo?.personalCouponCode,
//         commissionEarned: couponCommission,
//         discountPercent: couponReferralInfo?.discountPercent
//       } : null,
//       referralConfigUsed: {
//         userDiscountPercent: config.userDiscountPercent,
//         referrerCommissionPercent: config.referrerCommissionPercent,
//         adminCommissionPercent: config.adminCommissionPercent,
//         couponDiscountPercent: couponReferralInfo?.discountPercent,
//         couponCommissionPercent: config.couponCommissionPercent
//       }
//     };

//     const newOrder = new orderModel(orderData);
//     await newOrder.save();

//     console.log(`✅ Order saved: ${uniqueOrderId}`);

//     // Clear user's cart after successful order
//     if (userId) {
//       await userModel.findByIdAndUpdate(userId, { cartData: {} });
//       console.log("🛒 User cart cleared");
//     }

//     // Send email confirmation
//     try {
//       const transporter = nodemailer.createTransport({
//         service: "Gmail",
//         auth: {
//           user: "shubshukla2332@gmail.com",
//           pass: "nbnv efod azbm dpwz",
//         },
//       });

//       const itemsHTML = items.map((item) => `
//         <tr>
//           <td style="padding: 10px; border: 1px solid #ccc;">
//             <img src="${item.image}" alt="${item.name}" width="60" style="border-radius: 6px;">
//           </td>
//           <td style="padding: 10px; border: 1px solid #ccc;">
//             ${item.name} <br>
//             ${item.variant ? `<span style="font-size: 12px; color: #888;">Size : ${item.variant}</span>` : ''}
//           </td>
//           <td style="padding: 10px; border: 1px solid #ccc;">
//             ₹${item.price} x ${item.quantity}
//           </td>
//         </tr>
//       `).join("");

//       const mailOptions = {
//         from: "shubshukla2332@gmail.com",
//         to: address.email,
//         subject: "🧾 Order Confirmation - Cash On Delivery",
//         html: `
//           <div style="font-family: 'Segoe UI', sans-serif; padding: 20px; background: #f6f9fc;">
//             <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 0 10px #ccc;">
//               <div style="padding: 20px; border-bottom: 1px solid #eee;">
//                 <h2 style="margin-bottom: 5px;">Thank you for your order, ${address.firstName}!</h2>
//                 <p style="color: #555;">Your Cash On Delivery order has been placed successfully.</p>
//               </div>

//               <div style="padding: 20px;">
//                 <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Order Summary</h3>
//                 <p><strong>Order ID:</strong> ${uniqueOrderId}</p>
//                 <p><strong>Original Amount:</strong> ₹${amount}</p>
//                 ${discount > 0 ? `<p><strong>Coupon Discount:</strong> -₹${discount}</p>` : ''}
//                 ${referralDiscount > 0 ? `<p><strong>Referral Discount (${config.userDiscountPercent}%):</strong> -₹${referralDiscount}</p>` : ''}
//                 <p><strong>Final Amount:</strong> ₹${finalAmount}</p>
//                 <p><strong>Payment Method:</strong> Cash On Delivery</p>
//                 <p><strong>Order Date:</strong> ${new Date().toLocaleString()}</p>
//                 ${referralDiscount > 0 ? `<p style="color: green; font-weight: bold;">🎉 You saved ₹${referralDiscount} using referral!</p>` : ''}
//               </div>

//               <div style="padding: 20px;">
//                 <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Shipping Details</h3>
//                 <p>
//                   ${address.firstName} ${address.lastName}<br>
//                   ${address.street}<br>
//                   ${address.city}, ${address.state}<br>
//                   ${address.country} - ${address.zipcode}<br>
//                   Phone: ${address.phone}
//                 </p>
//               </div>

//               <div style="padding: 20px;">
//                 <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Items Ordered</h3>
//                 <table style="width: 100%; border-collapse: collapse;">
//                   <thead>
//                     <tr style="background: #f0f0f0;">
//                       <th style="padding: 10px; border: 1px solid #ccc;">Image</th>
//                       <th style="padding: 10px; border: 1px solid #ccc;">Item</th>
//                       <th style="padding: 10px; border: 1px solid #ccc;">Price</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     ${itemsHTML}
//                   </tbody>
//                 </table>
//               </div>

//               <div style="padding: 20px; text-align: center; color: #999;">
//                 <p>Need help? Contact us at <a href="mailto:support@example.com">support@example.com</a></p>
//                 <p style="font-size: 12px;">Thank you for shopping with us!</p>
//               </div>
//             </div>
//           </div>
//         `,
//       };

//       await transporter.sendMail(mailOptions);
//       console.log("📧 Order confirmation email sent");
//     } catch (emailError) {
//       console.error("Email sending error:", emailError);
//       // Don't fail the order if email fails
//     }

//     res.json({
//       success: true,
//       message: "Order placed successfully (COD)",
//       orderid: uniqueOrderId,
//       finalAmount: finalAmount,
//       originalAmount: amount,
//       discountApplied: discount || 0,
//       referralDiscount: referralDiscount,
//       commissionEarned: commission,
//       wasReferred: !!(user && user.referredBy),
//       // NEW: Coupon referral response
//       couponReferral: couponOwnerId ? {
//         applied: true,
//         couponOwner: couponOwnerId,
//         commission: couponCommission,
//         discountPercent: couponReferralInfo?.discountPercent
//       } : { applied: false },
//       referralConfig: {
//         userDiscountPercent: config.userDiscountPercent,
//         referrerCommissionPercent: config.referrerCommissionPercent,
//         couponDiscountPercent: couponReferralInfo?.discountPercent
//       }
//     });

//   } catch (error) {
//     console.error("❌ Error in placeOrderCOD:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server Error in order placement",
//       error: error.message
//     });
//   }
// };




const placeOrderCOD = async (req, res) => {
  try {
    // console.log("Received Data:", req.body);

    // console.log("Received Data:", req.user);

    const userid = req.user.id;
    const userPhone = req.user.number;


    const { userId, items, amount, address, couponCode, discount, phone, couponReferralInfo } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No items provided in the order",
      });
    }

    // Find user with referral data using phone number
    const user = await VerifiedNumberModel.findOne({ number: userPhone }).populate("referredBy");

    // Get referral configuration from database
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
      console.log("✅ Created default referral config");
    }

    console.log("🔧 Referral Config:", config);

    let referralDiscount = 0;
    let commission = 0;
    let referredBy = null;
    let couponCommission = 0;
    let couponOwnerId = null;
    let couponDiscount = discount || 0;

    // NEW: Track if we need to mark referral as used
    let shouldMarkReferralUsed = false;

    // 🔥 Handle Coupon Referral (Applied for all coupon users)
    if (couponReferralInfo && couponReferralInfo.couponOwnerId) {
      couponOwnerId = couponReferralInfo.couponOwnerId;

      // Calculate coupon commission based on admin settings
      couponCommission = (amount * config.couponCommissionPercent) / 100;

      // If coupon discount is not provided, calculate based on admin settings
      if (!couponDiscount && couponReferralInfo.discountPercent) {
        couponDiscount = (amount * Math.min(couponReferralInfo.discountPercent, config.maxCouponDiscountPercent)) / 100;
      }

      console.log(`🎫 Coupon referral applied: Discount ₹${couponDiscount}, Commission ₹${couponCommission}`);

      // Update coupon owner's commission
      const updatedCouponOwner = await VerifiedNumberModel.findByIdAndUpdate(
        couponOwnerId,
        {
          $inc: {
            totalCommissionEarned: Math.floor(couponCommission),
            totalReferral: 1
          }
        },
        { new: true }
      );

      console.log(`💰 Coupon commission added to ${updatedCouponOwner.number}: ₹${couponCommission}`);

      // MARK: Coupon referral used - mark referral as used
      shouldMarkReferralUsed = true;
    }

    // ✅ Handle Direct Referral (only if not already used)
    
    if (user && user.referredBy && !user.usedReferral) {
      referredBy = user.referredBy._id;

      // Calculate discount for the referred user based on admin settings
      referralDiscount = (amount * config.userDiscountPercent) / 100;

      // Calculate commission for the referrer based on admin settings
      commission = (amount * config.referrerCommissionPercent) / 100;

      console.log(`👥 Direct referral applied: Discount ₹${referralDiscount}, Commission ₹${commission}`);

      // Update referrer's commission and referral count
      const updatedReferrer = await VerifiedNumberModel.findByIdAndUpdate(
        referredBy,
        {
          $inc: {
            totalCommissionEarned: Math.floor(commission),
            totalReferral: 1
          }
        },
        { new: true }
      );

      // MARK: Direct referral used - mark referral as used
      shouldMarkReferralUsed = true;

      console.log(`✅ Direct referral applied for ${user.number}`);
    }
    else if (user && user.usedReferral) {
      console.log("⚠️ User already used direct referral previously");
    }

    // ✅ MARK REFERRAL AS USED - FOR BOTH COUPON AND DIRECT REFERRAL
    if (user && shouldMarkReferralUsed && !user.usedReferral) {
      await VerifiedNumberModel.findByIdAndUpdate(user._id, { usedReferral: true });
      console.log(`✅ Referral marked as used for ${user.number} (coupon/direct referral applied)`);
    }

    // Apply maximum discount limits
    const maxAllowedDiscount = (amount * config.maxTotalDiscountPercent) / 100;
    const totalCalculatedDiscount = couponDiscount + referralDiscount;

    let finalDiscount = totalCalculatedDiscount;
    if (totalCalculatedDiscount > maxAllowedDiscount) {
      console.log(`⚠️ Total discount capped at ${config.maxTotalDiscountPercent}%`);
      finalDiscount = maxAllowedDiscount;
    }

    // Generate unique order ID
    const uniqueOrderId = `COD-${Date.now()}-${crypto.randomBytes(3).toString("hex")}`;

    // Calculate final amount after all discounts
    const finalAmount = Math.max(0, amount - finalDiscount);

    console.log(`🧮 Final amount calculation:
  Original: ₹${amount}
  Coupon Discount: -₹${couponDiscount}
  Referral Discount: -₹${referralDiscount}
  Total Discount: -₹${finalDiscount}
  Final Amount (Payable): ₹${finalAmount}
  Commission to Direct Referrer: ₹${commission}
  Commission to Coupon Owner: ₹${couponCommission}
  Marked Referral as Used: ${shouldMarkReferralUsed}
`);

    // Create order data with referral information
    const orderData = {
      orderid: uniqueOrderId,
      userId,
      items,
      amount: finalAmount,
      originalAmount: amount,
      address,
      status: 'Order Placed',
      paymentMethod: "COD",
      payment: true,
      date: Date.now(),
      couponCode: couponCode || '',
      discount: couponDiscount,
      referralDiscount: referralDiscount,
      totalDiscount: finalDiscount,
      commissionEarned: commission,
      referredBy: referredBy,
      // Coupon referral fields
      couponReferral: couponOwnerId ? {
        couponOwner: couponOwnerId,
        couponCode: couponReferralInfo?.personalCouponCode,
        commissionEarned: couponCommission,
        discountPercent: couponReferralInfo?.discountPercent,
        appliedDiscount: couponDiscount
      } : null,
      referralConfigUsed: {
        // Direct referral config
        userDiscountPercent: config.userDiscountPercent,
        referrerCommissionPercent: config.referrerCommissionPercent,
        adminCommissionPercent: config.adminCommissionPercent,

        // Coupon referral config
        couponDiscountPercent: config.couponDiscountPercent,
        couponCommissionPercent: config.couponCommissionPercent,

        // Maximum limits
        maxDirectDiscountPercent: config.maxDirectDiscountPercent,
        maxCouponDiscountPercent: config.maxCouponDiscountPercent,
        maxTotalDiscountPercent: config.maxTotalDiscountPercent
      },
      markedReferralUsed: shouldMarkReferralUsed // NEW: Track this in order
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    console.log(`✅ Order saved: ${uniqueOrderId}`);

    // Clear user's cart after successful order
    if (userId) {
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      console.log("🛒 User cart cleared");
    }

    // Send email confirmation (your existing email code remains the same)
    try {
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "shubshukla2332@gmail.com",
          pass: "nbnv efod azbm dpwz",
        },
      });

      const itemsHTML = items.map((item) => `
        <tr>
          <td style="padding: 10px; border: 1px solid #ccc;">
            <img src="${item.image}" alt="${item.name}" width="60" style="border-radius: 6px;">
          </td>
          <td style="padding: 10px; border: 1px solid #ccc;">
            ${item.name} <br>
            ${item.variant ? `<span style="font-size: 12px; color: #888;">Size : ${item.variant}</span>` : ''}
          </td>
          <td style="padding: 10px; border: 1px solid #ccc;">
            ₹${item.price} x ${item.quantity}
          </td>
        </tr>
      `).join("");

      const mailOptions = {
        from: "shubshukla2332@gmail.com",
        to: address.email,
        subject: "🧾 Order Confirmation - Cash On Delivery",
        html: `
          <div style="font-family: 'Segoe UI', sans-serif; padding: 20px; background: #f6f9fc;">
            <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 0 10px #ccc;">
              <div style="padding: 20px; border-bottom: 1px solid #eee;">
                <h2 style="margin-bottom: 5px;">Thank you for your order, ${address.firstName}!</h2>
                <p style="color: #555;">Your Cash On Delivery order has been placed successfully.</p>
              </div>

              <div style="padding: 20px;">
                <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Order Summary</h3>
                <p><strong>Order ID:</strong> ${uniqueOrderId}</p>
                <p><strong>Original Amount:</strong> ₹${amount}</p>
                ${couponDiscount > 0 ? `<p><strong>Coupon Discount:</strong> -₹${couponDiscount}</p>` : ''}
                ${referralDiscount > 0 ? `<p><strong>Referral Discount (${config.userDiscountPercent}%):</strong> -₹${referralDiscount}</p>` : ''}
                <p><strong>Total Discount:</strong> -₹${finalDiscount}</p>
                <p><strong>Final Amount:</strong> ₹${finalAmount}</p>
                <p><strong>Payment Method:</strong> Cash On Delivery</p>
                <p><strong>Order Date:</strong> ${new Date().toLocaleString()}</p>
                ${finalDiscount > 0 ? `<p style="color: green; font-weight: bold;">🎉 You saved ₹${finalDiscount} using referrals!</p>` : ''}
              </div>

              <div style="padding: 20px;">
                <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Shipping Details</h3>
                <p>
                  ${address.firstName} ${address.lastName}<br>
                  ${address.street}<br>
                  ${address.city}, ${address.state}<br>
                  ${address.country} - ${address.zipcode}<br>
                  Phone: ${address.phone}
                </p>
              </div>

              <div style="padding: 20px;">
                <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Items Ordered</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background: #f0f0f0;">
                      <th style="padding: 10px; border: 1px solid #ccc;">Image</th>
                      <th style="padding: 10px; border: 1px solid #ccc;">Item</th>
                      <th style="padding: 10px; border: 1px solid #ccc;">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemsHTML}
                  </tbody>
                </table>
              </div>

              <div style="padding: 20px; text-align: center; color: #999;">
                <p>Need help? Contact us at <a href="mailto:support@example.com">support@example.com</a></p>
                <p style="font-size: 12px;">Thank you for shopping with us!</p>
              </div>
            </div>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log("📧 Order confirmation email sent");
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      // Don't fail the order if email fails
    }

    res.json({
      success: true,
      message: "Order placed successfully (COD)",
      orderid: uniqueOrderId,
      finalAmount: finalAmount,
      originalAmount: amount,
      discountApplied: couponDiscount,
      referralDiscount: referralDiscount,
      totalDiscount: finalDiscount,
      commissionEarned: commission,
      wasReferred: !!(user && user.referredBy),
      markedReferralUsed: shouldMarkReferralUsed, // NEW: In response
      // Coupon referral response
      couponReferral: couponOwnerId ? {
        applied: true,
        couponOwner: couponOwnerId,
        commission: couponCommission,
        discount: couponDiscount,
        discountPercent: couponReferralInfo?.discountPercent
      } : { applied: false },
      referralConfig: {
        // Direct referral
        userDiscountPercent: config.userDiscountPercent,
        referrerCommissionPercent: config.referrerCommissionPercent,

        // Coupon referral
        couponDiscountPercent: config.couponDiscountPercent,
        couponCommissionPercent: config.couponCommissionPercent,

        // Maximum limits
        maxTotalDiscountPercent: config.maxTotalDiscountPercent
      }
    });

  } catch (error) {
    console.error("❌ Error in placeOrderCOD:", error);
    res.status(500).json({
      success: false,
      message: "Server Error in order placement",
      error: error.message
    });
  }
};


const placeOrderCODSuccess = async (req, res) => {
  try {
    console.log("Received Data:", req.body);

    const { items, amount, address, couponCode, discount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No items provided in the order",
      });
    }

    console.log("Items:", items);
    console.log("req body:", req.body);

    // Generate unique order ID
    const uniqueOrderId = `COD-${Date.now()}-${crypto.randomBytes(3).toString("hex")}`;

    const orderData = {
      orderid: uniqueOrderId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
      couponCode,
      discount,
    };

    const newOrder = new orderModels(orderData);
    await newOrder.save();



    // ✅ Send email using nodemailer
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "shubshukla2332@gmail.com", // Use env variable in production
        pass: "nbnv efod azbm dpwz",      // Use App Password
      },
    });

    const itemsHTML = items.map((item) => `
      <tr>
        <td style="padding: 10px; border: 1px solid #ccc;">
          <img src="${item.image}" alt="${item.name}" width="60" style="border-radius: 6px;">
        </td>
        <td style="padding: 10px; border: 1px solid #ccc;">
          ${item.name} <br>
          ${item.variant ? `<span style="font-size: 12px; color: #888;">Size : ${item.variant}</span>` : ''}
        </td>
        <td style="padding: 10px; border: 1px solid #ccc;">
          ₹${item.price}
        </td>
      </tr>
    `).join("");

    const mailOptions = {
      from: "shubshukla2332@gmail.com",
      to: address.email,
      subject: "🧾 Order Confirmation - Cash On Delivery",
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; padding: 20px; background: #f6f9fc;">
          <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 0 10px #ccc;">
            <div style="padding: 20px; border-bottom: 1px solid #eee;">
              <h2 style="margin-bottom: 5px;">Thank you for your order, ${address.firstName}!</h2>
              <p style="color: #555;">Your Cash On Delivery order has been placed successfully.</p>
            </div>

            <div style="padding: 20px;">
              <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Order Summary</h3>
              <p><strong>Order ID:</strong> ${uniqueOrderId}</p>
              <p><strong>Total Amount:</strong> ₹${amount}</p>
              <p><strong>Payment Method:</strong> Cash On Delivery</p>
              <p><strong>Order Date:</strong> ${new Date().toLocaleString()}</p>
            </div>

            <div style="padding: 20px;">
              <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Shipping Details</h3>
              <p>
                ${address.firstName} ${address.lastName}<br>
                ${address.street}<br>
                ${address.city}, ${address.state}<br>
                ${address.country} - ${address.zipcode}
              </p>
            </div>

            <div style="padding: 20px;">
              <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Items Ordered</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <thead>
                  <tr style="background: #f0f0f0;">
                    <th style="padding: 10px; border: 1px solid #ccc;">Image</th>
                    <th style="padding: 10px; border: 1px solid #ccc;">Item</th>
                    <th style="padding: 10px; border: 1px solid #ccc;">Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHTML}
                </tbody>
              </table>
            </div>

            <div style="padding: 20px; text-align: center; color: #999;">
              <p>Need help? Contact us at <a href="mailto:support@example.com">support@example.com</a></p>
              <p style="font-size: 12px;">Thank you for shopping with us!</p>
            </div>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: "Order placed successfully (COD)",
      orderid: uniqueOrderId,
    });

  } catch (error) {
    console.error("Error in placeOrderCOD:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};





// Place order using Razorpay
// const placeOrderRazorpay = async (req, res) => {
//   try {
//     const { userId, items, amount, address, couponCode, discount } = req.body;

//     // Step 1: Save order to DB with placeholder Razorpay orderid
//     const newOrder = new orderModel({
//       orderid: "", // will update this after Razorpay order is created
//       userId,
//       items,
//       amount,
//       address,
//       paymentMethod: "Razorpay",
//       payment: false,
//       date: Date.now(),
//       couponCode,
//       discount,
//     });
//     await newOrder.save();

//     // Step 2: Create Razorpay order using newOrder._id as receipt
//     const options = {
//       amount: (amount - (discount || 0)) * 100,
//       currency: "INR",
//       receipt: newOrder._id.toString(), // ✅ this connects payment with DB
//     };

//     razorpayInstance.orders.create(options, async (error, razorpayOrder) => {
//       if (error) {
//         console.error("Razorpay error:", error);
//         return res.status(500).json({ success: false, message: "Razorpay order creation failed" });
//       }

//       // Step 3: Update order with Razorpay order ID
//       newOrder.orderid = razorpayOrder.id;
//       await newOrder.save();

//       res.json({ success: true, order: razorpayOrder });
//     });
//   } catch (error) {
//     console.error("Error in placeOrderRazorpay:", error);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };


// const placeOrderRazorpay = async (req, res) => {
//   try {
//     console.log("Received Razorpay Data:", req.body);

//     const { userId, items, amount, address, couponCode, discount, phone } = req.body;

//     if (!items || items.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "No items provided in the order",
//       });
//     }

//     // Find user with referral data using phone number
//     const user = await VerifiedNumberModel.findOne({ number: phone }).populate("referredBy");

//     // Get referral configuration from database
//     let config = await ReferralConfig.findOne();

//     // If no config exists, create default one
//     if (!config) {
//       config = new ReferralConfig({
//         userDiscountPercent: 5,
//         referrerCommissionPercent: 5,
//         adminCommissionPercent: 10
//       });
//       await config.save();
//       console.log("✅ Created default referral config for Razorpay");
//     }

//     console.log("🔧 Razorpay Referral Config:", config);
//     console.log("👤 Razorpay User:", user ? {
//       number: user.number,
//       referredBy: user.referredBy ? user.referredBy._id : null,
//       referralCode: user.referralCode
//     } : "User not found");

//     let referralDiscount = 0;
//     let commission = 0;
//     let referredBy = null;

//     // Apply referral benefits if user was referred by someone
//     if (user && user.referredBy && !user.usedReferral) {
//       referredBy = user.referredBy._id;

//       referralDiscount = (amount * config.userDiscountPercent) / 100;
//       commission = (amount * config.referrerCommissionPercent) / 100;

//       console.log(`💰 Razorpay Calculating commission: ${amount} * ${config.referrerCommissionPercent}% = ${commission}`);
//       console.log(`🎁 Razorpay Calculating discount: ${amount} * ${config.userDiscountPercent}% = ${referralDiscount}`);

//       // ✅ Mark referral as used
//       await VerifiedNumberModel.findByIdAndUpdate(user._id, { usedReferral: true });
//       console.log(`✅ Referral applied (first time) and marked used for ${user.number}`);
//     }
//     else if (user && user.usedReferral) {
//       console.log("⚠️ Razorpay: User already used referral before — no discount applied.");
//     }
//     else {
//       console.log("ℹ️ No referral applied for Razorpay - user was not referred by anyone");
//     }


//     // Calculate final amount after all discounts
//     const totalReferralDeduction = referralDiscount + commission;
//     const finalAmount = Math.max(0, amount - discount - totalReferralDeduction);

//     console.log(`🧮 Razorpay Final amount calculation:
//   Original: ₹${amount}
//   Coupon Discount: -₹${discount || 0}
//   Referral Discount (${config.userDiscountPercent}%): -₹${referralDiscount}
//   Referrer Commission (${config.referrerCommissionPercent}%): -₹${commission}
//   Final Amount (Payable): ₹${finalAmount}
// `);

//     // Create order data with referral information (payment will be updated after verification)
//     // In placeOrderRazorpay controller, ensure this part is correct:
//     const orderData = {
//       orderid: "", // will update after Razorpay order creation
//       userId,
//       items,
//       amount: finalAmount,
//       originalAmount: amount,
//       address,
//       status: 'Pending Payment',
//       paymentMethod: "Razorpay",
//       payment: false,
//       date: Date.now(),
//       couponCode: couponCode || '',
//       discount: discount || 0,
//       referralDiscount: referralDiscount,
//       commissionEarned: commission,
//       referredBy: referredBy,
//       referralConfigUsed: config ? { // Make sure this is properly saved
//         userDiscountPercent: config.userDiscountPercent,
//         referrerCommissionPercent: config.referrerCommissionPercent,
//         adminCommissionPercent: config.adminCommissionPercent
//       } : {
//         userDiscountPercent: 10, // Default values
//         referrerCommissionPercent: 10,
//         adminCommissionPercent: 10
//       }
//     };

//     const newOrder = new orderModel(orderData);
//     await newOrder.save();

//     console.log(`✅ Razorpay Order saved with ID: ${newOrder._id}`);

//     // Create Razorpay order using final amount
//     const options = {
//       amount: Math.round(finalAmount * 100), // Convert to paise
//       currency: "INR",
//       receipt: newOrder._id.toString(),
//     };

//     razorpayInstance.orders.create(options, async (error, razorpayOrder) => {
//       if (error) {
//         console.error("Razorpay error:", error);

//         // Delete the order if Razorpay creation fails
//         await orderModel.findByIdAndDelete(newOrder._id);

//         return res.status(500).json({
//           success: false,
//           message: "Razorpay order creation failed",
//           error: error.message
//         });
//       }

//       // Update order with Razorpay order ID
//       newOrder.orderid = razorpayOrder.id;
//       await newOrder.save();

//       console.log(`✅ Razorpay order created: ${razorpayOrder.id}`);

//       res.json({
//         success: true,
//         order: razorpayOrder,
//         referralInfo: {
//           hasReferral: !!(user && user.referredBy),
//           referralDiscount: referralDiscount,
//           commission: commission,
//           finalAmount: finalAmount,
//           originalAmount: amount,
//           discountApplied: discount || 0
//         }
//       });
//     });

//   } catch (error) {
//     console.error("❌ Error in placeOrderRazorpay:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server Error in Razorpay order placement",
//       error: error.message
//     });
//   }
// };




// const placeOrderRazorpay = async (req, res) => {
//   try {
//     console.log("Received Razorpay Data:", req.body);

//     const { userId, items, amount, address, couponCode, discount, phone, couponReferralInfo } = req.body;

//     if (!items || items.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "No items provided in the order",
//       });
//     }

//     // Find user with referral data using phone number
//     const user = await VerifiedNumberModel.findOne({ number: phone }).populate("referredBy");

//     // Get referral configuration from database
//     let config = await ReferralConfig.findOne();

//     // If no config exists, create default one
//     if (!config) {
//       config = new ReferralConfig({
//         userDiscountPercent: 5,
//         referrerCommissionPercent: 5,
//         adminCommissionPercent: 10,
//         maxCouponDiscountPercent: 15,
//         maxCouponCommissionPercent: 10
//       });
//       await config.save();
//       console.log("✅ Created default referral config for Razorpay");
//     }

//     console.log("🔧 Razorpay Referral Config:", config);
//     console.log("👤 Razorpay User:", user ? {
//       number: user.number,
//       referredBy: user.referredBy ? user.referredBy._id : null,
//       referralCode: user.referralCode
//     } : "User not found");

//     let referralDiscount = 0;
//     let commission = 0;
//     let referredBy = null;
//     let couponCommission = 0;
//     let couponOwnerId = null;

//     // 🔥 NEW: Handle Coupon Referral (same as COD)
//     if (couponReferralInfo && couponReferralInfo.couponOwnerId) {
//       couponOwnerId = couponReferralInfo.couponOwnerId;
//       couponCommission = couponReferralInfo.commission || 0;

//       // Update coupon owner's commission
//       const updatedCouponOwner = await VerifiedNumberModel.findByIdAndUpdate(
//         couponOwnerId,
//         {
//           $inc: {
//             totalCommissionEarned: Math.floor(couponCommission),
//             totalReferral: 1
//           }
//         },
//         { new: true }
//       );

//       console.log(`💰 Coupon commission added to ${updatedCouponOwner.number}: ₹${couponCommission}`);
//     }

//     // ✅ Existing: Handle Direct Referral (only if not already used)
//     if (user && user.referredBy && !user.usedReferral) {
//       referredBy = user.referredBy._id;

//       // Calculate discount for the referred user
//       referralDiscount = (amount * config.userDiscountPercent) / 100;

//       // Calculate commission for the referrer
//       commission = (amount * config.referrerCommissionPercent) / 100;

//       console.log(`💰 Razorpay Calculating commission: ${amount} * ${config.referrerCommissionPercent}% = ${commission}`);
//       console.log(`🎁 Razorpay Calculating discount: ${amount} * ${config.userDiscountPercent}% = ${referralDiscount}`);

//       // ✅ Mark referral as used
//       await VerifiedNumberModel.findByIdAndUpdate(user._id, { usedReferral: true });
//       console.log(`✅ Referral applied (first time) and marked used for ${user.number}`);
//     }
//     else if (user && user.usedReferral) {
//       console.log("⚠️ Razorpay: User already used referral before — no discount applied.");
//     }
//     else {
//       console.log("ℹ️ No referral applied for Razorpay - user was not referred by anyone");
//     }

//     // Calculate final amount after all discounts
//     const totalDeductions = discount + referralDiscount;
//     const finalAmount = Math.max(0, amount - totalDeductions);

//     console.log(`🧮 Razorpay Final amount calculation:
//   Original: ₹${amount}
//   Coupon Discount: -₹${discount || 0}
//   Referral Discount (${config.userDiscountPercent}%): -₹${referralDiscount}
//   Final Amount (Payable): ₹${finalAmount}
//   Commission to Referrer: ₹${commission}
//   Commission to Coupon Owner: ₹${couponCommission}
// `);

//     // Create order data with referral information (payment will be updated after verification)
//     const orderData = {
//       orderid: "", // will update after Razorpay order creation
//       userId,
//       items,
//       amount: finalAmount,
//       originalAmount: amount,
//       address,
//       status: 'Pending Payment',
//       paymentMethod: "Razorpay",
//       payment: false,
//       date: Date.now(),
//       couponCode: couponCode || '',
//       discount: discount || 0,
//       referralDiscount: referralDiscount,
//       commissionEarned: commission,
//       referredBy: referredBy,
//       // NEW: Coupon referral fields
//       couponReferral: couponOwnerId ? {
//         couponOwner: couponOwnerId,
//         couponCode: couponReferralInfo?.personalCouponCode,
//         commissionEarned: couponCommission,
//         discountPercent: couponReferralInfo?.discountPercent
//       } : null,
//       referralConfigUsed: {
//         userDiscountPercent: config.userDiscountPercent,
//         referrerCommissionPercent: config.referrerCommissionPercent,
//         adminCommissionPercent: config.adminCommissionPercent,
//         couponDiscountPercent: couponReferralInfo?.discountPercent,
//         couponCommissionPercent: config.couponCommissionPercent
//       }
//     };

//     const newOrder = new orderModel(orderData);
//     await newOrder.save();

//     console.log(`✅ Razorpay Order saved with ID: ${newOrder._id}`);

//     // Create Razorpay order using final amount
//     const options = {
//       amount: Math.round(finalAmount * 100), // Convert to paise
//       currency: "INR",
//       receipt: newOrder._id.toString(),
//     };

//     razorpayInstance.orders.create(options, async (error, razorpayOrder) => {
//       if (error) {
//         console.error("Razorpay error:", error);

//         // Delete the order if Razorpay creation fails
//         await orderModel.findByIdAndDelete(newOrder._id);

//         return res.status(500).json({
//           success: false,
//           message: "Razorpay order creation failed",
//           error: error.message
//         });
//       }

//       // Update order with Razorpay order ID
//       newOrder.orderid = razorpayOrder.id;
//       await newOrder.save();

//       console.log(`✅ Razorpay order created: ${razorpayOrder.id}`);

//       res.json({
//         success: true,
//         order: razorpayOrder,
//         referralInfo: {
//           hasReferral: !!(user && user.referredBy),
//           referralDiscount: referralDiscount,
//           commission: commission,
//           finalAmount: finalAmount,
//           originalAmount: amount,
//           discountApplied: discount || 0,
//           // NEW: Add coupon referral info to response
//           couponReferral: couponOwnerId ? {
//             applied: true,
//             couponOwner: couponOwnerId,
//             commission: couponCommission,
//             discountPercent: couponReferralInfo?.discountPercent
//           } : { applied: false }
//         }
//       });
//     });

//   } catch (error) {
//     console.error("❌ Error in placeOrderRazorpay:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server Error in Razorpay order placement",
//       error: error.message
//     });
//   }
// };


const placeOrderRazorpay = async (req, res) => {
  try {
    console.log("Received Razorpay Data:", req.body);

    const userid = req.user.id;
    const userPhone = req.user.number;

    const { userId, items, amount, address, couponCode, discount, phone, couponReferralInfo } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No items provided in the order",
      });
    }

    // Find user with referral data using phone number
    const user = await VerifiedNumberModel.findOne({ number: userPhone }).populate("referredBy");

    // Get referral configuration from database
    let config = await ReferralConfig.findOne();

    if (!config) {
      config = new ReferralConfig({
        userDiscountPercent: 10,
        referrerCommissionPercent: 10,
        adminCommissionPercent: 10,
        couponDiscountPercent: 10,
        couponCommissionPercent: 10,
        maxDirectDiscountPercent: 20,
        maxCouponDiscountPercent: 15,
        maxTotalDiscountPercent: 30
      });
      await config.save();
    }

    console.log("🔧 Razorpay Referral Config:", config);
    console.log("👤 Razorpay User:", user ? {
      number: user.number,
      referredBy: user.referredBy ? user.referredBy._id : null,
      usedReferral: user.usedReferral
    } : "User not found");

    let referralDiscount = 0;
    let commission = 0;
    let referredBy = null;
    let couponCommission = 0;
    let couponOwnerId = null;
    let couponDiscount = discount || 0;

    let shouldMarkReferralUsed = false;

    // 🔥 Handle Coupon Referral (ONLY if usedReferral is false)
    // placeOrderCOD me coupon referral section:
    if (couponReferralInfo && couponReferralInfo.couponOwnerId) {
      if (user && user.usedReferral) {
        // User already used referral - NO coupon benefits
        console.log(`⛔ Coupon referral BLOCKED - User already used referral`);
        couponDiscount = 0;
        couponCommission = 0;
      } else {
        // User hasn't used referral - Give coupon benefits
        couponOwnerId = couponReferralInfo.couponOwnerId;
        couponCommission = (amount * config.couponCommissionPercent) / 100;

        if (!couponDiscount && couponReferralInfo.discountPercent) {
          couponDiscount = (amount * Math.min(couponReferralInfo.discountPercent, config.maxCouponDiscountPercent)) / 100;
        }

        shouldMarkReferralUsed = true; // Mark referral as used for coupon too
        console.log(`🎫 Coupon referral applied`);
      }
    }

    // Direct referral section (same):
    if (user && user.referredBy && !user.usedReferral) {
      referredBy = user.referredBy._id;
      referralDiscount = (amount * config.userDiscountPercent) / 100;
      commission = (amount * config.referrerCommissionPercent) / 100;
      shouldMarkReferralUsed = true;
    }

    // ✅ Handle Direct Referral (ONLY if not already used)
    if (user && user.referredBy && !user.usedReferral) {
      referredBy = user.referredBy._id;
      referralDiscount = (amount * config.userDiscountPercent) / 100;
      commission = (amount * config.referrerCommissionPercent) / 100;
      shouldMarkReferralUsed = true;

      console.log(`👥 Direct referral applied: Discount ₹${referralDiscount}, Commission ₹${commission}`);
    }
    else if (user && user.usedReferral) {
      console.log("⚠️ User already used referral - no direct benefits");
    }

    // Apply maximum discount limits
    const maxAllowedDiscount = (amount * config.maxTotalDiscountPercent) / 100;
    const totalCalculatedDiscount = couponDiscount + referralDiscount;

    let finalDiscount = totalCalculatedDiscount;
    if (totalCalculatedDiscount > maxAllowedDiscount) {
      console.log(`⚠️ Total discount capped at ${config.maxTotalDiscountPercent}%`);
      finalDiscount = maxAllowedDiscount;
    }

    // Calculate final amount
    const finalAmount = Math.max(0, amount - finalDiscount);

    console.log(`🧮 Final Calculation:
  Original: ₹${amount}
  Coupon Discount: -₹${couponDiscount} ${couponOwnerId ? '(APPLIED)' : '(BLOCKED - USED REFERRAL)'}
  Direct Referral Discount: -₹${referralDiscount} ${referralDiscount > 0 ? '(APPLIED)' : '(BLOCKED - USED REFERRAL)'}
  Total Discount: -₹${finalDiscount}
  Final Amount: ₹${finalAmount}
  Direct Commission: ₹${commission}
  Coupon Commission: ₹${couponCommission}
  Mark Referral as Used: ${shouldMarkReferralUsed}
`);

    // Generate order ID
    const uniqueOrderId = `RZP-${Date.now()}-${crypto.randomBytes(3).toString("hex")}`;

    // Create order data
    const orderData = {
      orderid: uniqueOrderId,
      userId,
      items,
      amount: finalAmount,
      originalAmount: amount,
      address,
      status: 'Pending Payment',
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
      couponCode: couponCode || '',
      discount: couponDiscount,
      referralDiscount: referralDiscount,
      totalDiscount: finalDiscount,
      commissionEarned: commission,
      referredBy: referredBy,
      couponReferral: couponOwnerId ? {
        couponOwner: couponOwnerId,
        couponCode: couponReferralInfo?.personalCouponCode,
        commissionEarned: couponCommission,
        discountPercent: couponReferralInfo?.discountPercent,
        appliedDiscount: couponDiscount,
        shouldProcess: !!couponOwnerId
      } : null,
      referralConfigUsed: config,
      markedReferralUsed: shouldMarkReferralUsed,
      shouldProcessReferrals: shouldMarkReferralUsed
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    console.log(`✅ Razorpay Order saved: ${newOrder._id}`);

    // Create Razorpay order
    const options = {
      amount: Math.round(finalAmount * 100),
      currency: "INR",
      receipt: newOrder._id.toString(),
    };

    razorpayInstance.orders.create(options, async (error, razorpayOrder) => {
      if (error) {
        console.error("Razorpay error:", error);
        await orderModel.findByIdAndDelete(newOrder._id);
        return res.status(500).json({
          success: false,
          message: "Razorpay order creation failed",
          error: error.message
        });
      }

      newOrder.orderid = razorpayOrder.id;
      await newOrder.save();

      console.log(`✅ Razorpay order created: ${razorpayOrder.id}`);

      res.json({
        success: true,
        order: razorpayOrder,
        referralInfo: {
          hasDirectReferral: !!(user && user.referredBy),
          directReferralApplied: referralDiscount > 0,
          referralDiscount: referralDiscount,
          commission: commission,
          finalAmount: finalAmount,
          originalAmount: amount,
          couponDiscountApplied: couponDiscount,
          markedReferralUsed: shouldMarkReferralUsed,
          couponReferral: couponOwnerId ? {
            applied: true,
            shouldProcess: !!couponOwnerId,
            couponOwner: couponOwnerId,
            commission: couponCommission,
            discount: couponDiscount
          } : {
            applied: false,
            reason: user?.usedReferral ? "REFERRAL_ALREADY_USED" : "NO_COUPON"
          },
          referralStatus: user?.usedReferral ? "ALREADY_USED" : "ELIGIBLE"
        }
      });
    });

  } catch (error) {
    console.error("❌ Error in placeOrderRazorpay:", error);
    res.status(500).json({
      success: false,
      message: "Server Error in Razorpay order placement",
      error: error.message
    });
  }
};

const placeOrderRazorpaysuccess = async (req, res) => {
  try {
    const { items, amount, address, couponCode, discount } = req.body;

    // Step 1: Save order to DB with placeholder Razorpay orderid
    const newOrder = new orderModels({
      orderid: "", // will update this after Razorpay order is created
      items,
      amount,
      address,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
      couponCode,
      discount,
    });
    await newOrder.save();

    console.log("New Order Saved:", newOrder);
    console.log("Items:", items);

    // Step 2: Create Razorpay order using newOrder._id as receipt
    const options = {
      amount: (amount - (discount || 0)) * 100,
      currency: "INR",
      receipt: newOrder._id.toString(), // ✅ this connects payment with DB
    };

    razorpayInstance.orders.create(options, async (error, razorpayOrder) => {
      if (error) {
        console.error("Razorpay error:", error);
        return res.status(500).json({ success: false, message: "Razorpay order creation failed" });
      }

      console.log("Razorpay Order Created:", razorpayOrder);


      // Step 3: Update order with Razorpay order ID
      newOrder.orderid = razorpayOrder.id;
      await newOrder.save();

      res.json({ success: true, order: razorpayOrder });
    });
  } catch (error) {
    console.error("Error in placeOrderRazorpay:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message, });
  }
};


const verifyRazorpaysuccess = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status === "paid") {
      const dbOrderId = orderInfo.receipt;
      const updatedOrder = await orderModels.findByIdAndUpdate(
        dbOrderId,
        { payment: true },
        { new: true }
      );

      if (!updatedOrder) {
        return res.status(404).json({ success: false, message: "Order not found" });
      }

      // Setup nodemailer
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "shubshukla2332@gmail.com",     // use environment variable in real app
          pass: "nbnv efod azbm dpwz",       // use App Password (not Gmail login)
        },
      });

      const itemsHTML = updatedOrder.items
        .map(
          (item) => `
            <tr>
              <td style="padding: 10px; border: 1px solid #ccc;">
                <img src="${item.image}" alt="${item.name}" width="60" style="border-radius: 6px;">
              </td>
              <td style="padding: 10px; border: 1px solid #ccc;">
               ${item.name} <br>
               ${item.variant ? `<span style="font-size: 12px; color: #888;">Size : ${item.variant}</span>` : ''}
             </td>
              <td style="padding: 10px; border: 1px solid #ccc;">
                ₹${item.price}
              </td>
            </tr>
          `
        )
        .join("");

      const mailOptions = {
        from: "shubshukla2332@gmail.com",
        to: updatedOrder.address.email,
        subject: "🧾 Order Confirmation - Your Order with Us is Confirmed!",
        html: `
          <div style="font-family: 'Segoe UI', sans-serif; padding: 20px; background: #f6f9fc;">
            <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 0 10px #ccc;">
              <div style="padding: 20px; border-bottom: 1px solid #eee;">
                <h2 style="margin-bottom: 5px;">Thank you for your purchase, ${updatedOrder.address.firstName}!</h2>
                <p style="color: #555;">Your order has been confirmed and payment was successful.</p>
              </div>

              <div style="padding: 20px;">
                <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Order Summary</h3>
                <p><strong>Order ID:</strong> ${updatedOrder.orderid}</p>
                <p><strong>Amount Paid:</strong> ₹${updatedOrder.amount}</p>
                <p><strong>Payment Method:</strong> ${updatedOrder.paymentMethod}</p>
                <p><strong>Payment Status:</strong> Paid</p>
                <p><strong>Order Date:</strong> ${new Date(updatedOrder.date).toLocaleString()}</p>
              </div>

              <div style="padding: 20px;">
                <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Shipping Details</h3>
                <p>
                  ${updatedOrder.address.firstName} ${updatedOrder.address.lastName}<br>
                  ${updatedOrder.address.street}<br>
                  ${updatedOrder.address.city}, ${updatedOrder.address.state}<br>
                  ${updatedOrder.address.country} - ${updatedOrder.address.zipcode}
                </p>
              </div>

              <div style="padding: 20px;">
                <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Items Ordered</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background: #f0f0f0;">
                      <th style="padding: 10px; border: 1px solid #ccc;">Image</th>
                      <th style="padding: 10px; border: 1px solid #ccc;">Item</th>
                      <th style="padding: 10px; border: 1px solid #ccc;">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemsHTML}
                  </tbody>
                </table>
              </div>

              <div style="padding: 20px; text-align: center; color: #999;">
                <p>Need help? Contact us at <a href="mailto:support@example.com">support@example.com</a></p>
                <p style="font-size: 12px;">Thank you for shopping with us!</p>
              </div>
            </div>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);

      return res.json({ success: true, message: "Payment Successful & Email Sent" });
    } else {
      return res.json({ success: false, message: "Payment Not Yet Completed" });
    }
  } catch (error) {
    console.error("Error verifying Razorpay payment:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Verify Razorpay Payment
// const verifyRazorpay = async (req, res) => {
//   try {
//     const { razorpay_order_id } = req.body;
//     const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

//     if (orderInfo.status === "paid") {
//       const dbOrderId = orderInfo.receipt;
//       const updatedOrder = await orderModel.findByIdAndUpdate(
//         dbOrderId,
//         { payment: true },
//         { new: true }
//       );

//       if (!updatedOrder) {
//         return res.status(404).json({ success: false, message: "Order not found" });
//       }

//       // Setup nodemailer
//       const transporter = nodemailer.createTransport({
//         service: "Gmail",
//         auth: {
//           user: "shubshukla2332@gmail.com",     // use environment variable in real app
//           pass: "nbnv efod azbm dpwz",       // use App Password (not Gmail login)
//         },
//       });

//       const itemsHTML = updatedOrder.items
//         .map(
//           (item) => `
//             <tr>
//               <td style="padding: 10px; border: 1px solid #ccc;">
//                 <img src="${item.image}" alt="${item.name}" width="60" style="border-radius: 6px;">
//               </td>
//               <td style="padding: 10px; border: 1px solid #ccc;">
//                ${item.name} <br>
//                ${item.variant ? `<span style="font-size: 12px; color: #888;">Size : ${item.variant}</span>` : ''}
//              </td>
//               <td style="padding: 10px; border: 1px solid #ccc;">
//                 ₹${item.price}
//               </td>
//             </tr>
//           `
//         )
//         .join("");

//       const mailOptions = {
//         from: "shubshukla2332@gmail.com",
//         to: updatedOrder.address.email,
//         subject: "🧾 Order Confirmation - Your Order with Us is Confirmed!",
//         html: `
//           <div style="font-family: 'Segoe UI', sans-serif; padding: 20px; background: #f6f9fc;">
//             <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 0 10px #ccc;">
//               <div style="padding: 20px; border-bottom: 1px solid #eee;">
//                 <h2 style="margin-bottom: 5px;">Thank you for your purchase, ${updatedOrder.address.firstName}!</h2>
//                 <p style="color: #555;">Your order has been confirmed and payment was successful.</p>
//               </div>

//               <div style="padding: 20px;">
//                 <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Order Summary</h3>
//                 <p><strong>Order ID:</strong> ${updatedOrder.orderid}</p>
//                 <p><strong>Amount Paid:</strong> ₹${updatedOrder.amount}</p>
//                 <p><strong>Payment Method:</strong> ${updatedOrder.paymentMethod}</p>
//                 <p><strong>Payment Status:</strong> Paid</p>
//                 <p><strong>Order Date:</strong> ${new Date(updatedOrder.date).toLocaleString()}</p>
//               </div>

//               <div style="padding: 20px;">
//                 <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Shipping Details</h3>
//                 <p>
//                   ${updatedOrder.address.firstName} ${updatedOrder.address.lastName}<br>
//                   ${updatedOrder.address.street}<br>
//                   ${updatedOrder.address.city}, ${updatedOrder.address.state}<br>
//                   ${updatedOrder.address.country} - ${updatedOrder.address.zipcode}
//                 </p>
//               </div>

//               <div style="padding: 20px;">
//                 <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Items Ordered</h3>
//                 <table style="width: 100%; border-collapse: collapse;">
//                   <thead>
//                     <tr style="background: #f0f0f0;">
//                       <th style="padding: 10px; border: 1px solid #ccc;">Image</th>
//                       <th style="padding: 10px; border: 1px solid #ccc;">Item</th>
//                       <th style="padding: 10px; border: 1px solid #ccc;">Price</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     ${itemsHTML}
//                   </tbody>
//                 </table>
//               </div>

//               <div style="padding: 20px; text-align: center; color: #999;">
//                 <p>Need help? Contact us at <a href="mailto:support@example.com">support@example.com</a></p>
//                 <p style="font-size: 12px;">Thank you for shopping with us!</p>
//               </div>
//             </div>
//           </div>
//         `,
//       };

//       await transporter.sendMail(mailOptions);

//       return res.json({ success: true, message: "Payment Successful & Email Sent" });
//     } else {
//       return res.json({ success: false, message: "Payment Not Yet Completed" });
//     }
//   } catch (error) {
//     console.error("Error verifying Razorpay payment:", error);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };



// const verifyRazorpay = async (req, res) => {
//   try {
//     const { razorpay_order_id } = req.body;
//     const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

//     if (orderInfo.status === "paid") {
//       const dbOrderId = orderInfo.receipt;

//       // Find the order first to check referral data
//       const order = await orderModel.findById(dbOrderId);

//       if (!order) {
//         return res.status(404).json({ success: false, message: "Order not found" });
//       }

//       // Update referrer's commission if referral exists
//       if (order.referredBy && order.commissionEarned > 0) {
//         const updatedReferrer = await VerifiedNumberModel.findByIdAndUpdate(
//           order.referredBy,
//           {
//             $inc: {
//               totalCommissionEarned: Math.floor(order.commissionEarned),
//               totalReferral: 1
//             }
//           },
//           { new: true }
//         );

//         console.log(`✅ Referral commission applied after Razorpay payment:
//           - Referrer earned ₹${order.commissionEarned} commission
//           - Updated referrer balance: ₹${updatedReferrer.totalCommissionEarned}
//         `);
//       }

//       // Update order payment status
//       const updatedOrder = await orderModel.findByIdAndUpdate(
//         dbOrderId,
//         {
//           payment: true,
//           status: 'Order Placed'
//         },
//         { new: true }
//       );

//       // Clear user's cart after successful order
//       if (updatedOrder.userId) {
//         await userModel.findByIdAndUpdate(updatedOrder.userId, { cartData: {} });
//         console.log("🛒 User cart cleared after Razorpay payment");
//       }

//       // Send email confirmation
//       try {
//         const transporter = nodemailer.createTransport({
//           service: "Gmail",
//           auth: {
//             user: "shubshukla2332@gmail.com",
//             pass: "nbnv efod azbm dpwz",
//           },
//         });

//         const itemsHTML = updatedOrder.items
//           .map(
//             (item) => `
//               <tr>
//                 <td style="padding: 10px; border: 1px solid #ccc;">
//                   <img src="${item.image}" alt="${item.name}" width="60" style="border-radius: 6px;">
//                 </td>
//                 <td style="padding: 10px; border: 1px solid #ccc;">
//                  ${item.name} <br>
//                  ${item.variant ? `<span style="font-size: 12px; color: #888;">Size : ${item.variant}</span>` : ''}
//                </td>
//                 <td style="padding: 10px; border: 1px solid #ccc;">
//                   ₹${item.price} x ${item.quantity}
//                 </td>
//               </tr>
//             `
//           )
//           .join("");

//         // Safe referral section - handle cases where referralConfigUsed might be undefined
//         const referralDiscount = updatedOrder.referralDiscount || 0;
//         const userDiscountPercent = updatedOrder.referralConfigUsed?.userDiscountPercent || 10; // Default to 10% if undefined
//         // const commissionEarned = updatedOrder.commissionEarned || 0;

//         const referralSection = referralDiscount > 0 ? `
//           <div style="padding: 20px;">
//             <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Referral Benefits</h3>
//             <p><strong>Referral Discount (${userDiscountPercent}%):</strong> -₹${referralDiscount}</p>
//             <p style="color: green; font-weight: bold;">🎉 You saved ₹${referralDiscount} using referral!</p>

//           </div>
//         ` : '';

//         // Safe amount calculations
//         const originalAmount = updatedOrder.originalAmount || updatedOrder.amount + referralDiscount + (updatedOrder.discount || 0);
//         const finalAmount = updatedOrder.amount;
//         const couponDiscount = updatedOrder.discount || 0;

//         const mailOptions = {
//           from: "shubshukla2332@gmail.com",
//           to: updatedOrder.address.email,
//           subject: "🧾 Order Confirmation - Payment Successful!",
//           html: `
//             <div style="font-family: 'Segoe UI', sans-serif; padding: 20px; background: #f6f9fc;">
//               <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 0 10px #ccc;">
//                 <div style="padding: 20px; border-bottom: 1px solid #eee;">
//                   <h2 style="margin-bottom: 5px;">Thank you for your purchase, ${updatedOrder.address.firstName}!</h2>
//                   <p style="color: #555;">Your payment was successful and order has been confirmed.</p>
//                 </div>

//                 <div style="padding: 20px;">
//                   <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Order Summary</h3>
//                   <p><strong>Order ID:</strong> ${updatedOrder.orderid}</p>
//                   <p><strong>Original Amount:</strong> ₹${originalAmount}</p>
//                   ${couponDiscount > 0 ? `<p><strong>Coupon Discount:</strong> -₹${couponDiscount}</p>` : ''}
//                   ${referralDiscount > 0 ? `<p><strong>Referral Discount (${userDiscountPercent}%):</strong> -₹${referralDiscount}</p>` : ''}
//                   <p><strong>Final Amount Paid:</strong> ₹${finalAmount}</p>
//                   <p><strong>Payment Method:</strong> ${updatedOrder.paymentMethod}</p>
//                   <p><strong>Payment Status:</strong> Paid</p>
//                   <p><strong>Order Date:</strong> ${new Date(updatedOrder.date).toLocaleString()}</p>
//                 </div>

//                 ${referralSection}

//                 <div style="padding: 20px;">
//                   <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Shipping Details</h3>
//                   <p>
//                     ${updatedOrder.address.firstName} ${updatedOrder.address.lastName}<br>
//                     ${updatedOrder.address.street}<br>
//                     ${updatedOrder.address.city}, ${updatedOrder.address.state}<br>
//                     ${updatedOrder.address.country} - ${updatedOrder.address.zipcode}<br>
//                     Phone: ${updatedOrder.address.phone}
//                   </p>
//                 </div>

//                 <div style="padding: 20px;">
//                   <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Items Ordered</h3>
//                   <table style="width: 100%; border-collapse: collapse;">
//                     <thead>
//                       <tr style="background: #f0f0f0;">
//                         <th style="padding: 10px; border: 1px solid #ccc;">Image</th>
//                         <th style="padding: 10px; border: 1px solid #ccc;">Item</th>
//                         <th style="padding: 10px; border: 1px solid #ccc;">Price</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       ${itemsHTML}
//                     </tbody>
//                   </table>
//                 </div>

//                 <div style="padding: 20px; text-align: center; color: #999;">
//                   <p>Need help? Contact us at <a href="mailto:support@example.com">support@example.com</a></p>
//                   <p style="font-size: 12px;">Thank you for shopping with us!</p>
//                 </div>
//               </div>
//             </div>
//           `,
//         };

//         await transporter.sendMail(mailOptions);
//         console.log("📧 Razorpay order confirmation email sent");
//       } catch (emailError) {
//         console.error("Razorpay Email sending error:", emailError);
//         // Don't fail the order if email fails
//       }

//       return res.json({
//         success: true,
//         message: "Payment Successful & Email Sent",
//         referralApplied: !!(order.referredBy),
//         referralDiscount: order.referralDiscount || 0,
//         commissionEarned: order.commissionEarned || 0
//       });
//     } else {
//       return res.json({ success: false, message: "Payment Not Yet Completed" });
//     }
//   } catch (error) {
//     console.error("Error verifying Razorpay payment:", error);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };



// const verifyRazorpay = async (req, res) => {
//   try {
//     const { razorpay_order_id } = req.body;
//     const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

//     if (orderInfo.status === "paid") {
//       const dbOrderId = orderInfo.receipt;

//       // Find the order first to check referral data
//       const order = await orderModel.findById(dbOrderId);

//       if (!order) {
//         return res.status(404).json({ success: false, message: "Order not found" });
//       }

//       // Update referrer's commission if direct referral exists
//       if (order.referredBy && order.commissionEarned > 0) {
//         const updatedReferrer = await VerifiedNumberModel.findByIdAndUpdate(
//           order.referredBy,
//           {
//             $inc: {
//               totalCommissionEarned: Math.floor(order.commissionEarned),
//               totalReferral: 1
//             }
//           },
//           { new: true }
//         );

//         console.log(`✅ Direct referral commission applied after Razorpay payment:
//           - Referrer earned ₹${order.commissionEarned} commission
//           - Updated referrer balance: ₹${updatedReferrer.totalCommissionEarned}
//         `);
//       }

//       // 🔥 NEW: Update coupon owner's commission if coupon referral exists
//       if (order.couponReferral && order.couponReferral.couponOwner && order.couponReferral.commissionEarned > 0) {
//         const updatedCouponOwner = await VerifiedNumberModel.findByIdAndUpdate(
//           order.couponReferral.couponOwner,
//           {
//             $inc: {
//               totalCommissionEarned: Math.floor(order.couponReferral.commissionEarned),
//               totalReferral: 1
//             }
//           },
//           { new: true }
//         );

//         console.log(`✅ Coupon referral commission applied after Razorpay payment:
//           - Coupon owner earned ₹${order.couponReferral.commissionEarned} commission
//           - Updated coupon owner balance: ₹${updatedCouponOwner.totalCommissionEarned}
//         `);
//       }

//       // Update order payment status
//       const updatedOrder = await orderModel.findByIdAndUpdate(
//         dbOrderId,
//         {
//           payment: true,
//           status: 'Order Placed'
//         },
//         { new: true }
//       );

//       // Clear user's cart after successful order
//       if (updatedOrder.userId) {
//         await userModel.findByIdAndUpdate(updatedOrder.userId, { cartData: {} });
//         console.log("🛒 User cart cleared after Razorpay payment");
//       }

//       // Send email confirmation (your existing email code remains the same)
//       try {
//         const transporter = nodemailer.createTransport({
//           service: "Gmail",
//           auth: {
//             user: "shubshukla2332@gmail.com",
//             pass: "nbnv efod azbm dpwz",
//           },
//         });

//         const itemsHTML = updatedOrder.items
//           .map(
//             (item) => `
//               <tr>
//                 <td style="padding: 10px; border: 1px solid #ccc;">
//                   <img src="${item.image}" alt="${item.name}" width="60" style="border-radius: 6px;">
//                 </td>
//                 <td style="padding: 10px; border: 1px solid #ccc;">
//                  ${item.name} <br>
//                  ${item.variant ? `<span style="font-size: 12px; color: #888;">Size : ${item.variant}</span>` : ''}
//                </td>
//                 <td style="padding: 10px; border: 1px solid #ccc;">
//                   ₹${item.price} x ${item.quantity}
//                 </td>
//               </tr>
//             `
//           )
//           .join("");

//         // Safe referral section - handle cases where referralConfigUsed might be undefined
//         const referralDiscount = updatedOrder.referralDiscount || 0;
//         const userDiscountPercent = updatedOrder.referralConfigUsed?.userDiscountPercent || 10;

//         // NEW: Coupon referral section
//         const couponDiscount = updatedOrder.discount || 0;
//         const couponDiscountPercent = updatedOrder.couponReferral?.discountPercent ||
//           updatedOrder.referralConfigUsed?.couponDiscountPercent;

//         const referralSection = referralDiscount > 0 ? `
//           <div style="padding: 20px;">
//             <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Referral Benefits</h3>
//             <p><strong>Referral Discount (${userDiscountPercent}%):</strong> -₹${referralDiscount}</p>
//             <p style="color: green; font-weight: bold;">🎉 You saved ₹${referralDiscount} using referral!</p>
//           </div>
//         ` : '';

//         // NEW: Coupon referral section
//         const couponReferralSection = (updatedOrder.couponReferral && couponDiscount > 0) ? `
//           <div style="padding: 20px;">
//             <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Coupon Benefits</h3>
//             <p><strong>Coupon Discount (${couponDiscountPercent}%):</strong> -₹${couponDiscount}</p>
//             <p style="color: blue; font-weight: bold;">🎫 You saved ₹${couponDiscount} using coupon!</p>
//           </div>
//         ` : '';

//         // Safe amount calculations
//         const originalAmount = updatedOrder.originalAmount || updatedOrder.amount + referralDiscount + couponDiscount;
//         const finalAmount = updatedOrder.amount;

//         const mailOptions = {
//           from: "shubshukla2332@gmail.com",
//           to: updatedOrder.address.email,
//           subject: "🧾 Order Confirmation - Payment Successful!",
//           html: `
//             <div style="font-family: 'Segoe UI', sans-serif; padding: 20px; background: #f6f9fc;">
//               <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 0 10px #ccc;">
//                 <div style="padding: 20px; border-bottom: 1px solid #eee;">
//                   <h2 style="margin-bottom: 5px;">Thank you for your purchase, ${updatedOrder.address.firstName}!</h2>
//                   <p style="color: #555;">Your payment was successful and order has been confirmed.</p>
//                 </div>

//                 <div style="padding: 20px;">
//                   <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Order Summary</h3>
//                   <p><strong>Order ID:</strong> ${updatedOrder.orderid}</p>
//                   <p><strong>Original Amount:</strong> ₹${originalAmount}</p>
//                   ${couponDiscount > 0 ? `<p><strong>Coupon Discount:</strong> -₹${couponDiscount}</p>` : ''}
//                   ${referralDiscount > 0 ? `<p><strong>Referral Discount (${userDiscountPercent}%):</strong> -₹${referralDiscount}</p>` : ''}
//                   <p><strong>Final Amount Paid:</strong> ₹${finalAmount}</p>
//                   <p><strong>Payment Method:</strong> ${updatedOrder.paymentMethod}</p>
//                   <p><strong>Payment Status:</strong> Paid</p>
//                   <p><strong>Order Date:</strong> ${new Date(updatedOrder.date).toLocaleString()}</p>
//                 </div>

//                 ${referralSection}
//                 ${couponReferralSection}

//                 <div style="padding: 20px;">
//                   <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Shipping Details</h3>
//                   <p>
//                     ${updatedOrder.address.firstName} ${updatedOrder.address.lastName}<br>
//                     ${updatedOrder.address.street}<br>
//                     ${updatedOrder.address.city}, ${updatedOrder.address.state}<br>
//                     ${updatedOrder.address.country} - ${updatedOrder.address.zipcode}<br>
//                     Phone: ${updatedOrder.address.phone}
//                   </p>
//                 </div>

//                 <div style="padding: 20px;">
//                   <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Items Ordered</h3>
//                   <table style="width: 100%; border-collapse: collapse;">
//                     <thead>
//                       <tr style="background: #f0f0f0;">
//                         <th style="padding: 10px; border: 1px solid #ccc;">Image</th>
//                         <th style="padding: 10px; border: 1px solid #ccc;">Item</th>
//                         <th style="padding: 10px; border: 1px solid #ccc;">Price</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       ${itemsHTML}
//                     </tbody>
//                   </table>
//                 </div>

//                 <div style="padding: 20px; text-align: center; color: #999;">
//                   <p>Need help? Contact us at <a href="mailto:support@example.com">support@example.com</a></p>
//                   <p style="font-size: 12px;">Thank you for shopping with us!</p>
//                 </div>
//               </div>
//             </div>
//           `,
//         };

//         await transporter.sendMail(mailOptions);
//         console.log("📧 Razorpay order confirmation email sent");
//       } catch (emailError) {
//         console.error("Razorpay Email sending error:", emailError);
//         // Don't fail the order if email fails
//       }

//       return res.json({
//         success: true,
//         message: "Payment Successful & Email Sent",
//         referralApplied: !!(order.referredBy),
//         referralDiscount: order.referralDiscount || 0,
//         commissionEarned: order.commissionEarned || 0,
//         // NEW: Add coupon referral info to verification response
//         couponReferralApplied: !!(order.couponReferral && order.couponReferral.couponOwner),
//         couponDiscount: order.discount || 0
//       });
//     } else {
//       return res.json({ success: false, message: "Payment Not Yet Completed" });
//     }
//   } catch (error) {
//     console.error("Error verifying Razorpay payment:", error);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };


const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status === "paid") {
      const dbOrderId = orderInfo.receipt;
      const order = await orderModel.findById(dbOrderId);

      if (!order) {
        return res.status(404).json({ success: false, message: "Order not found" });
      }

      // ✅ MARK REFERRAL AS USED (for both direct and coupon)
      if (order.markedReferralUsed) {
        const user = await VerifiedNumberModel.findOne({ number: order.address.phone });

        if (user && !user.usedReferral) {
          await VerifiedNumberModel.findByIdAndUpdate(user._id, { usedReferral: true });
          console.log(`✅ Referral marked as used for ${user.number} (direct/coupon)`);
        }
      }

      // ✅ PAY DIRECT REFERRAL COMMISSION
      if (order.referredBy && order.commissionEarned > 0) {
        const updatedReferrer = await VerifiedNumberModel.findByIdAndUpdate(
          order.referredBy,
          {
            $inc: {
              totalCommissionEarned: Math.floor(order.commissionEarned),
              totalReferral: 1
            }
          },
          { new: true }
        );

        console.log(`✅ Direct referral commission paid:
          Referrer: ${order.referredBy}
          Amount: ₹${order.commissionEarned}
        `);
      }

      // 🔥 PAY COUPON REFERRAL COMMISSION
      if (order.couponReferral &&
        order.couponReferral.couponOwner &&
        order.couponReferral.commissionEarned > 0) {

        const updatedCouponOwner = await VerifiedNumberModel.findByIdAndUpdate(
          order.couponReferral.couponOwner,
          {
            $inc: {
              totalCommissionEarned: Math.floor(order.couponReferral.commissionEarned),
              totalReferral: 1
            }
          },
          { new: true }
        );

        console.log(`✅ Coupon referral commission paid:
          Coupon Owner: ${order.couponReferral.couponOwner}
          Amount: ₹${order.couponReferral.commissionEarned}
        `);
      }

      // Update order payment status
      const updatedOrder = await orderModel.findByIdAndUpdate(
        dbOrderId,
        {
          payment: true,
          status: 'Order Placed'
        },
        { new: true }
      );

      // Clear user's cart
      if (updatedOrder.userId) {
        await userModel.findByIdAndUpdate(updatedOrder.userId, { cartData: {} });
        console.log("🛒 User cart cleared after payment");
      }

      // Send email confirmation
      try {
        const transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: "shubshukla2332@gmail.com",
            pass: "nbnv efod azbm dpwz",
          },
        });

        const itemsHTML = updatedOrder.items.map((item) => `
          <tr>
            <td style="padding: 10px; border: 1px solid #ccc;">
              <img src="${item.image}" alt="${item.name}" width="60" style="border-radius: 6px;">
            </td>
            <td style="padding: 10px; border: 1px solid #ccc;">
              ${item.name} <br>
              ${item.variant ? `<span style="font-size: 12px; color: #888;">Size : ${item.variant}</span>` : ''}
            </td>
            <td style="padding: 10px; border: 1px solid #ccc;">
              ₹${item.price} x ${item.quantity}
            </td>
          </tr>
        `).join("");

        const mailOptions = {
          from: "shubshukla2332@gmail.com",
          to: updatedOrder.address.email,
          subject: "🧾 Order Confirmation - Payment Successful!",
          html: `
            <div style="font-family: 'Segoe UI', sans-serif; padding: 20px; background: #f6f9fc;">
              <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 0 10px #ccc;">
                <div style="padding: 20px; border-bottom: 1px solid #eee;">
                  <h2 style="margin-bottom: 5px;">Thank you for your purchase, ${updatedOrder.address.firstName}!</h2>
                  <p style="color: #555;">Your payment was successful and order has been confirmed.</p>
                </div>

                <div style="padding: 20px;">
                  <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Order Summary</h3>
                  <p><strong>Order ID:</strong> ${updatedOrder.orderid}</p>
                  <p><strong>Original Amount:</strong> ₹${updatedOrder.originalAmount}</p>
                  ${updatedOrder.discount > 0 ? `<p><strong>Coupon Discount:</strong> -₹${updatedOrder.discount}</p>` : ''}
                  ${updatedOrder.referralDiscount > 0 ? `<p><strong>Referral Discount:</strong> -₹${updatedOrder.referralDiscount}</p>` : ''}
                  <p><strong>Total Discount:</strong> -₹${updatedOrder.totalDiscount}</p>
                  <p><strong>Final Amount Paid:</strong> ₹${updatedOrder.amount}</p>
                  <p><strong>Payment Method:</strong> ${updatedOrder.paymentMethod}</p>
                  <p><strong>Order Date:</strong> ${new Date(updatedOrder.date).toLocaleString()}</p>
                  ${updatedOrder.totalDiscount > 0 ? `<p style="color: green; font-weight: bold;">🎉 You saved ₹${updatedOrder.totalDiscount} using referral/coupon!</p>` : ''}
                </div>

                <div style="padding: 20px;">
                  <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Shipping Details</h3>
                  <p>
                    ${updatedOrder.address.firstName} ${updatedOrder.address.lastName}<br>
                    ${updatedOrder.address.street}<br>
                    ${updatedOrder.address.city}, ${updatedOrder.address.state}<br>
                    ${updatedOrder.address.country} - ${updatedOrder.address.zipcode}<br>
                    Phone: ${updatedOrder.address.phone}
                  </p>
                </div>

                <div style="padding: 20px;">
                  <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Items Ordered</h3>
                  <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                      <tr style="background: #f0f0f0;">
                        <th style="padding: 10px; border: 1px solid #ccc;">Image</th>
                        <th style="padding: 10px; border: 1px solid #ccc;">Item</th>
                        <th style="padding: 10px; border: 1px solid #ccc;">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${itemsHTML}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          `,
        };

        await transporter.sendMail(mailOptions);
        console.log("📧 Order confirmation email sent");
      } catch (emailError) {
        console.error("Email sending error:", emailError);
      }

      return res.json({
        success: true,
        message: "Payment Successful & Email Sent",
        directReferralApplied: order.referralDiscount > 0,
        referralDiscount: order.referralDiscount || 0,
        commissionEarned: order.commissionEarned || 0,
        couponReferralApplied: !!(order.couponReferral && order.couponReferral.couponOwner),
        couponDiscount: order.discount || 0,
        couponCommission: order.couponReferral?.commissionEarned || 0,
        markedReferralUsed: order.markedReferralUsed || false
      });
    } else {
      return res.json({ success: false, message: "Payment Not Yet Completed" });
    }
  } catch (error) {
    console.error("Error verifying Razorpay payment:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


//all order data for admin panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}


const userSingleOrder = async (req, res) => {
  try {
    const { orderid } = req.body;
    const orders = await orderModel.find({ orderid });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


const userSingleOrders = async (req, res) => {
  try {
    const { orderid } = req.body;
    const orders = await orderModel.find({ orderid });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getSingleOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await orderModel.findById(id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    res.json({ success: true, orders: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching order' });
  }
};

//Users order for frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Update order status fpor admin panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status })
    res.json({ success: true, message: "Product Updated" })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}


// const ShipOrders = async (req,res)=>{
//   try {
//        const { orderData,orderid } = req.body;



//             const authRes = await axios.post(
//               'https://apiv2.shiprocket.in/v1/external/auth/login',
//               {
//                 email: "imnehasingh1986@gmail.com",
//                 password: "Poonam94!"
//               },
//               {
//                 headers: { 'Content-Type': 'application/json' }
//               }
//             );

//             const shiprokettoken = authRes.data.token;


//             console.log(shiprokettoken);

//             // 2. Prepare shipping order payload

//             const formatDate = (timestamp) => {
//               const date = new Date(timestamp);
//               const yyyy = date.getFullYear();
//               const mm = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
//               const dd = String(date.getDate()).padStart(2, '0');
//               const hh = String(date.getHours()).padStart(2, '0');
//               const min = String(date.getMinutes()).padStart(2, '0');
//               return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
//             };

//             const currentDate = Date.now();
//             var currentDatetime = formatDate(currentDate)
//             // Get the current timestamp

//             console.log(orderData)

//             const orderPayload = {
//               order_id: orderid, // Order ID   
//               order_date: currentDatetime, // Current datetime in "yyyy-mm-dd hh:mm" format
//               pickup_location: "GGN-08", // Static pickup location
//               comment: "",
//               billing_customer_name: orderData.address.firstName, // Billing first name from order data
//               billing_last_name: orderData.address.lastName, // Billing last name from order data
//               billing_address: orderData.address.street, // Billing address from order data
//               billing_address_2: "Near Hokage House", // Static second billing address
//               billing_city: orderData.address.city, // Billing city from order data
//               billing_pincode:orderData.address.zipcode, // Billing pincode from order data
//               billing_state: orderData.address.state, // Billing state from order data
//               billing_country: orderData.address.country, // Billing country from order data
//               billing_email: orderData.address.email, // Billing email from order data
//               billing_phone: orderData.address.phone, // Billing phone from order data
//               shipping_is_billing: true, // Assuming shipping is the same as billing
//               order_items: orderData.items.map(item => ({
//                 name: item.name, // Item name from order data
//                 sku: item._id, // SKU from order data
//                 units: item.quantity, // Item quantity from order data
//                 selling_price: item.discountedprice, // Discounted price from order data
//                 hsn: 441122 // Static HSN code (could be dynamic based on your needs)
//               })),
//              payment_method: orderData.paymentMethod === "razorpay" ? "prepaid" : "postpaid",  // Payment method from order data
//               shipping_charges: 0, // Assuming no shipping charges
//               giftwrap_charges: 0, // Assuming no giftwrap charges
//               transaction_charges: 0, // Assuming no transaction charges
//               total_discount: 0, // Assuming no discount
//               sub_total: orderData.amount.toFixed(2), // Subtotal from order data
//               length: 8, // Static length (you can update based on actual data)
//               breadth: 8, // Static breadth (you can update based on actual data)
//               height: 3.5, // Static height (you can update based on actual data)
//               weight: 0.2 // Static weight (you can update based on actual data)
//             };
//             console.log(orderPayload)

//             // 3. Create Shiprocket Order
//             const shipRes = await axios.post('https://apiv2.shiprocket.in/v1/external/orders/create/adhoc',
//               orderPayload,
//               {
//                 headers: {
//                   'Content-Type': 'application/json',
//                   'Authorization': `Bearer ${shiprokettoken}`
//                 }
//               }
//             );

//             console.log("Shiprocket Response:", shipRes.data.orderData);


//             res.json({success:true,message:"Order Ship Successfully"});


//   } catch (error) {
//     console.log(error);
//      res.json({ success: false, message: error.message });
//   }
// }


const ShipOrders = async (req, res) => {
  try {
    const { orderData, orderid } = req.body;

    // 1. Authenticate with Shiprocket
    const authRes = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/auth/login",
      {
        email: "imnehasingh1986@gmail.com",
        password: "nh^0Q*cumP5hG21#"
      },
      { headers: { "Content-Type": "application/json" } }
    );

    const shiprokettoken = authRes.data.token;



    // 2. Format date
    const formatDate = (timestamp) => {
      const date = new Date(timestamp);
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const dd = String(date.getDate()).padStart(2, "0");
      const hh = String(date.getHours()).padStart(2, "0");
      const min = String(date.getMinutes()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
    };
    const currentDatetime = formatDate(Date.now());

    // 3. Build payload
    const orderPayload = {
      order_id: orderid,
      order_date: currentDatetime,
      pickup_location: "GGN-08",
      comment: "",
      billing_customer_name: orderData.address.firstName,
      billing_last_name: orderData.address.lastName,
      billing_address: orderData.address.street,
      billing_address_2: "Near Hokage House",
      billing_city: orderData.address.city,
      billing_pincode: orderData.address.zipcode,
      billing_state: orderData.address.state,
      billing_country: orderData.address.country,
      billing_email: orderData.address.email,
      billing_phone: orderData.address.phone,
      shipping_is_billing: true,
      order_items: orderData.items.map(item => ({
        name: item.name,
        sku: item._id,
        units: item.quantity,
        selling_price: item.price,   // ✅ fixed
        hsn: 441122
      })),
      payment_method: orderData.paymentMethod === "razorpay" ? "prepaid" : "postpaid", // ✅ now will exist
      shipping_charges: 0,
      giftwrap_charges: 0,
      transaction_charges: 0,
      total_discount: 0,
      sub_total: orderData.amount.toFixed(2),
      length: 8,
      breadth: 8,
      height: 3.5,
      weight: 0.2
    };

    console.log("Shiprocket Payload:", orderPayload);

    // 4. Call Shiprocket API
    const shipRes = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
      orderPayload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${shiprokettoken}`
        }
      }
    );

    console.log("Shiprocket Response:", shipRes.data);

    // 5. Return to frontend
    if (shipRes.data && shipRes.data.shipment_id) {
      res.json({ success: true, message: "Order shipped successfully", shiprocket: shipRes.data });
    } else {
      res.json({ success: false, message: shipRes.data.message || "Failed to create shipment" });
    }
  } catch (error) {
    console.error("Shiprocket Error:", error.response?.data || error.message);
    res.json({ success: false, message: error.response?.data?.message || error.message });
  }
};



export { placeOrderCOD, placeOrderCODSuccess, userSingleOrders, placeOrderRazorpaysuccess, verifyRazorpaysuccess, placeOrderRazorpay, verifyRazorpay, allOrders, userOrders, updateStatus, getSingleOrder, userSingleOrder, ShipOrders };
