import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { disinfectionCleaningData } from "@/data/services/disinfectionCleaning";
import { useNavigate } from "react-router-dom";

const DisinfectionCleaning = () => {
  const navigate = useNavigate();

  const handleBookingClick = () => {
    navigate("/booking");
  };

  // Convert data format to match ServicePageTemplate
  const features = disinfectionCleaningData.features.map((feature, index) => ({
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
      title={disinfectionCleaningData.title}
      subtitle={disinfectionCleaningData.subtitle}
      description={disinfectionCleaningData.valueProposition}
      heroImage={disinfectionCleaningData.heroImage}
      features={features}
      benefits={benefits}
      startingPrice={disinfectionCleaningData.startingPrice}
      responseTime={disinfectionCleaningData.responseTime}
      faqs={disinfectionCleaningData.faqs}
      onBookingClick={handleBookingClick}
      showPackages={false}
    />
  );
};

export default DisinfectionCleaning;






