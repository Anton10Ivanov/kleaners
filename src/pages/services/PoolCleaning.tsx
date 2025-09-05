import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { poolCleaningData } from "@/data/services/poolCleaning";
import { useNavigate } from "react-router-dom";

const PoolCleaning = () => {
  const navigate = useNavigate();

  const handleBookingClick = () => {
    navigate("/booking");
  };

  // Convert data format to match ServicePageTemplate
  const features = poolCleaningData.features.map((feature, index) => ({
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
      title={poolCleaningData.title}
      subtitle={poolCleaningData.subtitle}
      description={poolCleaningData.valueProposition}
      heroImage={poolCleaningData.heroImage}
      features={features}
      benefits={benefits}
      startingPrice={poolCleaningData.startingPrice}
      responseTime={poolCleaningData.responseTime}
      faqs={poolCleaningData.faqs}
      onBookingClick={handleBookingClick}
      showPackages={false}
    />
  );
};

export default PoolCleaning;






