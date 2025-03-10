
import { whyChooseUsContent } from "./WhyChooseUsContent";
import { AdvantageCard } from "./AdvantageCard";

export const FeaturedAdvantages = () => {
  // Featured advantages to display in the grid (limited selection)
  const featuredAdvantages = [
    whyChooseUsContent.find(item => item.title === "Local Cleaners"),
    whyChooseUsContent.find(item => item.title === "Transparent Pricing"),
    whyChooseUsContent.find(item => item.title === "Customizable Service"),
    whyChooseUsContent.find(item => item.title === "Flexible Scheduling"),
    whyChooseUsContent.find(item => item.title === "Fully Insured"),
    whyChooseUsContent.find(item => item.title === "Fast Booking")
  ].filter(Boolean);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3 lg:gap-4 mb-8 md:mb-12">
      {featuredAdvantages.map((item, index) => (
        item && (
          <AdvantageCard
            key={`box-${index}`}
            title={item.title}
            icon={item.icon}
            compact={true}
          />
        )
      ))}
    </div>
  );
};
