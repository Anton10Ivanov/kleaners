<<<<<<< HEAD
﻿
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { carpetCleaningData } from "@/data/services/carpetCleaning";
import { useNavigate } from "react-router-dom";

const CarpetCleaning = () => {
  const navigate = useNavigate();

  const handleBookingClick = () => {
    navigate("/booking");
  };

  // Convert data format to match ServicePageTemplate
  const features = carpetCleaningData.features.map((feature, index) => ({
    id: `feature-${index}`,
    title: feature.title,
    description: feature.description,
    icon: <feature.icon className="h-full w-full" />
  }));

  const benefits = [
    "Remove deep-set dirt, stains, and allergens",
    "Extend carpet lifespan with professional care", 
    "Improve indoor air quality and hygiene",
    "Fast drying with minimal disruption",
    "Guaranteed satisfaction on all services"
  ];

  return (
    <ServicePageTemplate
      title={carpetCleaningData.title}
      subtitle={carpetCleaningData.subtitle}
      description={carpetCleaningData.valueProposition}
      heroImage={carpetCleaningData.heroImage}
      features={features}
      benefits={benefits}
      startingPrice={carpetCleaningData.startingPrice}
      responseTime={carpetCleaningData.responseTime}
      faqs={carpetCleaningData.faqs}
      onBookingClick={handleBookingClick}
      showPackages={false}
    />
  );
};

export default CarpetCleaning;






=======

import ModernServiceTemplate from "@/components/services/ModernServiceTemplate";
import { carpetCleaningData } from "@/data/services/carpetCleaning";

const CarpetCleaning = () => {
  return <ModernServiceTemplate data={carpetCleaningData} />;
};

export default CarpetCleaning;
>>>>>>> dc44d81132ea9da53ee6737f03f43d7881530caf
