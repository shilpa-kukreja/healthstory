import { FaLeaf } from "react-icons/fa";

const benefits = [
  { 
    title: "Immunity Boost", 
    description: "Enhance your body's natural defense system with powerful antioxidants" 
  },
  { 
    title: "Body Toning", 
    description: "Achieve lean muscle definition and improved physique" 
  },
  { 
    title: "Muscle Building", 
    description: "Support muscle growth and recovery with essential nutrients" 
  },
  { 
    title: "Energy Support", 
    description: "Sustain energy levels throughout your day naturally" 
  },
  { 
    title: "Complete Nutrition", 
    description: "Comprehensive blend of vitamins, minerals, and phytonutrients" 
  },
  { 
    title: "Antioxidant Rich", 
    description: "Combat oxidative stress and promote cellular health" 
  },
];

export default function BenefitsGrid() {
  return (
    <div className=" !mx-auto !bg-[#fffaf2] !px-6 !py-12 ">
      <div className="!text-center !mb-12">
        <h2 className="!text-3xl !font-bold text-[#99b551] !mb-3">Key Benefits</h2>
        <p className="!text-lg text-[#e07000] !max-w-2xl !mx-auto">
          Our natural formula delivers comprehensive wellness benefits for your body and mind
        </p>
      </div>
      
      <div className="!grid !grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-3 !gap-4 sm:!gap-6">
        {benefits.map((benefit, index) => (
          <div 
            key={index}
            className="!bg-white !rounded-xl !border-2 !border-[#99b551] !shadow-sm hover:!shadow-md !transition-all !duration-300  !p-3 sm:!p-6 "
          >
            <div className="!flex !items-start !space-x-4">
              <div className="!bg-emerald-50 !p-3 !rounded-full !flex-shrink-0">
                <FaLeaf className="!text-emerald-600 !text-xl" />
              </div>
              <div>
                <h3 className="!text-lg !font-semibold text-[#99b551] !mb-1">{benefit.title}</h3>
                <p className="!text-gray-600">{benefit.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}