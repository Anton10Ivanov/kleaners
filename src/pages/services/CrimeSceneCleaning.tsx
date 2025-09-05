<<<<<<< HEAD
﻿import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { crimeSceneCleaningData } from "@/data/services/crimeSceneCleaning";
import { useNavigate } from "react-router-dom";

const CrimeSceneCleaning = () => {
  const navigate = useNavigate();

  const handleBookingClick = () => {
    navigate("/booking");
  };

  // Convert data format to match ServicePageTemplate
  const features = crimeSceneCleaningData.features.map((feature, index) => ({
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
      title={crimeSceneCleaningData.title}
      subtitle={crimeSceneCleaningData.subtitle}
      description={crimeSceneCleaningData.valueProposition}
      heroImage={crimeSceneCleaningData.heroImage}
      features={features}
      benefits={benefits}
      startingPrice={crimeSceneCleaningData.startingPrice}
      responseTime={crimeSceneCleaningData.responseTime}
      faqs={crimeSceneCleaningData.faqs}
      onBookingClick={handleBookingClick}
      showPackages={false}
    />
  );
};

export default CrimeSceneCleaning;






=======

import ModernServiceTemplate from "@/components/services/ModernServiceTemplate";
import { crimeSceneCleaningData } from "@/data/services/crimeSceneCleaning";

const CrimeSceneCleaning = () => {
  return <ModernServiceTemplate data={crimeSceneCleaningData} />;
};

export default CrimeSceneCleaning;
>>>>>>> dc44d81132ea9da53ee6737f03f43d7881530caf
