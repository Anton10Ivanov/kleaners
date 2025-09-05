import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { upholsteryCleaningData } from "@/data/services/upholsteryCleaning";
import { useNavigate } from "react-router-dom";

const UpholsteryCleaning = () => {
  const navigate = useNavigate();

  const handleBookingClick = () => {
    navigate("/booking");
  };

  // Convert data format to match ServicePageTemplate
  const features = upholsteryCleaningData.features.map((feature, index) => ({
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
      title={upholsteryCleaningData.title}
      subtitle={upholsteryCleaningData.subtitle}
      description={upholsteryCleaningData.valueProposition}
      heroImage={upholsteryCleaningData.heroImage}
      features={features}
      benefits={benefits}
      startingPrice={upholsteryCleaningData.startingPrice}
      responseTime={upholsteryCleaningData.responseTime}
      faqs={upholsteryCleaningData.faqs}
      onBookingClick={handleBookingClick}
      showPackages={false}
    />
  );
};

export default UpholsteryCleaning;






