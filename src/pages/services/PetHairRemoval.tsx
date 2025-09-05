import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { petHairRemovalData } from "@/data/services/petHairRemoval";
import { useNavigate } from "react-router-dom";

const PetHairRemoval = () => {
  const navigate = useNavigate();

  const handleBookingClick = () => {
    navigate("/booking");
  };

  // Convert data format to match ServicePageTemplate
  const features = petHairRemovalData.features.map((feature, index) => ({
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
      title={petHairRemovalData.title}
      subtitle={petHairRemovalData.subtitle}
      description={petHairRemovalData.valueProposition}
      heroImage={petHairRemovalData.heroImage}
      features={features}
      benefits={benefits}
      startingPrice={petHairRemovalData.startingPrice}
      responseTime={petHairRemovalData.responseTime}
      faqs={petHairRemovalData.faqs}
      onBookingClick={handleBookingClick}
      showPackages={false}
    />
  );
};

export default PetHairRemoval;






