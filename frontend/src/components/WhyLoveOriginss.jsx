import React from "react";
import { Check, Star, Award, Shield, Heart, Zap, Leaf, Truck } from "lucide-react";
import healthStorylogo from '../assets/Image/logo/healthstoryFinal.png';

const WhyLoveOriginss = () => {
  const features = [
    {
      icon: "💪",
      title: "Build Muscle & Strength",
      description: "Support lean muscle growth and enhanced strength with premium plant-based proteins",
      color: "from-orange-500 to-amber-500"
    },
    {
      icon: "🛡️",
      title: "Immunity & Energy",
      description: "Boost your defenses and feel energized every day with essential nutrients",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: "🥤",
      title: "Post-Workout Recovery",
      description: "Replenish nutrients and accelerate muscle recovery after intense workouts",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: "🌱",
      title: "Clean & Vegan",
      description: "100% plant-based, clean nutrition you can trust with no artificial ingredients",
      color: "from-lime-500 to-green-500"
    },
    {
      icon: "😋",
      title: "Deliciously Smooth",
      description: "Tastes great with a naturally smooth texture that mixes perfectly",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: "🌾",
      title: "24g Plant Protein Daily",
      description: "Daily protein power from quality plant sources for sustained energy",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: "⚡",
      title: "4g BCAA Power",
      description: "Fuel performance and recovery with essential branched-chain amino acids",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: "🚫",
      title: "Zero Sugar",
      description: "No added sugar, just clean nutrition for your health goals",
      color: "from-gray-600 to-gray-700"
    },
    {
      icon: "🌀",
      title: "Easy to Digest",
      description: "Gentle on the stomach with fast absorption and no bloating",
      color: "from-teal-500 to-cyan-500"
    },
    {
      icon: "✨",
      title: "Daily Immunity & Vitality",
      description: "Support your wellness with daily immune and energy boost",
      color: "from-yellow-500 to-amber-500"
    }
  ];

  const stats = [
    { number: "24g", label: "Plant Protein", icon: Leaf },
    { number: "4g", label: "BCAAs", icon: Zap },
    { number: "0g", label: "Added Sugar", icon: Shield },
    { number: "100%", label: "Vegan", icon: Heart }
  ];

  return (
    <div className="!relative !overflow-hidden">
      {/* Background Elements */}
      <div className="!absolute !inset-0 !bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100"></div>
      <div className="!absolute !top-0 !right-0 !w-72 !h-72 !bg-gradient-to-bl from-amber-200 to-transparent !rounded-full !blur-3xl !opacity-30"></div>
      <div className="!absolute !bottom-0 !left-0 !w-96 !h-96 !bg-gradient-to-tr from-orange-200 to-transparent !rounded-full !blur-3xl !opacity-20"></div>

      <div className="!relative !max-w-7xl !mx-auto !px-4 sm:!px-6 lg:!px-8 !py-16">
        {/* Header Section */}
        <div className="!text-center !mb-16">
          <div className="!inline-flex !items-center !gap-2 !bg-white/80 !backdrop-blur-sm !px-6 !py-3 !rounded-2xl !shadow-lg !border !border-amber-200 !mb-8">
            <Award className="!w-5 !h-5 !text-amber-600" />
            <span className="!text-sm !font-semibold !text-amber-700">Premium Quality Guaranteed</span>
          </div>
          
          <h1 className="!text-5xl md:!text-6xl !font-bold !text-gray-900 !mb-6 !font-serif">
            Why You'll Love{" "}
            <span className="!relative !inline-block">
              <img 
                src={healthStorylogo} 
                className="!w-48 md:!w-80 !h-auto !inline-block !ml-4 -mt-2" 
                alt="Health Story" 
              />
              <div className="!absolute -bottom-2 !left-0 !w-full !h-1 !bg-gradient-to-r from-amber-400 to-orange-400 !rounded-full"></div>
            </span>
          </h1>
          
          <p className="!text-xl !text-gray-600 !max-w-3xl !mx-auto !leading-relaxed">
            Discover the perfect blend of science and nature in every scoop. 
            Engineered for athletes, designed for everyone.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="!grid !grid-cols-2 lg:!grid-cols-4 !gap-6 !mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="!bg-white/80 !backdrop-blur-sm !rounded-2xl !p-6 !text-center !shadow-lg !border !border-amber-100 hover:!shadow-xl !transition-all !duration-300 hover:-translate-y-1"
            >
              <div className="!w-12 !h-12 !bg-gradient-to-br from-amber-500 to-orange-500 !rounded-xl !flex !items-center !justify-center !mx-auto !mb-3 !shadow-md">
                <stat.icon className="!w-6 !h-6 !text-white" />
              </div>
              <div className="!text-2xl !font-bold !text-gray-900 !mb-1">{stat.number}</div>
              <div className="!text-sm !font-medium !text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="!grid !grid-cols-1 lg:!grid-cols-2 !gap-12 !items-start">
          {/* Features List */}
          <div className="!space-y-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="!group !bg-white/90 !backdrop-blur-sm !rounded-2xl !p-6 !shadow-lg hover:!shadow-2xl !transition-all !duration-500 !border !border-amber-100 hover:!border-amber-200 !relative !overflow-hidden"
              >
                {/* Animated Background */}
                <div className={`!absolute !inset-0 !bg-gradient-to-r ${feature.color} !opacity-0 group-hover:!opacity-5 !transition-opacity !duration-500`}></div>
                
                <div className="!flex !items-start !gap-4 !relative !z-10">
                  {/* Icon */}
                  <div className={`!w-12 !h-12 !bg-gradient-to-br ${feature.color} !rounded-xl !flex !items-center !justify-center !shadow-lg group-hover:!scale-110 !transition-transform !duration-300`}>
                    <span className="!text-lg">{feature.icon}</span>
                  </div>
                  
                  {/* Content */}
                  <div className="!flex-1">
                    <h3 className="!text-lg !font-bold !text-gray-900 !mb-2 group-hover:!text-gray-800 !transition-colors">
                      {feature.title}
                    </h3>
                    <p className="!text-gray-600 !leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  
                  {/* Check Mark */}
                  <div className="!w-6 !h-6 !bg-green-100 !rounded-full !flex !items-center !justify-center !flex-shrink-0 !mt-1">
                    <Check className="!w-4 !h-4 !text-green-600" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Benefits Sidebar */}
          <div className="!sticky !top-8">
            <div className="!bg-gradient-to-br from-amber-500 to-orange-500 !rounded-3xl !p-8 !text-white !shadow-2xl">
              <div className="!text-center !mb-8">
                <div className="!w-16 !h-16 !bg-white/20 !rounded-2xl !flex !items-center !justify-center !mx-auto !mb-4 !backdrop-blur-sm">
                  <Star className="!w-8 !h-8 !text-white" fill="white" />
                </div>
                <h3 className="!text-2xl !font-bold !mb-2">Premium Benefits</h3>
                <p className="!text-amber-100 !opacity-90">Everything you need in one powerful formula</p>
              </div>

              <div className="!space-y-4 !mb-8">
                <div className="!flex !items-center !gap-3 !bg-white/10 !backdrop-blur-sm !p-4 !rounded-xl">
                  <Truck className="!w-5 !h-5" />
                  <span className="!font-semibold">Free Shipping Over $50</span>
                </div>
                <div className="!flex !items-center !gap-3 !bg-white/10 !backdrop-blur-sm !p-4 !rounded-xl">
                  <Shield className="!w-5 !h-5" />
                  <span className="!font-semibold">30-Day Money Back Guarantee</span>
                </div>
                <div className="!flex !items-center !gap-3 !bg-white/10 !backdrop-blur-sm !p-4 !rounded-xl">
                  <Leaf className="!w-5 !h-5" />
                  <span className="!font-semibold">Certified Vegan & Non-GMO</span>
                </div>
              </div>

              <button className="!w-full !bg-white !text-amber-600 !py-4 !rounded-xl !font-bold !text-lg hover:!bg-gray-100 !transition-all !duration-200 !transform hover:!scale-105 !shadow-lg !flex !items-center !justify-center !gap-2">
                <Zap className="!w-5 !h-5" />
                Start Your Journey
              </button>

              {/* Trust Badges */}
              <div className="!flex !justify-center !gap-6 !mt-6 !pt-6 !border-t !border-amber-400/30">
                <div className="!text-center">
                  <div className="!text-2xl !font-bold">4.9</div>
                  <div className="!flex !justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="!w-4 !h-4 !fill-current" />
                    ))}
                  </div>
                  <div className="!text-xs !text-amber-100 !mt-1">2,500+ Reviews</div>
                </div>
                <div className="!text-center">
                  <div className="!text-2xl !font-bold">98%</div>
                  <div className="!text-xs !text-amber-100 !mt-1">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        {/* <div className="!text-center !mt-16">
          <div className="!bg-white/80 !backdrop-blur-sm !rounded-2xl !p-8 !shadow-lg !border !border-amber-100">
            <h3 className="!text-2xl !font-bold !text-gray-900 !mb-4">
              Ready to Transform Your Health?
            </h3>
            <p className="!text-gray-600 !mb-6 !max-w-2xl !mx-auto">
              Join thousands of satisfied customers who have experienced the Health Story difference. 
              Your journey to better health starts here.
            </p>
            <div className="!flex !flex-col sm:!flex-row !gap-4 !justify-center">
              <button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-xl font-bold hover:from-amber-600 hover:to-orange-600 transition-all duration-200 transform hover:scale-105 shadow-lg">
                Shop Now
              </button>
              <button className="bg-white text-gray-700 px-8 py-4 rounded-xl font-bold border border-amber-200 hover:bg-amber-50 transition-all duration-200">
                Learn More
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default WhyLoveOriginss;