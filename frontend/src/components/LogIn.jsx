import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Image/logo/healthstoryFinal.png";
import banner from "../assets/Image/productImg/loginsignup.jpg";
import { ShopContext } from "../context/ShopContext";

const OTPLogin = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [step, setStep] = useState("phone"); // phone | otp
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const { setToken, loginnavigate } = useContext(ShopContext);
  const navigate = useNavigate();


  const urlParams = new URLSearchParams(window.location.search);
  const referralCode = urlParams.get("ref");

  // ✅ Send OTP
  const sendOtp = async () => {
    if (!phone || phone.length < 10) {
      alert("Please enter a valid phone number");
      return;
    }
    setLoading(true);
    try {
      // 👇 Replace with your backend API
      const response = await fetch("http://localhost:5000/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ number : phone }),
      });

      console.log(response);
      const data = await response.json();

      console.log(data);
      if (response.ok) {
        // alert("OTP sent successfully!");
        setStep("otp");
        setResendTimer(30);
        const timer = setInterval(() => {
          setResendTimer((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        alert(data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error(error);
      alert("Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Verify OTP
  const verifyOtp = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) {
      alert("Please enter a valid 6-digit OTP");
      return;
    }
    setLoading(true);
    try {
      // 👇 Replace with your backend API
      const response = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ number: phone, otp: enteredOtp, referralCode }),
      });

      const data = await response.json();
      if (response.ok) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        // alert("Login successful");
        navigate(loginnavigate, { replace: true });
      } else {
        alert(data.message || "Invalid OTP");
      }
    } catch (error) {
      console.error(error);
      alert("Error verifying OTP");
    } finally {
      setLoading(false);
    }
  };

  // ✅ OTP input handler
  const handleOtpChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // auto-focus next input
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  return (
    <div className="!min-h-screen !flex !flex-col md:!flex-row">
      {/* Left Panel */}
      <div className="!w-full md:!w-1/2 !flex !items-center !justify-center !bg-[#fcf7f2] !px-6 !py-12">
        <div className="!max-w-md !w-full">
          <Link to="/" className="!block !mb-6 !text-center">
            <img src={logo} alt="Logo" className="!mx-auto !w-[250px]" />
          </Link>

          <h2 className="!text-2xl !font-semibold !text-gray-800 !text-center !mb-2">
            {step === "phone" ? "Login with OTP" : "Enter OTP"}
          </h2>
          <p className="!text-sm !text-gray-500 !text-center !mb-6">
            {step === "phone"
              ? "Enter your phone number to receive OTP"
              : "Enter the 6-digit OTP sent to your number"}
          </p>

          {/* Phone Step */}
          {step === "phone" && (
            <div className="!space-y-5">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone number"
                className="!w-full !px-4 !py-2 !border !border-gray-300 !rounded-md focus:!outline-none focus:!ring-2 focus:!ring-green-400"
              />
              <button
                onClick={sendOtp}
                disabled={loading}
                className="!w-full !bg-[#8ca88a] hover:!bg-[#7f9b7d] !text-white !py-2 !!rounded-md !transition-colors !cursor-pointer disabled:!opacity-50"
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </div>
          )}

          {/* OTP Step */}
          {step === "otp" && (
            <div className="!space-y-5">
              <div className="!flex !justify-between !gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    maxLength="1"
                    className="!w-12 !h-12 !text-center !border !border-gray-300 !rounded-md focus:!outline-none focus:!ring-2 focus:!ring-green-400 !text-lg"
                  />
                ))}
              </div>

              <button
                onClick={verifyOtp}
                disabled={loading}
                className="!w-full !bg-[#8ca88a] hover:!bg-[#7f9b7d] !text-white !py-2 !rounded-md !transition-colors !cursor-pointer disabled:!opacity-50"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>

              <div className="!text-center !text-sm !text-gray-600">
                Didn’t receive the OTP?{" "}
                {resendTimer > 0 ? (
                  <span className="!text-gray-400">Resend in {resendTimer}s</span>
                ) : (
                  <span
                    className="!text-blue-500 !cursor-pointer"
                    onClick={sendOtp}
                  >
                    Resend
                  </span>
                )}
              </div>
              <div
                className="!text-center !text-sm !text-gray-600 !cursor-pointer"
                onClick={() => setStep("phone")}
              >
                Change Number
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Panel */}
      <div className="!hidden md:!block !w-1/2">
        <img
          src={banner}
          alt="Banner"
          className="!w-full !h-full !object-cover"
        />
      </div>
    </div>
  );
};

export default OTPLogin;
