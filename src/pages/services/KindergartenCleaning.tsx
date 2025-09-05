import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { kindergartenCleaningData } from "@/data/services/kindergartenCleaning";
import { useNavigate } from "react-router-dom";

const KindergartenCleaning = () => {
  const navigate = useNavigate();

  const handleBookingClick = () => {
    navigate("/booking");
  };

  // Convert data format to match ServicePageTemplate
  const features = kindergartenCleaningData.features.map((feature, index) => ({
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
      title={kindergartenCleaningData.title}
      subtitle={kindergartenCleaningData.subtitle}
      description={kindergartenCleaningData.valueProposition}
      heroImage={kindergartenCleaningData.heroImage}
      features={features}
      benefits={benefits}
      startingPrice={kindergartenCleaningData.startingPrice}
      responseTime={kindergartenCleaningData.responseTime}
      faqs={kindergartenCleaningData.faqs}
      onBookingClick={handleBookingClick}
      showPackages={false}
    />
  );
};

export default KindergartenCleaning;






