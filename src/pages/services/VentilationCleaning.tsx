import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { ventilationCleaningData } from "@/data/services/ventilationCleaning";
import { useNavigate } from "react-router-dom";

const VentilationCleaning = () => {
  const navigate = useNavigate();

  const handleBookingClick = () => {
    navigate("/booking");
  };

  // Convert data format to match ServicePageTemplate
  const features = ventilationCleaningData.features.map((feature, index) => ({
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
      title={ventilationCleaningData.title}
      subtitle={ventilationCleaningData.subtitle}
      description={ventilationCleaningData.valueProposition}
      heroImage={ventilationCleaningData.heroImage}
      features={features}
      benefits={benefits}
      startingPrice={ventilationCleaningData.startingPrice}
      responseTime={ventilationCleaningData.responseTime}
      faqs={ventilationCleaningData.faqs}
      onBookingClick={handleBookingClick}
      showPackages={false}
    />
  );
};

export default VentilationCleaning;






