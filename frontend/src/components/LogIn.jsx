import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import logo from '../assets/Image/logo/healthstoryFinal.png';
import banner from '../assets/Image/productImg/loginsignup.jpg';
import { useGoogleLogin } from '@react-oauth/google';
import { ShopContext } from '../context/ShopContext';


const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [forgotMode, setForgotMode] = useState(false); 
  const { token, setToken ,loginnavigate} = useContext(ShopContext);
  const navigate = useNavigate();// ✅

   useEffect(() => {
        if (token) {
            navigate(loginnavigate);
        }
    }, [token, navigate]);


const handleLoginSuccess = () => {
  
  const fromCart = location.state?.from === 'cart';
  const intendedPath = location.state?.intendedPath;
  
  if (fromCart && intendedPath) {
    
    navigate(intendedPath, { replace: true, state: {} });
  } else {
   
    navigate(loginnavigate, { replace: true });
  }
};


  

  const togglePassword = () => setShowPassword(!showPassword);

  // ✅ Normal login submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = '/api/auth/login';
    const body = { email, password, rememberMe };

    try {
      const response = await fetch(`http://localhost:2000${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (response.ok) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
        alert('Login successful');
        handleLoginSuccess();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };


  // ✅ Forgot password handler
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:2000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        alert('Password reset link sent to your email.');
        setForgotMode(false);
      } else {
        alert(data.message || 'Failed to send reset email.');
      }
    } catch (error) {
      console.error('Forgot password error:', error);
    }
  };



  // ✅ Google login
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const user = await userInfo.json();

        const response = await fetch('http://localhost:2000/api/auth/googlelogin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        });

        const data = await response.json();
        if (response.ok) {
          setToken(data.token);
          localStorage.setItem('token', data.token);
          alert('Google login successful');
        } else {
          alert(data.message);
        }
      } catch (err) {
        console.error('Google Login Error', err);
      }
    },
    onError: (error) => console.log('Google Login Failed:', error),
  });

  return (
    <div className="!min-h-screen !flex !flex-col md:!flex-row">
      {/* Left Panel */}
      <div className="!w-full md:!w-1/2 !flex !items-center !justify-center !bg-[#fcf7f2] !px-6 !py-12">
        <div className="!max-w-md !w-full">
          <Link to="/" className="!block !mb-6 !text-center">
            <img src={logo} alt="Logo" className="!mx-auto w-[300px]" />
          </Link>

          <h2 className="!text-2xl !font-semibold !text-gray-800 !text-center !mb-2">Welcome Back</h2>
          <p className="!text-sm !text-gray-500 !text-center !mb-6">{forgotMode ? "Reset your password" : "Login to your account"}</p>

          <form onSubmit={forgotMode ? handleForgotPassword : handleSubmit} className="!space-y-5">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="!w-full !px-4 !py-2 !border !border-gray-300 !rounded-md !focus:outline-none !focus:ring-2 !focus:ring-brown-400"
            />


            {!forgotMode && (
              <>

                <div className="!relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className="!w-full !px-4 !py-2 !border !border-gray-300 !rounded-md !focus:outline-none !focus:ring-2 !focus:ring-brown-400"
                  />
                  <button
                    type="button"
                    onClick={togglePassword}
                    className="!absolute !inset-y-0 !right-3 !flex !items-center !text-gray-600"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                <div className='flex justify-between flex-row  items-center mt-4'>
                  <label className='flex items-center text-gray-600'>
                    <input
                      type='checkbox'
                      className='mr-2'
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    Remember Me
                  </label>
                  <div className='text-blue-500 text-sm cursor-pointer' onClick={() => setForgotMode(true)}>
                    Forgot Password?
                  </div>
                </div>

              </>
            )}

            <button
              type="submit"
              className="!w-full !bg-[#8ca88a]  cursor-pointer hover:!bg-[#7f9b7d] !text-white !py-2 !rounded-md !transition-colors"
            >
              {forgotMode ? 'Send Reset Link' : 'Login'}
            </button>
          </form>
          {!forgotMode && (
            <>
              <div className="!flex !items-center !my-6">
                <hr className="!flex-grow !border-gray-300" />
                <span className="!px-3 !text-sm !text-gray-500">or</span>
                <hr className="!flex-grow !border-gray-300" />
              </div>



              <div className="!text-center !text-sm !mb-4">
                Not a member?{' '}
                <Link to="/signin" className="!text-[#4f3d32] hover:!underline !font-medium">
                  Register
                </Link>
              </div>
              <div className="!flex !gap-4 !mt-4">
                <button onClick={() => googleLogin()} className="!flex-1 cursor-pointer !bg-white border !border-gray-300 !text-gray-700 !py-2 !rounded-md !hover:bg-gray-50">
                  <svg className='!inline-flex' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="22" height="25" viewBox="0 0 48 48">
                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                  </svg> &nbsp; Google
                </button>

              </div>
            </>
          )}

          {forgotMode && (
            <div className="text-login text-gray-600  text-center cursor-pointer" onClick={() => setForgotMode(false)}>
              Back to Login
            </div>
          )}

        </div>

      </div>

      {/* Right Panel */}
      <div className="!hidden md:!block !w-1/2">
        <img src={banner} alt="Banner" className="!w-full !h-full !object-cover" />
      </div>
    </div>

  );
};

export default LogIn;
