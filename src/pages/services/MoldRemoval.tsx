import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { moldRemovalData } from "@/data/services/moldRemoval";
import { useNavigate } from "react-router-dom";

const MoldRemoval = () => {
  const navigate = useNavigate();

  const handleBookingClick = () => {
    navigate("/booking");
  };

  // Convert data format to match ServicePageTemplate
  const features = moldRemovalData.features.map((feature, index) => ({
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
      title={moldRemovalData.title}
      subtitle={moldRemovalData.subtitle}
      description={moldRemovalData.valueProposition}
      heroImage={moldRemovalData.heroImage}
      features={features}
      benefits={benefits}
      startingPrice={moldRemovalData.startingPrice}
      responseTime={moldRemovalData.responseTime}
      faqs={moldRemovalData.faqs}
      onBookingClick={handleBookingClick}
      showPackages={false}
    />
  );
};

export default MoldRemoval;






