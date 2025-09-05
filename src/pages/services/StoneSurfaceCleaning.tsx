<<<<<<< HEAD
﻿import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { stoneSurfaceCleaningData } from "@/data/services/stoneSurfaceCleaning";
import { useNavigate } from "react-router-dom";

const StoneSurfaceCleaning = () => {
  const navigate = useNavigate();

  const handleBookingClick = () => {
    navigate("/booking");
  };

  // Convert data format to match ServicePageTemplate
  const features = stoneSurfaceCleaningData.features.map((feature, index) => ({
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
      title={stoneSurfaceCleaningData.title}
      subtitle={stoneSurfaceCleaningData.subtitle}
      description={stoneSurfaceCleaningData.valueProposition}
      heroImage={stoneSurfaceCleaningData.heroImage}
      features={features}
      benefits={benefits}
      startingPrice={stoneSurfaceCleaningData.startingPrice}
      responseTime={stoneSurfaceCleaningData.responseTime}
      faqs={stoneSurfaceCleaningData.faqs}
      onBookingClick={handleBookingClick}
      showPackages={false}
    />
  );
};

export default StoneSurfaceCleaning;






=======

import ModernServiceTemplate from "@/components/services/ModernServiceTemplate";
import { stoneSurfaceCleaningData } from "@/data/services/stoneSurfaceCleaning";

const StoneSurfaceCleaning = () => {
  return <ModernServiceTemplate data={stoneSurfaceCleaningData} />;
};

export default StoneSurfaceCleaning;
>>>>>>> dc44d81132ea9da53ee6737f03f43d7881530caf
