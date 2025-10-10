import React, { useEffect, useState } from "react";
import { Sparkles, Gift, Zap } from "lucide-react";

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
    <div className="!flex !items-center !gap-2 !text-yellow-100 !font-mono !font-bold !text-sm sm:!text-base !bg-gradient-to-r !from-red-800/80 !to-red-900/80 !border !border-yellow-400/60 !rounded-lg !px-4 !py-2 !shadow-[0_0_25px_rgba(255,215,0,0.9)] !backdrop-blur-sm">
      <Zap className="!w-4 !h-4 !text-yellow-300 !animate-pulse" />
      <div className="!flex !items-center !gap-1">
        <span className="!text-yellow-300 !min-w-[2ch] !text-center">
          {timeLeft.hours.toString().padStart(2, "0")}
        </span>
        <span className="!text-yellow-400">:</span>
        <span className="!text-yellow-300 !min-w-[2ch] !text-center">
          {timeLeft.minutes.toString().padStart(2, "0")}
        </span>
        <span className="!text-yellow-400">:</span>
        <span className="!text-yellow-300 !min-w-[2ch] !text-center">
          {timeLeft.seconds.toString().padStart(2, "0")}
        </span>
      </div>
    </div>
  );
};

const OfferComponent = () => {
  return (
    <div className="!relative !w-full  !mx-auto !overflow-hidden !bg-gradient-to-br !from-[#8B0000] !via-[#B22222] !to-[#DC143C] !border-2 !border-yellow-400 !rounded-xl !shadow-[0_0_50px_rgba(220,20,60,0.8)] !flex !flex-col sm:!flex-row !items-center !justify-between !px-6 !py-4 !gap-4 !backdrop-blur-md !transform !transition-all !duration-300 hover:!shadow-[0_0_80px_rgba(255,215,0,0.9)] hover:!scale-[1.02]">
      
      {/* Fireworks/Shower Effect Background */}
      <div className="!absolute !inset-0 !overflow-hidden !pointer-events-none">
        {/* Firework bursts */}
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="!absolute !w-2 !h-2 !bg-yellow-400 !rounded-full !animate-firework"
            style={{
              left: `${20 + (i * 12)}%`,
              top: `${10 + (i % 3) * 30}%`,
              animationDelay: `${i * 0.8}s`,
              boxShadow: '0 0 20px rgba(255,215,0,0.8)'
            }}
          />
        ))}
        
        {/* Sparkle shower effect */}
        <div className="!absolute !inset-0 !bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.3)_0%,_transparent_70%)] !animate-sparkle-shower"></div>
        
        {/* Floating sparkles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="!absolute !w-1 !h-1 !bg-yellow-300 !rounded-full !animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Top glitter effect */}
      <div className="!absolute !top-0 !left-0 !right-0 !h-8 !bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.8)_0%,transparent_70%)] !animate-twinkle"></div>
      
      {/* Bottom golden glow */}
      <div className="!absolute !bottom-0 !left-0 !right-0 !h-6 !bg-gradient-to-t !from-yellow-400/40 !via-orange-400/20 !to-transparent"></div>

      {/* Left Section - Main Branding */}
      <div className="!flex !items-center !gap-3 !z-10 !flex-shrink-0">
        <div className="!relative">
          <div className="!absolute !-inset-2 !bg-yellow-400 !rounded-full !opacity-60 !animate-ping"></div>
          <div className="!relative !bg-gradient-to-br !from-yellow-400 !to-orange-500 !rounded-full !p-3 !shadow-[0_0_30px_rgba(255,215,0,0.9)] !border-2 !border-yellow-300">
            <Gift className="!text-red-900 !w-6 !h-6 !sm:!w-7 !sm:!h-7" />
          </div>
        </div>
        <div className="!text-center !sm:!text-left">
          <h2 className="!text-yellow-100 !font-extrabold !text-lg !sm:!text-2xl !uppercase !tracking-widest !drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] !leading-tight">
            ✨ Diwali Mega Sale ✨
          </h2>
          <p className="!text-yellow-200 !text-xs !sm:!text-sm !font-semibold !mt-1 !drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
            Limited Time Offer
          </p>
        </div>
      </div>

      {/* Middle Section - Offer Details */}
      <div className="!flex !w-[90%] !flex-wrap !justify-center !items-center !gap-3 sm:!gap-4 !z-10">
        <span className="!relative !bg-gradient-to-r !from-red-700 !via-red-600 !to-red-800 !text-white !text-lg sm:!text-2xl !font-extrabold !uppercase !rounded-full !px-8 sm:!px-12 !py-3 sm:!py-4 !shadow-[0_0_40px_rgba(255,200,0,0.9)] !border-2 !border-yellow-400 !tracking-widest !transition-all !duration-500 hover:!scale-105 hover:!shadow-[0_0_60px_rgba(255,255,100,1)]">
          ⚡ FLAT 70% OFF ⚡
          {/* Shimmer effect on text */}
          <span className="!absolute !inset-0 !bg-gradient-to-r !from-transparent !via-yellow-200/30 !to-transparent !animate-shimmer !rounded-full"></span>
        </span>
      </div>

      {/* Right Section - Timer */}
      <div className="!z-10 !flex-shrink-0">
        <CountdownTimer />
        <p className="!text-yellow-200 !text-xs !text-center !mt-2 !font-semibold !drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]">
          Don't Miss Out!
        </p>
      </div>

      {/* Animated corner accents */}
      <div className="!absolute !top-2 !left-2 !w-3 !h-3 !bg-yellow-400 !rounded-full !opacity-70 !animate-ping"></div>
      <div className="!absolute !top-2 !right-2 !w-3 !h-3 !bg-yellow-400 !rounded-full !opacity-70 !animate-ping" style={{ animationDelay: '0.5s' }}></div>
      <div className="!absolute !bottom-2 !left-2 !w-3 !h-3 !bg-yellow-400 !rounded-full !opacity-70 !animate-ping" style={{ animationDelay: '1s' }}></div>
      <div className="!absolute !bottom-2 !right-2 !w-3 !h-3 !bg-yellow-400 !rounded-full !opacity-70 !animate-ping" style={{ animationDelay: '1.5s' }}></div>
    </div>
  );
};

// Add these CSS animations to your global CSS file or style tag
const styles = `
@keyframes firework {
  0% { transform: translateY(0) scale(1); opacity: 1; }
  50% { transform: translateY(-20px) scale(1.5); opacity: 0.7; }
  100% { transform: translateY(-40px) scale(2); opacity: 0; }
}

@keyframes sparkle-shower {
  0% { transform: translateY(-100%) rotate(0deg); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateY(100%) rotate(180deg); opacity: 0; }
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
  50% { transform: translateY(-10px) rotate(180deg); opacity: 1; }
}

.animate-firework {
  animation: firework 2s ease-in-out infinite;
}

.animate-sparkle-shower {
  animation: sparkle-shower 3s linear infinite;
}

.animate-shimmer {
  animation: shimmer 2s ease-in-out infinite;
}

.animate-float {
  animation: float 4s ease-in-out infinite;
}
`;

// Add styles to document head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}

export default OfferComponent;