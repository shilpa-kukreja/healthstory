import express from 'express'
import { addCoupan, applyCoupon, applyCouponWithReferral, getAllCoupons, removeCoupons, toggleCouponStatus, updateCoupons } from '../controllers/couponController.js';
import authUser from '../middleware/auth.js';



const couponRouter=express.Router();


couponRouter.post('/apply',authUser,applyCoupon)
couponRouter.post('/add',addCoupan)
couponRouter.get("/get", getAllCoupons); 
couponRouter.put("/:id/toggle", toggleCouponStatus);
couponRouter.post('/remove', removeCoupons);
couponRouter.put('/:id', updateCoupons);
couponRouter.post('/apply-referral', applyCouponWithReferral);


export default couponRouter