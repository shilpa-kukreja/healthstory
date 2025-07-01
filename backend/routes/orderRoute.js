import express from 'express'
import { allOrders, getSingleOrder, placeOrderCOD, placeOrderRazorpay, updateStatus, userOrders, userSingleOrder, verifyRazorpay } from '../controllers/orderController.js';
import authUser from '../middleware/auth.js';


const orderRouter=express.Router();

//Admin Features
orderRouter.post('/list',allOrders);
orderRouter.get('/list/:id',getSingleOrder)
orderRouter.post('/status',updateStatus)

//payment Feauters
orderRouter.post('/place',authUser,placeOrderCOD);
orderRouter.post('/razorpay',authUser,placeOrderRazorpay)

//User Feautures
orderRouter.post('/userorders',authUser,userOrders)
orderRouter.post('/usersingleorder',authUser,userSingleOrder)



//Verify Router
orderRouter.post('/verifyRazorpay',authUser,verifyRazorpay)

export default orderRouter;
