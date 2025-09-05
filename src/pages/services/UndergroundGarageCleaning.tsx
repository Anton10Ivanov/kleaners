import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { undergroundGarageCleaningData } from "@/data/services/undergroundGarageCleaning";
import { useNavigate } from "react-router-dom";

const UndergroundGarageCleaning = () => {
  const navigate = useNavigate();

  const handleBookingClick = () => {
    navigate("/booking");
  };

  // Convert data format to match ServicePageTemplate
  const features = undergroundGarageCleaningData.features.map((feature, index) => ({
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
      title={undergroundGarageCleaningData.title}
      subtitle={undergroundGarageCleaningData.subtitle}
      description={undergroundGarageCleaningData.valueProposition}
      heroImage={undergroundGarageCleaningData.heroImage}
      features={features}
      benefits={benefits}
      startingPrice={undergroundGarageCleaningData.startingPrice}
      responseTime={undergroundGarageCleaningData.responseTime}
      faqs={undergroundGarageCleaningData.faqs}
      onBookingClick={handleBookingClick}
      showPackages={false}
    />
  );
};

export default UndergroundGarageCleaning;






