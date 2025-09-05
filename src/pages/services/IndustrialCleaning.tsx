<<<<<<< HEAD
﻿import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { industrialCleaningData } from "@/data/services/industrialCleaning";
import { useNavigate } from "react-router-dom";

const IndustrialCleaning = () => {
  const navigate = useNavigate();

  const handleBookingClick = () => {
    navigate("/booking");
  };

  // Convert data format to match ServicePageTemplate
  const features = industrialCleaningData.features.map((feature, index) => ({
    id: `feature-${index}`,
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
      title={industrialCleaningData.title}
      subtitle={industrialCleaningData.subtitle}
      description={industrialCleaningData.valueProposition}
      heroImage={industrialCleaningData.heroImage}
      features={features}
      benefits={benefits}
      startingPrice={industrialCleaningData.startingPrice}
      responseTime={industrialCleaningData.responseTime}
      faqs={industrialCleaningData.faqs}
      onBookingClick={handleBookingClick}
      showPackages={false}
    />
  );
};

export default IndustrialCleaning;






=======

import ModernServiceTemplate from "@/components/services/ModernServiceTemplate";
import { industrialCleaningData } from "@/data/services/industrialCleaning";

const IndustrialCleaning = () => {
  return <ModernServiceTemplate data={industrialCleaningData} />;
};

export default IndustrialCleaning;
>>>>>>> dc44d81132ea9da53ee6737f03f43d7881530caf
