import express from 'express';
import { adminLogin, alluser, deleteUser, forgotPassword, getAllPayouts, getAllReferrals, getallverifiedNumber, getPayoutHistory, getReferralConfig, getReferralDashboard, getReferralStats, getReferredUsers, getTotalEarnings, GoggleloginUser, loginotp, loginUser, registerUser, requestPayout, resetPassword, updatePayoutStatus, updateReferralConfig, verifyotp, verifyToken } from '../controllers/authController.js';
import authUser from '../middleware/auth.js';


// router.get('/all-referrals'
// Get referral statistics
// router.get('/referral-stats'
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
authRouter.get("/referrals", authUser, getReferredUsers);
authRouter.get("/referral/dashboard", authUser, getReferralDashboard);
authRouter.post("/request", authUser, requestPayout);
authRouter.get("/history", authUser, getPayoutHistory);
authRouter.get("/admin/all",  getAllPayouts);
authRouter.put("/admin/update/:id", updatePayoutStatus);
authRouter.get('/referral-config', getReferralConfig);
authRouter.put('/referral-config', updateReferralConfig);
authRouter.get('/all-referrals', getAllReferrals);
authRouter.get('/referral-stats', getReferralStats);
authRouter.get("/total-earnings", authUser, getTotalEarnings);
authRouter.get("/all-verified",  getallverifiedNumber);







export default authRouter;
