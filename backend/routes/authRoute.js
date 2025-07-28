import express from 'express';
import { adminLogin, alluser, deleteUser, forgotPassword, GoggleloginUser, loginUser, registerUser, resetPassword, verifyToken } from '../controllers/authController.js';


const authRouter=express.Router();
authRouter.post('/admin',adminLogin)
authRouter.post('/login',loginUser)
authRouter.post('/register',registerUser)
authRouter.post('/forgot-password', forgotPassword);
authRouter.post('/reset-password/:token', resetPassword);
authRouter.post('/gogglelogin',GoggleloginUser)
authRouter.get('/alluser',alluser);
authRouter.delete('/delete/:id',deleteUser)
authRouter.get('/verify-token', verifyToken)


export default authRouter;
