import soap5 from '../assets/Image/productImg/lastImage.jpg';


const points = [
  {
    title: "24g Plant Protein",
    desc: "Clean vegan protein from pea, brown rice and quinoa containing all nine essential amino acids for optimal nutrition.",
    icon: "🌱"
  },
  {
    title: "Strength & Immunity",
    desc: "Our unique protein blend with Blue Spirulina fights inflammation, enhances recovery, and strengthens immunity.",
    icon: "🛡️"
  },
  {
    title: "Muscle Growth Support",
    desc: "Highly bioavailable amino acids combined with superfoods for effective muscle development and maintenance.",
    icon: "💪"
  },
  {
    title: "Enhanced Recovery",
    desc: "Advanced formula repairs muscle tissue to accelerate recovery and restore energy levels post-workout.",
    icon: "⚡"
  },
  {
    title: "Body Toning",
    desc: "Plant-based protein and fiber work synergistically to boost metabolism while promoting lean muscle tone.",
    icon: "✨"
  },
];

export default function ProductBenefits() {
  return (
    <section className="!w-full !mx-auto !px-4 sm:!px-6 !py-16 md:!py-24">
      <div className="!text-center !mb-16">
        <h2 className="!text-2xl sm:!text-4xl !font-bold  text-[#437a9c] !mb-4">
          Pure. Evolved. Exceptional.
        </h2>
        <p className="!text-base !text-[#447873] !max-w-3xl !mx-auto">
          With 0.8g of protein recommended per kg of body weight, vegetarians often face deficiencies. 
          Health Story plant based protein powder  delivers complete, natural nutrition without synthetic additives.
        </p>
      </div>

      <div className="!grid lg:!grid-cols-2 !gap-12 !items-center">
        <div className="!space-y-8 !order-2 lg:!order-1">
          {points.map((point, index) => (
            <div 
              key={index}
              className="!flex !items-start !gap-5 !p-3 !bg-white !border-2 !border-[#99b551] !rounded-xl !shadow-sm hover:!shadow-md !transition-all !duration-300 "
            >
              <div className="!flex-shrink-0 !bg-emerald-50 !w-12 !h-12 !rounded-full !flex !items-center !justify-center !text-xl">
                {point.icon}
              </div>
              <div>
                <h3 className="!text-base !font-semibold !text-[#e07000] !mb-2">{point.title}</h3>
                <p className="!text-gray-600 !leading-relaxed !text-sm">{point.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="!order-1 lg:!order-2 !relative">
          <img
            src={soap5}
            alt="Cureveda Pro protein product"
            className="!w-full !rounded-2xl !shadow-xl !object-cover"
          />
          <div className="!absolute !-bottom-5 !-right-5 !bg-white !px-6 !py-3 !rounded-lg !shadow-lg">
            <span className="!font-bold !text-emerald-600">100% Natural</span>
          </div>
        </div>
      </div>

      {/* <div className="!mt-16 !text-center">
        <button className="!bg-emerald-600 hover:!bg-emerald-700 !text-white !font-medium !py-3 !px-8 !rounded-full !shadow-md hover:!shadow-lg !transition-all !duration-300 !transform hover:!-translate-y-1">
          Discover the Science
        </button>
      </div> */}
    </section>
  );
}