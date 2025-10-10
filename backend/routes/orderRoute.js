import express from 'express'
import { allOrders, getSingleOrder, placeOrderCOD, placeOrderRazorpay, updateStatus, userOrders, userSingleOrder, verifyRazorpay, ShipOrders, placeOrderCODSuccess, placeOrderRazorpaysuccess, verifyRazorpaysuccess, userSingleOrders } from '../controllers/orderController.js';
import authUser from '../middleware/auth.js';


const orderRouter=express.Router();

//Admin Features
orderRouter.post('/list',allOrders);
orderRouter.get('/list/:id',getSingleOrder)
orderRouter.post('/status',updateStatus)
orderRouter.post('/ship',ShipOrders);

//payment Feauters
orderRouter.post('/place',authUser,placeOrderCOD);
orderRouter.post('/cod',placeOrderCODSuccess)
orderRouter.post('/razorpay',authUser,placeOrderRazorpay)
orderRouter.post('/razorpaysuccess',placeOrderRazorpaysuccess)

//User Feautures
orderRouter.post('/userorders',authUser,userOrders)
orderRouter.post('/usersingleorder',authUser,userSingleOrder)
orderRouter.post('/usersingleorders',userSingleOrders)



//Verify Router
orderRouter.post('/verifyRazorpay',authUser,verifyRazorpay)
orderRouter.post('/verifyRazorpaysuccess',verifyRazorpaysuccess)

export default orderRouter;
