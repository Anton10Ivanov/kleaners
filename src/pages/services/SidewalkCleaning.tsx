import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { sidewalkCleaningData } from "@/data/services/sidewalkCleaning";
import { useNavigate } from "react-router-dom";

const SidewalkCleaning = () => {
  const navigate = useNavigate();

  const handleBookingClick = () => {
    navigate("/booking");
  };

  // Convert data format to match ServicePageTemplate
  const features = sidewalkCleaningData.features.map((feature, index) => ({
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
      title={sidewalkCleaningData.title}
      subtitle={sidewalkCleaningData.subtitle}
      description={sidewalkCleaningData.valueProposition}
      heroImage={sidewalkCleaningData.heroImage}
      features={features}
      benefits={benefits}
      startingPrice={sidewalkCleaningData.startingPrice}
      responseTime={sidewalkCleaningData.responseTime}
      faqs={sidewalkCleaningData.faqs}
      onBookingClick={handleBookingClick}
      showPackages={false}
    />
  );
};

export default SidewalkCleaning;






