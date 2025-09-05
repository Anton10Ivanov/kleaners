<<<<<<< HEAD
﻿import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { constructionCleaningData } from "@/data/services/constructionCleaning";
import { useNavigate } from "react-router-dom";

const ConstructionCleaning = () => {
  const navigate = useNavigate();

  const handleBookingClick = () => {
    navigate("/booking");
  };

  // Convert data format to match ServicePageTemplate
  const features = constructionCleaningData.features.map((feature, index) => ({
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
      title={constructionCleaningData.title}
      subtitle={constructionCleaningData.subtitle}
      description={constructionCleaningData.valueProposition}
      heroImage={constructionCleaningData.heroImage}
      features={features}
      benefits={benefits}
      startingPrice={constructionCleaningData.startingPrice}
      responseTime={constructionCleaningData.responseTime}
      faqs={constructionCleaningData.faqs}
      onBookingClick={handleBookingClick}
      showPackages={false}
    />
  );
};

export default ConstructionCleaning;






=======

import ModernServiceTemplate from "@/components/services/ModernServiceTemplate";
import { constructionCleaningData } from "@/data/services/constructionCleaning";

const ConstructionCleaning = () => {
  return <ModernServiceTemplate data={constructionCleaningData} />;
};

export default ConstructionCleaning;
>>>>>>> dc44d81132ea9da53ee6737f03f43d7881530caf
