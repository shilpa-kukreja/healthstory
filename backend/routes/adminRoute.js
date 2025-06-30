import express from 'express'
import adminDashboard from '../controllers/adminController.js';



const adminRouter=express.Router();

adminRouter.get('/dashboard',adminDashboard);

export default adminRouter;