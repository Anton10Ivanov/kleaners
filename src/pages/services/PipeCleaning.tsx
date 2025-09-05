<<<<<<< HEAD
﻿import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { pipeCleaningData } from "@/data/services/pipeCleaning";
import { useNavigate } from "react-router-dom";

const PipeCleaning = () => {
  const navigate = useNavigate();

  const handleBookingClick = () => {
    navigate("/booking");
  };

  // Convert data format to match ServicePageTemplate
  const features = pipeCleaningData.features.map((feature, index) => ({
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
      title={pipeCleaningData.title}
      subtitle={pipeCleaningData.subtitle}
      description={pipeCleaningData.valueProposition}
      heroImage={pipeCleaningData.heroImage}
      features={features}
      benefits={benefits}
      startingPrice={pipeCleaningData.startingPrice}
      responseTime={pipeCleaningData.responseTime}
      faqs={pipeCleaningData.faqs}
      onBookingClick={handleBookingClick}
      showPackages={false}
    />
  );
};

export default PipeCleaning;






=======

import ModernServiceTemplate from "@/components/services/ModernServiceTemplate";
import { pipeCleaningData } from "@/data/services/pipeCleaning";

const PipeCleaning = () => {
  return <ModernServiceTemplate data={pipeCleaningData} />;
};

export default PipeCleaning;
>>>>>>> dc44d81132ea9da53ee6737f03f43d7881530caf
