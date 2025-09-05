import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { stairwellCleaningData } from "@/data/services/stairwellCleaning";
import { useNavigate } from "react-router-dom";

const StairwellCleaning = () => {
  const navigate = useNavigate();

  const handleBookingClick = () => {
    navigate("/booking");
  };

  // Convert data format to match ServicePageTemplate
  const features = stairwellCleaningData.features.map((feature, index) => ({
    id: `feature-${index}`,
    title: feature.title,
    description: feature.description,
    icon: <feature.icon className="h-full w-full" />
  }));

  const benefits = [
    "Professional service with guaranteed results",
    "Experienced and trained cleaning specialists", 
    "Eco-friendly and safe cleaning products",
    "Flexible scheduling to fit your needs",
    "Fully insured and bonded for your protection"
  ];

  return (
    <ServicePageTemplate
      title={stairwellCleaningData.title}
      subtitle={stairwellCleaningData.subtitle}
      description={stairwellCleaningData.valueProposition}
      heroImage={stairwellCleaningData.heroImage}
      features={features}
      benefits={benefits}
      startingPrice={stairwellCleaningData.startingPrice}
      responseTime={stairwellCleaningData.responseTime}
      faqs={stairwellCleaningData.faqs}
      onBookingClick={handleBookingClick}
      showPackages={false}
    />
  );
};

export default StairwellCleaning;






