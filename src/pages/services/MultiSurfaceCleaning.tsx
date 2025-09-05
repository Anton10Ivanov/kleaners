<<<<<<< HEAD
﻿import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { multiSurfaceCleaningData } from "@/data/services/multiSurfaceCleaning";
import { useNavigate } from "react-router-dom";

const MultiSurfaceCleaning = () => {
  const navigate = useNavigate();

  const handleBookingClick = () => {
    navigate("/booking");
  };

  // Convert data format to match ServicePageTemplate
  const features = multiSurfaceCleaningData.features.map((feature, index) => ({
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
      title={multiSurfaceCleaningData.title}
      subtitle={multiSurfaceCleaningData.subtitle}
      description={multiSurfaceCleaningData.valueProposition}
      heroImage={multiSurfaceCleaningData.heroImage}
      features={features}
      benefits={benefits}
      startingPrice={multiSurfaceCleaningData.startingPrice}
      responseTime={multiSurfaceCleaningData.responseTime}
      faqs={multiSurfaceCleaningData.faqs}
      onBookingClick={handleBookingClick}
      showPackages={false}
    />
  );
};

export default MultiSurfaceCleaning;






=======

import ModernServiceTemplate from "@/components/services/ModernServiceTemplate";
import { multiSurfaceCleaningData } from "@/data/services/multiSurfaceCleaning";

const MultiSurfaceCleaning = () => {
  return <ModernServiceTemplate data={multiSurfaceCleaningData} />;
};

export default MultiSurfaceCleaning;
>>>>>>> dc44d81132ea9da53ee6737f03f43d7881530caf
