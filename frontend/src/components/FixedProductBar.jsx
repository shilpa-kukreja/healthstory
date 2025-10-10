import { useState, useEffect } from 'react';
import { ShoppingBag, Heart, ArrowRight } from 'lucide-react';

const FixedProductBar = ({ product, selectedVariant, quantity, handleBuyNow, isLoading }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollThreshold = 300;
            setIsVisible(window.scrollY > scrollThreshold);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!isVisible || !product) return null;

    const displayPrice = selectedVariant ? selectedVariant.discountPrice : product.discountPrice;
    const displayName = product.name;

    return (
        <>
            {/* Fixed Product Bar */}
            <div className="!fixed !bottom-0 !left-0 !right-0 !bg-white/95 !backdrop-blur-lg !border-t !border-gray-200 !shadow-2xl !z-50 !transform !transition-all !duration-500 !ease-out"
                style={{
                    transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
                    animation: 'slideUp 0.5s ease-out'
                }}>
                <div className="!max-w-7xl !mx-auto !px-4 sm:!py-8 !py-4">
                    <div className="!flex sm:!flex-row !flex-col !items-center !justify-between !gap-6">
                        {/* Product Info */}
                        <div className="!flex !items-center !gap-4 !flex-1 !min-w-0">
                            {/* Product Image */}
                            <div className="!w-16 !h-16 !rounded-xl !overflow-hidden !shadow-lg !border !border-gray-100 !flex-shrink-0">
                                <img
                                    src={product.thumbImg ? `https://healthstory.net.in/uploads/thumbImg/${product.thumbImg}` : "/placeholder.jpg"}
                                    alt={displayName}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Product Details */}
                            <div className="!flex-1 !min-w-0">
                                <h3 className="!font-bold !text-gray-900 !text-lg !truncate">
                                    24gm-plant-protein
                                </h3>
                                <div className="!flex !items-center !gap-2 !mt-1">
                                    <span className="!text-2xl !font-bold !text-amber-600">
                                        ₹{displayPrice}
                                    </span>
                                    {product.price && product.price > displayPrice && (
                                        <span className="!text-lg !text-gray-500 !line-through">
                                            ₹{product.price}
                                        </span>
                                    )}
                                    {quantity > 1 && (
                                        <span className="!text-sm !text-gray-600 !bg-gray-100 !px-2 !py-1 !rounded-full">
                                            {quantity} × ₹{displayPrice}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="!flex !items-center !gap-4 !flex-shrink-0">
                            {/* Wishlist Button */}
                            {/* <button className="!group !p-3 !rounded-xl !border !border-gray-300 hover:!border-red-300 hover:!bg-red-50 !transition-all !duration-300">
                <Heart 
                  className="!w-6 !h-6 !text-gray-400 group-hover:!text-red-500 group-hover:!scale-110 !transition-all !duration-300" 
                  strokeWidth={1.5}
                />
              </button> */}

                            {/* Buy Now Button with Heartbeat Effect */}
                            <button
                                onClick={handleBuyNow}
                                disabled={isLoading}
                                className="!group !relative !bg-[#368117] !text-white !px-8  !py-4 !rounded-2xl !font-bold !text-lg hover:!from-amber-600 hover:!to-orange-600 !transition-all !duration-300 !transform hover:!scale-105 !shadow-lg hover:!shadow-xl !flex !items-center !gap-3 !min-w-[160px] !justify-center !overflow-hidden"
                            >
                                {/* Heartbeat Animation */}
                                <div className="!absolute !inset-0 !bg-gradient-to-r from-white/20 to-transparent !animate-pulse-slow"></div>
                                <div className="!absolute -inset-1 !bg-gradient-to-r from-amber-400 to-orange-400 !rounded-2xl !opacity-0 group-hover:!opacity-100 !blur-md !transition-all !duration-500 !animate-heartbeat"></div>

                                {/* Button Content */}
                                <div className="!relative !z-10 !flex !items-center !gap-2">
                                    {isLoading ? (
                                        <>
                                            <div className="!w-5 !h-5 !border-2 !border-white !border-t-transparent !rounded-full !animate-spin"></div>
                                            <span>Processing...</span>
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingBag className="!w-5 !h-5 group-hover:!scale-110 !transition-transform !duration-300" />
                                            <span>Buy Now</span>
                                            <ArrowRight className="!w-4 !h-4 group-hover:!translate-x-1 !transition-transform !duration-300" />
                                        </>
                                    )}
                                </div>

                                {/* Ripple Effect */}
                                <div className="!absolute !inset-0 !overflow-hidden !rounded-2xl">
                                    <div className="!absolute !inset-0 !bg-gradient-to-r from-white/0 via-white/20 to-white/0 !translate-x-[-100%] group-hover:!translate-x-[100%] !transition-transform !duration-1000"></div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="!absolute !bottom-0 !left-0 !w-full !h-1 !bg-gray-200">
                    <div
                        className="!h-full !bg-gradient-to-r from-amber-500 to-orange-500 !transition-all !duration-300"
                        style={{
                            width: `${Math.min((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100, 100)}%`
                        }}
                    ></div>
                </div>
            </div>

            {/* Spacer to prevent content from being hidden behind fixed bar */}
            <div className="!h-24"></div>

  <style jsx>{`
  @keyframes slideUp {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  /* Strong visible heartbeat effect */
  @keyframes heartbeat {
    0% {
      transform: scale(1);
      opacity: 0.4;
    }
    25% {
      transform: scale(1.15);
      opacity: 0.7;
    }
    40% {
      transform: scale(1);
      opacity: 0.4;
    }
    60% {
      transform: scale(1.15);
      opacity: 0.7;
    }
    100% {
      transform: scale(1);
      opacity: 0.4;
    }
  }

  /* Smooth breathing glow (background shimmer) */
  @keyframes pulse {
    0%, 100% {
      opacity: 0.3;
      transform: scale(1);
    }
    50% {
      opacity: 0.6;
      transform: scale(1.03);
    }
  }

  .animate-heartbeat {
    animation: heartbeat 1.8s ease-in-out infinite;
  }

  .animate-pulse-slow {
    animation: pulse 3s ease-in-out infinite;
  }
`}</style>


        </>
    );
};

export default FixedProductBar;