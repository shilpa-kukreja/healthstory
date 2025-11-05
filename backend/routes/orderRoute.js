import express from 'express'
import { allOrders, getSingleOrder, placeOrderCOD, placeOrderRazorpay, updateStatus, userOrders, userSingleOrder, verifyRazorpay, ShipOrders, placeOrderCODSuccess, placeOrderRazorpaysuccess, verifyRazorpaysuccess, userSingleOrders } from '../controllers/orderController.js';
import authUsers from '../middleware/authUser.js';



const orderRouter=express.Router();

//Admin Features
orderRouter.post('/list',allOrders);
orderRouter.get('/list/:id',getSingleOrder)
orderRouter.post('/status',updateStatus)
orderRouter.post('/ship',ShipOrders);

//payment Feauters
orderRouter.post('/place',authUsers,placeOrderCOD);
orderRouter.post('/cod', placeOrderCODSuccess)
orderRouter.post('/razorpay',authUsers,placeOrderRazorpay)
orderRouter.post('/razorpaysuccess',placeOrderRazorpaysuccess)

//User Feautures
orderRouter.post('/userorders',authUsers,userOrders)
orderRouter.post('/usersingleorder',authUsers,userSingleOrder)
orderRouter.post('/usersingleorders',userSingleOrders)



//Verify Router
orderRouter.post('/verifyRazorpay',authUsers,verifyRazorpay)
orderRouter.post('/verifyRazorpaysuccess',verifyRazorpaysuccess)

export default orderRouter;
