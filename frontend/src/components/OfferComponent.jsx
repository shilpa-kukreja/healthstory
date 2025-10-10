import React, { useEffect, useState } from "react";
import { Sparkles } from "lucide-react"; // optional icon

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date();
    target.setHours(target.getHours() + 7);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="!flex !items-center !gap-2 !text-yellow-300 !font-mono !font-bold !text-xs sm:!text-sm !bg-red-700/40 !border !border-yellow-500/50 !rounded-lg !px-4 !py-2 !shadow-inner">
      <span className="!text-yellow-100">⏰</span>
      <div className="!flex !items-center !gap-1">
        <span className="!text-yellow-300 !text-base sm:!text-lg">
          {timeLeft.hours.toString().padStart(2, "0")}
        </span>
        <span>:</span>
        <span className="!text-yellow-300 !text-base sm:!text-lg">
          {timeLeft.minutes.toString().padStart(2, "0")}
        </span>
        <span>:</span>
        <span className="!text-yellow-300 !text-base sm:!text-lg">
          {timeLeft.seconds.toString().padStart(2, "0")}
        </span>
      </div>
    </div>
  );
};

const OfferComponent = () => {
  return (
    <div className="!relative !w-full !mx-auto !bg-gradient-to-r from-red-700 via-orange-600 to-amber-500 !border-2 !border-yellow-400  !overflow-hidden !shadow-2xl !flex !items-center !justify-between !px-4 sm:!px-8 !py-2 sm:!py-3 !gap-2 sm:!gap-6">
      {/* Decorative sparkles */}
      <div className="!absolute !inset-0 !bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent)]"></div>

      {/* Left: Icon + Title */}
      <div className="!flex !items-center !gap-2 sm:!gap-3 !z-10">
        <div className="!bg-yellow-400 !rounded-full !p-1 sm:!p-2 !shadow-lg">
          <Sparkles className="!text-red-700 !w-4 !h-4 sm:!w-5 sm:!h-5" />
        </div>
        <h2 className="!text-yellow-200 !font-bold !text-sm sm:!text-lg !tracking-wider uppercase">
          Diwali Deals
        </h2>
      </div>

      {/* Middle: Offer Text */}
      <div className="!z-10 !flex !items-center !gap-2 sm:!gap-3 !flex-wrap !justify-center !text-center">
        <span className="!text-white !text-xs sm:!text-sm !font-medium uppercase">
          Special Offer:
        </span>
        <span className="!text-yellow-300 !font-bold !text-xs sm:!text-sm uppercase">
          24-Hour Flash Sale
        </span>
        <span className="!bg-yellow-400 !text-red-800 !text-[10px] sm:!text-xs !font-bold !rounded-full !px-3 !py-1">
          UP TO 60% OFF
        </span>
      </div>

      {/* Right: Countdown Timer */}
      <div className="!z-10">
        <CountdownTimer />
      </div>
    </div>
  );
};

export default OfferComponent;
