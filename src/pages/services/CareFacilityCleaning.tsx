import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { careFacilityCleaningData } from "@/data/services/careFacilityCleaning";
import { useNavigate } from "react-router-dom";

const CareFacilityCleaning = () => {
  const navigate = useNavigate();

  const handleBookingClick = () => {
    navigate("/booking");
  };

  // Convert data format to match ServicePageTemplate
  const features = careFacilityCleaningData.features.map((feature, index) => ({
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
      title={careFacilityCleaningData.title}
      subtitle={careFacilityCleaningData.subtitle}
      description={careFacilityCleaningData.valueProposition}
      heroImage={careFacilityCleaningData.heroImage}
      features={features}
      benefits={benefits}
      startingPrice={careFacilityCleaningData.startingPrice}
      responseTime={careFacilityCleaningData.responseTime}
      faqs={careFacilityCleaningData.faqs}
      onBookingClick={handleBookingClick}
      showPackages={false}
    />
  );
};

export default CareFacilityCleaning;






