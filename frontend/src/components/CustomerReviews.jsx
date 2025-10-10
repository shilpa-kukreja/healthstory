import React from "react";
import { useState } from "react";
import { Star, Quote, ThumbsUp, Calendar, User } from "lucide-react";

const CustomerReviews = () => {
  const [reviews] = useState([
    {
      id: 1,
      name: "Sarah Chen",
      rating: 5,
      date: "2024-01-15",
      comment: "Absolutely love the authentic Asian ingredients! The quality is exceptional and delivery was super fast. Will definitely order again!",
      verified: true,
      helpful: 12,
      avatar: "SC"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      rating: 4,
      date: "2024-01-12",
      comment: "Great products and reasonable prices. The packaging was secure and everything arrived fresh. Only wish there were more variety in snacks.",
      verified: true,
      helpful: 8,
      avatar: "MR"
    },
    {
      id: 3,
      name: "Emma Thompson",
      rating: 5,
      date: "2024-01-10",
      comment: "Best Asian grocery store online! The customer service is outstanding and products are always authentic. Highly recommended!",
      verified: true,
      helpful: 15,
      avatar: "ET"
    },
    {
      id: 4,
      name: "James Kim",
      rating: 5,
      date: "2024-01-08",
      comment: "As someone who's lived in Asia, I can confirm these products are the real deal. Quality is top-notch and shipping is incredibly fast.",
      verified: true,
      helpful: 20,
      avatar: "JK"
    }
  ]);

  const [helpfulClicked, setHelpfulClicked] = useState([]);

  const handleHelpful = (reviewId) => {
    setHelpfulClicked(prev => [...prev, reviewId]);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={index < rating ? "!text-amber-400 !fill-amber-400" : "!text-gray-300"}
      />
    ));
  };

  return (
    <section className="!py-16 !bg-gradient-to-br from-gray-50 to-white">
      <div className="!max-w-7xl !mx-auto !px-4 sm:!px-6 lg:!px-8">
        {/* Header */}
        <div className="!text-center !mb-16">
          <h2 className="!text-4xl !font-bold !text-gray-900 !mb-4">
            What Our Customers Say
          </h2>
          <p className="!text-xl !text-gray-600 !max-w-2xl !mx-auto">
            Join thousands of satisfied customers who trust us for authentic Asian products
          </p>
          
          {/* Overall Rating */}
          <div className="!mt-8 !flex !items-center !justify-center !gap-4 !bg-white !rounded-2xl !shadow-lg !p-6 !max-w-md !mx-auto">
            <div className="!text-center">
              <div className="!text-5xl !font-bold !text-gray-900">4.8</div>
              <div className="!flex !justify-center !mt-2">
                {renderStars(5)}
              </div>
              <div className="!text-sm !text-gray-500 !mt-1">Based on 2,847 reviews</div>
            </div>
            <div className="!h-16 !w-px !bg-gray-200"></div>
            <div className="!text-center">
              <div className="!text-2xl !font-bold !text-green-600">98%</div>
              <div className="!text-sm !text-gray-600 !mt-1">Recommend</div>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="!grid grid-cols-1 md:!grid-cols-2 lg:!grid-cols-2 xl:!grid-cols-2 !gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="!bg-white !rounded-2xl !shadow-lg hover:!shadow-xl !transition-all !duration-300 !transform hover:-translate-y-1 !p-8 !relative !group"
            >
              {/* Quote Icon */}
              <Quote className="!absolute !top-6 !right-6 !text-lime-100 !w-12 !h-12" />
              
              {/* Header */}
              <div className="!flex !items-start !justify-between !mb-6">
                <div className="!flex !items-center !gap-4">
                  <div className="!w-12 !h-12 !bg-gradient-to-br from-lime-500 to-lime-600 !rounded-full !flex !items-center !justify-center !text-white !font-semibold !text-lg !shadow-md">
                    {review.avatar}
                  </div>
                  <div>
                    <div className="!flex !items-center !gap-2">
                      <h3 className="!font-semibold !text-gray-900">{review.name}</h3>
                      {review.verified && (
                        <span className="!bg-blue-100 !text-blue-600 !text-xs !px-2 !py-1 !rounded-full !font-medium">
                          Verified
                        </span>
                      )}
                    </div>
                    <div className="!flex !items-center !gap-2 !text-gray-500 !text-sm !mt-1">
                      <Calendar size={14} />
                      {new Date(review.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="!flex !items-center !gap-2 !mb-4">
                <div className="!flex">
                  {renderStars(review.rating)}
                </div>
                <span className="!text-sm !text-gray-500 !ml-2">
                  {review.rating}.0/5.0
                </span>
              </div>

              {/* Comment */}
              <p className="!text-gray-700 !leading-relaxed !mb-6 !text-lg">
                {review.comment}
              </p>

              {/* Helpful Section */}
              <div className="!flex !items-center !justify-between !pt-4 !border-t !border-gray-100">
                <button
                  onClick={() => handleHelpful(review.id)}
                  disabled={helpfulClicked.includes(review.id)}
                  className={`!flex !items-center !gap-2 !px-4 !py-2 !rounded-lg !transition-all !duration-200 ${
                    helpfulClicked.includes(review.id)
                      ? "!bg-lime-500 !text-white"
                      : "!bg-gray-100 !text-gray-600 hover:!bg-lime-50 hover:!text-lime-600"
                  }`}
                >
                  <ThumbsUp size={16} />
                  <span>Helpful</span>
                  <span className="!text-sm">({review.helpful})</span>
                </button>
                
                <div className="!flex !items-center !gap-1 !text-gray-400">
                  <User size={14} />
                  <span className="!text-sm">Purchase verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        {/* <div className="!text-center mt-16">
          <div className="bg-gradient-to-r from-lime-500 to-lime-600 rounded-2xl p-8 text-white shadow-lg">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Experience the Difference?
            </h3>
            <p className="text-lime-100 text-lg mb-6 max-w-2xl mx-auto">
              Join our community of satisfied customers and discover authentic Asian flavors delivered to your doorstep.
            </p>
            <button className="bg-white text-lime-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg">
              Shop Now
            </button>
          </div>
        </div> */}
      </div>
    </section>
  );
}

export default CustomerReviews;