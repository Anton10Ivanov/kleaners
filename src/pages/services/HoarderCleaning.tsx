import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { hoarderCleaningData } from "@/data/services/hoarderCleaning";
import { useNavigate } from "react-router-dom";

const HoarderCleaning = () => {
  const navigate = useNavigate();

  const handleBookingClick = () => {
    navigate("/booking");
  };

  // Convert data format to match ServicePageTemplate
  const features = hoarderCleaningData.features.map((feature, index) => ({
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
      title={hoarderCleaningData.title}
      subtitle={hoarderCleaningData.subtitle}
      description={hoarderCleaningData.valueProposition}
      heroImage={hoarderCleaningData.heroImage}
      features={features}
      benefits={benefits}
      startingPrice={hoarderCleaningData.startingPrice}
      responseTime={hoarderCleaningData.responseTime}
      faqs={hoarderCleaningData.faqs}
      onBookingClick={handleBookingClick}
      showPackages={false}
    />
  );
};

export default HoarderCleaning;






