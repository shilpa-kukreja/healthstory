import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import sendEmail from '../utils/sendEmail.js';
import userModel from '../models/authmodel.js';
import userModel from '../models/userModel.js';
import VerifiedNumberModel from '../models/VerifiedNumberModel.js';



//user register code
export const registerUser=async(req,res)=>{
    const {email,mobile,password}=req.body;
    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
          }
          const hashedPassword = await bcrypt.hash(password, 10);
          const newUser=new userModel({
            email,
            mobile,
            password : hashedPassword,
            provider: 'local',
          })

          await newUser.save();
          const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET,{
            expiresIn: '30d',
          });
          res.status(201).json({token,user:newUser})

    } catch (error) {
        console.log(error)
         res.status(500).json({ message: 'Something went wrong' });
    }
}



//verify token route

export const verifyToken = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header missing or malformed' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ valid: true, userId: decoded.id });
  } catch (err) {
    return res.status(401).json({ valid: false, message: 'Invalid or expired token' });
  }
};



//user login code

export const loginUser = async (req, res) => {
    const { email, password } = req.body; 
    try {
        
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" }); 
        }

        
        const isMatch = await bcrypt.compare(password, user.password); 
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        if (user.provider !== 'local') {
            user.provider = 'local';
            await user.save();
          }

      
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });

        res.status(200).json({ token, user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};
// router.post("/send-otp", 

// // send OTP API
// export const loginotp= async (req, res) => {
//   try {
//     const { number, otp } = req.body; // number: user ka phone number, otp: random OTP

//     const response = await axios.post(
//       "https://www.fast2sms.com/dev/bulkV2",
//       {
//         route: "dlt",
//         sender_id: "HELSTR",
//         message: "195392",   // aapka DLT template ID
//         variables_values: otp, // OTP yaha jayega
//         numbers: number,
//       },
//       {
//         headers: {
//           authorization: "QH9YaUqbhOISv5y1g32wCjiDe7fFRJkTl6ru8tdnBLXGEKsWoZehYv31dD7z4MHPZIsWUj0pK2EOCXxi",
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     res.json({ success: true, data: response.data });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };



function generateOTP() {
  let otp = "";
  for (let i = 0; i < 6; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp;
}

export const loginotp = async (req, res) => {
  try {
    const { number } = req.body;
    const otp = generateOTP();

    // OTP DB me save
    await userModel.create({ number, otp });

    // Fast2SMS API call
    await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      {
        route: "dlt",
        sender_id: "HELSTR",
        message: "195392", // Aapka DLT template ID
        variables_values: otp,
        numbers: number,
      },
      {
        headers: {
          authorization: process.env.FAST2SMS_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};



// router.post("/verify-otp",

export const verifyotp= async (req, res) => {
  try {
    const { number, otp } = req.body;

    const otpRecord = await userModel.findOne({ number, otp });
    if (!otpRecord) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    // Number verified collection me save
    await VerifiedNumberModel.updateOne(
      { number },
      { number, verifiedAt: new Date() },
      { upsert: true }
    );

    // OTP record delete kar do
    await userModel.deleteMany({ number });

    res.json({ success: true, message: "Number verified successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//api gogglelogin

export const GoggleloginUser=async(req,res)=>{
    const {email,name,picture}=req.body
    try {
        let user=await userModel.findOne({email})
        if (!user) {
            user = await userModel.create({
              email,
              name,
              avatar: picture,
              password: '',
              provider: 'google',
            });
          } else {
            // update provider if necessary
            if (user.provider !== 'google') {
              user.provider = 'google';
              await user.save();
            }
          }

    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{
        expiresIn: '7d',
    })

    res.json({token})
    } catch (error) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong' }); 
    }
}






//api forgot password

export const forgotPassword=async(req,res)=>{
     const {email} =req.body;
     console.log(email)

     try {
        const user=await userModel.findOne({email});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }

          const resetToken = crypto.randomBytes(20).toString('hex');
          user.resetPasswordToken = resetToken;
          user.resetPasswordExpire = Date.now() + 3600000; // 1 hour
      
          await user.save();

          const resetUrl = `http://localhost:5174/reset-password/${resetToken}`;
          const message = `You are receiving this email because you (or someone else) has requested a password reset. Please click the link to reset your password: \n\n ${resetUrl}`;

          await sendEmail({
            email: user.email,
            subject: 'Password Reset Request',
            message,
          });
         res.status(201).json({message:"Email Sent"}) 

     } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong' });
     }
}


//api for reset password

export const resetPassword=async(req,res)=>{
    const {token}=req.params;
    const {password}=req.body;
    try {
        const user = await userModel.findOne({
            resetPasswordToken: token,
            resetPasswordExpire: { $gt: Date.now() },
          }); 
          if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
          }

          user.password = await bcrypt.hash(password, 10);
          user.resetPasswordToken = undefined;
          user.resetPasswordExpire = undefined;
      
          await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Something Went Wrong"})
    }
}

//Route for admin Login

export const adminLogin=async(req,res)=>{
    try {
       const {email,password} =req.body;
       if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
        const token=jwt.sign(email+password,process.env.JWT_SECRET)
        return res.status(200).json({success:true,token})
       }else{
        return res.status(401).json({success:false,message:"Invalid email or password"})
       }
    } catch (error) {
        console.error("Admin Login Error:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const alluser=async(req,res)=>{
  try {
    const Users=await userModel.find({}).select('-password');
    res.json({success:true,Users})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
  }
}


const deleteUser=async(req,res)=>{
  try {
    await  userModel.findByIdAndDelete(req.body.id)
    res.status(200).json({success:true,message:"User Removed"})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
  }
}

export {alluser,deleteUser}