import { Leaf, BadgeCheck, ShieldCheck } from "lucide-react";

const promiseItems = [
  {
    icon: <Leaf className="w-10 h-10 text-[#5c8d3e]" />,
    title: "Natural Plant Based Ingredients",
    description:
      "We use all plant-based ingredients at the most effective levels for your nutrition & wellbeing, carefully selected for their purity and potency.",
  },
  {
    icon: <BadgeCheck className="w-10 h-10 text-[#5c8d3e]" />,
    title: "Clean & Certified",
    description: "Our products are clinically tested, rigorously certified, and meet the highest industry standards for quality and safety.",
  },
  {
    icon: <ShieldCheck className="w-10 h-10 text-[#5c8d3e]" />,
    title: "Science-Backed Formulations",
    description:
      "We formulate based on evidence, not trends. Every claim is supported by research, with no fear-mongering or meaningless promises.",
  },
];

export default function Whychooseus() {
  return (
    <section className="!bg-gradient-to-b from-[#fef8f2] to-[#fef1e6] !py-20 !px-4">
      <div className="!max-w-6xl !mx-auto">
        <div className="!text-center !mb-16">
          <h2 className="!text-4xl !font-bold !text-[#3a4a2d] !mb-4">
            The Health Story <span className="!text-[#d97d0d]"></span>
          </h2>
          <p className="!text-lg !text-[#5c5c5c] !max-w-2xl !mx-auto">
            Our commitment to quality, transparency, and your wellbeing sets us apart
          </p>
        </div>
        
        <div className="!grid md:!grid-cols-3 !gap-8">
          {promiseItems.map((item, idx) => (
            <div 
              key={idx} 
              className="!bg-white !p-8 !rounded-xl !shadow-sm hover:!shadow-md !transition-all !duration-300 !border  !border-b-4 !border-[#feca60]"
            >
              <div className="!flex !flex-col !items-center !text-center">
                <div className="!bg-[#f5f9f1] !p-4 !rounded-full !mb-6">
                  {item.icon}
                </div>
                <h3 className="!text-xl !font-semibold !text-[#3a4a2d] !mb-3">
                  {item.title}
                </h3>
                <p className="!text-[#5c5c5c] !leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* <div className="mt-16 text-center">
          <button className="bg-[#5c8d3e] hover:bg-[#4a7530] text-white font-medium py-3 px-8 rounded-full transition-colors duration-300">
            Learn More About Our Standards
          </button>
        </div> */}
      </div>
    </section>
  );
}