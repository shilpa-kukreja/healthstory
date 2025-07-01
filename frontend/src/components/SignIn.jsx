import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ShopContext } from '../context/ShopContext';
import prakritisaLogo from '../assets/Image/logo/healthstoryFinal.png';
import img1 from '../assets/Image/productImg/loginsignup.jpg';
import { FaFacebook } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
// import { useGoogleLogin } from '@react-oauth/google';

const SignIn = () => {
  const {  token, setToken } = useContext(ShopContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

   const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        const url = '/api/auth/register';
        const body = { email, mobile, password };

        try {
            const response = await fetch(`https://healthstory.net.in${url}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                setToken(data.token);
                localStorage.setItem('token', data.token);
                alert('Registration successful');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    // // ✅ Google login
    //      const googleLogin = useGoogleLogin({
    //        onSuccess: async (tokenResponse) => {
    //            try {
    //                const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    //                    headers: {
    //                        Authorization: `Bearer ${tokenResponse.access_token}`,
    //                    },
    //                });
   
    //                const user = await userInfo.json();
    //                console.log('Google User Info:', user);
   
    //                // You can now use user.email / user.name / user.picture etc.
    //                // Send to your backend to handle login/register
    //                const response = await fetch('https://prakritisa.com/api/auth/gogglelogin', {
    //                    method: 'POST',
    //                    headers: {
    //                        'Content-Type': 'application/json',
    //                    },
    //                    body: JSON.stringify(user),
    //                });
   
    //                const data = await response.json();
    //                if (response.ok) {
    //                    setToken(data.token);
    //                    localStorage.setItem('token', data.token);
    //                    alert('Google login successful');
    //                     handleLoginSuccess();
    //                } else {
    //                    alert(data.message);
    //                }
    //            } catch (err) {
    //                console.error('Google Login Error', err);
    //            }
    //        },
    //        onError: (error) => {
    //            console.log('Login Failed:', error);
    //        },
    //    });


     useEffect(() => {
        if (token) {
            navigate('/login');
        }
    }, [token, navigate]);

  return (
    <div className="!min-h-screen !flex !flex-col md:!flex-row !bg-white">
      {/* Left panel - Form */}
      <div className="!w-full md:!w-1/2 !flex !items-center !justify-center !p-8 !bg-[#fcf7f2]">
        <div className="!w-full !max-w-md !space-y-6">
          <div className="!text-center">
            <Link to="/">
              <img src={prakritisaLogo} alt="logo" className="!mx-auto w-[300px] !mb-4" />
            </Link>
            <h2 className="!text-2xl !font-semibold !text-gray-800">Create an Account</h2>
            <p className="!text-sm !text-gray-500">Fill out the form to register</p>
          </div>

          <form onSubmit={handleSubmit} className="!space-y-5">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
              className="!w-full !px-4 !py-2 !border !border-gray-300 !rounded-md !focus:ring-2 !focus:ring-brown-400 !outline-none"
            />
            <input
              type="number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
              placeholder="Mobile"
              className="!w-full !px-4 !py-2 !border !border-gray-300 !rounded-md !focus:ring-2 !focus:ring-brown-400 !outline-none"
            />

            <div className="!relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Create Password"
                className="!w-full !px-4 !py-2 !border !border-gray-300 !rounded-md !focus:ring-2 !focus:ring-brown-400 !outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="!absolute !inset-y-0 !right-3 !flex !items-center !text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="!relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm Password"
                className="!w-full !px-4 !py-2 !border !border-gray-300 !rounded-md !focus:ring-2 !focus:ring-brown-400 !outline-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="!absolute !inset-y-0 !right-3 !flex !items-center !text-gray-600"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              type="submit"
              className="!w-full !bg-[#8ca88a] !hover:bg-[#7f9b7d] !text-white !py-2 cursor-pointer !rounded-md !transition-colors"
            >
            <FaUserAlt className='!inline-flex'  /> &nbsp; SignUp
            </button>
          </form>

          <div className="!flex !items-center !my-4">
            <hr className="!flex-grow !border-gray-300" />
            <span className="!px-3 !text-sm !text-gray-500">Or</span>
            <hr className="!flex-grow !border-gray-300" />
          </div>

          <div className="!text-center !text-sm">
            Already a member?{' '}
            <Link to="/login" className="!text-[#4f3d32] !hover:underline !font-medium">
              Login
            </Link>
          </div>

          {/* <div className="!flex !gap-4 !mt-4">
           <button  onClick={() => googleLogin()} className="!flex-1 cursor-pointer !bg-white border !border-gray-300 !text-gray-700 !py-2 !rounded-md !hover:bg-gray-50">
            <svg className='!inline-flex' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="22" height="25" viewBox="0 0 48 48">
                                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                            </svg> &nbsp; Google
            </button> 
            
          </div> */}
        </div>
      </div>

      {/* Right panel - Banner */}
      <div className="!hidden md:!block !w-1/2">
        <img src={img1} alt="banner" className="!w-full !h-full !object-cover" />
      </div>
    </div>
  );
};

export default SignIn;
