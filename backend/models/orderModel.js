// import mongoose from "mongoose";

// const orderSchema=new mongoose.Schema({
//     userId:{type:String,required:true},
//     orderid:{type:String,},
//     items:{type:Array,required:true},
//     amount:{type:Number,required:true},
//     address:{type:Object,required:true},
//     status:{type:String,required:true,default:'order Placed'},
//     paymentMethod:{type:String,required:true},
//     payment:{type:Boolean,required:true,default:false},
//     date:{type:Number,required:true},
//     couponCode:{type:String},
//     discount:{ type: Number }, 
// }, { timestamps: true })

// const orderModel=mongoose.models.order || mongoose.model('order',orderSchema)
// export default orderModel;


// models/Order.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    orderid: { type: String },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    originalAmount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, required: true, default: 'Order Placed' },
    paymentMethod: { type: String, required: true },
    payment: { type: Boolean, required: true, default: false },
    date: { type: Number, required: true },
    couponCode: { type: String },
    discount: { type: Number, default: 0 },
    referralDiscount: { type: Number, default: 0 },
    commissionEarned: { type: Number, default: 0 },
    referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'VerifiedNumber' },
    
    // Fix coupon referral fields - make them proper subdocuments
    couponReferral: {
      couponOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'VerifiedNumber' },
      couponCode: { type: String },
      commissionEarned: { type: Number, default: 0 },
      discountPercent: { type: Number, default: 0 }
    },
    
    referralConfigUsed: {
      userDiscountPercent: { type: Number, default: 5 },
      referrerCommissionPercent: { type: Number, default: 5 },
      adminCommissionPercent: { type: Number, default: 10 },
      couponDiscountPercent: { type: Number, default: 10 },
      couponCommissionPercent: { type: Number, default: 5 }
    }
}, { timestamps: true });

const orderModel = mongoose.models.order || mongoose.model('order', orderSchema);
export default orderModel;