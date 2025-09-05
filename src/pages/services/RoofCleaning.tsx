import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { roofCleaningData } from "@/data/services/roofCleaning";
import { useNavigate } from "react-router-dom";

const RoofCleaning = () => {
  const navigate = useNavigate();

  const handleBookingClick = () => {
    navigate("/booking");
  };

  // Convert data format to match ServicePageTemplate
  const features = roofCleaningData.features.map((feature, index) => ({
    id: `feature-${index}`,
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
      title={roofCleaningData.title}
      subtitle={roofCleaningData.subtitle}
      description={roofCleaningData.valueProposition}
      heroImage={roofCleaningData.heroImage}
      features={features}
      benefits={benefits}
      startingPrice={roofCleaningData.startingPrice}
      responseTime={roofCleaningData.responseTime}
      faqs={roofCleaningData.faqs}
      onBookingClick={handleBookingClick}
      showPackages={false}
    />
  );
};

export default RoofCleaning;






