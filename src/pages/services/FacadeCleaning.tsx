import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { facadeCleaningData } from "@/data/services/facadeCleaning";
import { useNavigate } from "react-router-dom";

const FacadeCleaning = () => {
  const navigate = useNavigate();

  const handleBookingClick = () => {
    navigate("/booking");
  };

  // Convert data format to match ServicePageTemplate
  const features = facadeCleaningData.features.map((feature, index) => ({
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
      title={facadeCleaningData.title}
      subtitle={facadeCleaningData.subtitle}
      description={facadeCleaningData.valueProposition}
      heroImage={facadeCleaningData.heroImage}
      features={features}
      benefits={benefits}
      startingPrice={facadeCleaningData.startingPrice}
      responseTime={facadeCleaningData.responseTime}
      faqs={facadeCleaningData.faqs}
      onBookingClick={handleBookingClick}
      showPackages={false}
    />
  );
};

export default FacadeCleaning;






