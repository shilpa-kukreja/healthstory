import express from 'express';
import { adminLogin, alluser, deleteUser, forgotPassword, GoggleloginUser, loginotp, loginUser, registerUser, resetPassword, verifyotp, verifyToken } from '../controllers/authController.js';


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
authRouter.post('/verify-otp', verifyotp); // Reusing loginUser for OTP verification
authRouter.post('/send-otp', loginotp); // Reusing registerUser for sending OTP


export default authRouter;
