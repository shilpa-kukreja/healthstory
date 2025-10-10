import React from "react";
import { Droplets, Utensils, Clock, CheckCircle, ArrowRight } from "lucide-react";
import howtouse from '../assets/Image/Ingredients/howToUse.jpg';

const steps = [
  {
    icon: <Droplets className="w-6 h-6" />,
    title: "Measure Liquid",
    description: "Add 250ml of water, milk, or plant-based alternative",
    tip: "Cold liquids work best for smooth texture"
  },
  {
    icon: <Utensils className="w-6 h-6" />,
    title: "Add Protein",
    description: "Mix one scoop (33g) of premium plant protein",
    tip: "Use included scoop for perfect measurement"
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Mix Thoroughly",
    description: "Shake, stir, or blend until fully dissolved",
    tip: "30 seconds of shaking recommended"
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: "Enjoy Anytime",
    description: "Consume post-workout or any time of day",
    tip: "Best consumed within 2 hours of preparation"
  }
];

const benefits = [
  "20g clean plant protein per serving",
  "Quick & easy preparation",
  "Perfect for busy lifestyles",
  "Great taste with any liquid"
];

export default function HowToUse() {
  return (
    <section className="!relative !overflow-hidden !bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 !py-16 sm:!py-24 !px-4 sm:!px-6 lg:!px-8">
      {/* Background Decorations */}
      <div className="!absolute !top-0 !right-0 !w-96 !h-96 !bg-gradient-to-bl from-amber-200 to-orange-100 !rounded-full !blur-3xl !opacity-40"></div>
      <div className="!absolute !bottom-0 !left-0 !w-80 !h-80 !bg-gradient-to-tr from-orange-200 to-amber-100 !rounded-full !blur-3xl !opacity-30"></div>
      
      <div className="!relative !max-w-7xl !mx-auto">
        {/* Header */}
        <div className="!text-center !mb-16">
          <div className="!inline-flex !items-center gap-2 !bg-white/80 !backdrop-blur-sm !px-6 !py-3 !rounded-2xl !shadow-lg !border !border-amber-200 !mb-6">
            <span className="!w-2 !h-2 !bg-amber-500 !rounded-full !animate-pulse"></span>
            <span className="!text-sm !font-semibold !text-amber-700">Simple Preparation</span>
          </div>
          
          <h2 className="!text-4xl md:!text-5xl !font-bold !text-gray-900 !mb-4 !font-serif">
            How To Use <span className="text-amber-600">Origin's Protein</span>
          </h2>
          
          <p className="!text-xl !text-gray-600 !max-w-2xl !mx-auto !leading-relaxed">
            Get the most out of your premium plant protein with these simple steps. 
            Perfect results in under a minute.
          </p>
        </div>

        <div className="!grid !grid-cols-1 lg:!grid-cols-2 !gap-12 lg:!gap-16 !items-center">
          {/* Image Section */}
          <div className="!relative">
            <div className="!relative !rounded-3xl !overflow-hidden !shadow-2xl !group">
              <img 
                src={howtouse} 
                alt="How to use Origin's Protein" 
                className="!w-full !h-auto !object-cover !transition-transform !duration-700 group-hover:!scale-105"
              />
              
              {/* Overlay Gradient */}
              <div className="!absolute !inset-0 !bg-gradient-to-t from-black/20 to-transparent !opacity-0 group-hover:!opacity-100 !transition-opacity !duration-300"></div>
              
              {/* Floating Badge */}
              <div className="!absolute !top-6 !left-6 !bg-white/90 !backdrop-blur-sm !px-4 !py-2 !rounded-2xl !shadow-lg">
                <div className="!flex !items-center !gap-2">
                  <div className="!w-2 !h-2 !bg-green-500 !rounded-full !animate-pulse"></div>
                  <span className="!text-sm !font-semibold !text-gray-700">Ready in 60s</span>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="!absolute -bottom-6 -right-6 !w-32 !h-32 !bg-amber-200 !rounded-full !blur-2xl !opacity-60"></div>
            <div className="!absolute -top-4 -left-4 !w-24 !h-24 !bg-orange-200 !rounded-full !blur-2xl !opacity-40"></div>
          </div>

          {/* Content Section */}
          <div className="!space-y-8">
            {/* Quick Overview */}
            <div className="!bg-white/80 !backdrop-blur-sm !rounded-2xl !p-6 !shadow-lg !border !border-amber-100">
              <h3 className="!text-2xl !font-bold !text-gray-900 !mb-4 !flex !items-center !gap-3">
                <span className="!w-8 !h-8 !bg-gradient-to-br from-amber-500 to-orange-500 !rounded-lg !flex !items-center !justify-center">
                  <span className="!text-white !text-sm !font-bold">⚡</span>
                </span>
                Quick Start Guide
              </h3>
              
              <div className="!space-y-4">
                <div className="!flex !items-start !gap-3">
                  <div className="!w-6 !h-6 !bg-amber-100 !rounded-full !flex !items-center !justify-center !flex-shrink-0 !mt-1">
                    <span className="!text-amber-600 !text-sm !font-bold">1</span>
                  </div>
                  <div>
                    <p className="!font-semibold !text-gray-800">One Scoop Anytime</p>
                    <p className="!text-gray-600 !text-sm">20g of clean plant protein per serving</p>
                  </div>
                </div>
                
                <div className="!flex !items-start !gap-3">
                  <div className="!w-6 !h-6 !bg-amber-100 !rounded-full !flex !items-center !justify-center !flex-shrink-0 !mt-1">
                    <span className="!text-amber-600 !text-sm !font-bold">2</span>
                  </div>
                  <div>
                    <p className="!font-semibold !text-gray-800">Easy Mixing</p>
                    <p className="!text-gray-600 !text-sm">Works with water, milk, or smoothies</p>
                  </div>
                </div>
                
                <div className="!flex !items-start !gap-3">
                  <div className="!w-6 !h-6 !bg-amber-100 !rounded-full !flex !items-center !justify-center !flex-shrink-0 !mt-1">
                    <span className="!text-amber-600 !text-sm !font-bold">3</span>
                  </div>
                  <div>
                    <p className="!font-semibold !text-gray-800">Flexible Timing</p>
                    <p className="!text-gray-600 !text-sm">Perfect post-workout or any time of day</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Steps */}
            <div className="!space-y-4">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className="!group !bg-white/90 !backdrop-blur-sm !rounded-2xl !p-6 !shadow-lg hover:!shadow-xl !transition-all !duration-300 !border !border-amber-100 hover:!border-amber-200 !relative !overflow-hidden"
                >
                  {/* Step Number Background */}
                  <div className="!absolute !top-0 !right-0 !w-16 !h-16 !bg-gradient-to-br from-amber-500 to-orange-500 !rounded-bl-2xl !flex !items-center !justify-center">
                    <span className="!text-white !font-bold !text-lg">{index + 1}</span>
                  </div>
                  
                  <div className="!flex !items-start !gap-4 !pr-12">
                    {/* Icon */}
                    <div className="!w-12 !h-12 !bg-gradient-to-br from-amber-400 to-orange-400 !rounded-xl !flex !items-center !justify-center !shadow-lg group-hover:!scale-110 !transition-transform !duration-300">
                      <div className="!text-white">
                        {step.icon}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="!flex-1">
                      <h4 className="!text-lg !font-bold !text-gray-900 !mb-2 group-hover:!text-gray-800 !transition-colors">
                        {step.title}
                      </h4>
                      <p className="!text-gray-600 !mb-2 !leading-relaxed">
                        {step.description}
                      </p>
                      <p className="!text-sm !text-amber-600 !mb-2 !font-medium">
                        💡 {step.tip}
                      </p>
                    </div>
                  </div>
                  
                  {/* Hover Effect */}
                  <div className="!absolute !inset-0 !bg-gradient-to-r from-amber-500 to-orange-500 !opacity-0 group-hover:!opacity-5 !transition-opacity !duration-300 !rounded-2xl"></div>
                </div>
              ))}
            </div>

            {/* Benefits */}
            <div className="!bg-gradient-to-r from-amber-500 to-orange-500 !rounded-2xl !p-6 !text-white !shadow-lg">
              <h4 className="!font-bold !text-lg !mb-4 !flex !items-center !gap-2">
                <span className="!w-6 !h-6 !bg-white/20 !rounded-full !flex !items-center !justify-center">
                  ✓
                </span>
                Key Benefits
              </h4>
              
              <div className="!grid !grid-cols-1 sm:!grid-cols-2 !gap-2">
                {benefits.map((benefit, index) => (
                  <div key={index} className="!flex !items-center !gap-2 !text-sm">
                    <div className="!w-4 !h-4 !bg-white/20 !rounded-full !flex !items-center !justify-center !flex-shrink-0">
                      <CheckCircle className="!w-3 !h-3" />
                    </div>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            {/* <button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 rounded-2xl font-bold text-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-3 group">
              <span>Start Your Journey</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button> */}
          </div>
        </div>

        {/* Bottom Note */}
        {/* <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg border border-amber-200">
            <span className="text-amber-500">💡</span>
            <span className="text-sm text-gray-600">
              <strong>Pro Tip:</strong> For best results, use cold liquids and consume immediately after mixing
            </span>
          </div>
        </div> */}
      </div>
    </section>
  );
}