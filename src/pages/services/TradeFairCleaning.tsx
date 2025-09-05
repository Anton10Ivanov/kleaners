<<<<<<< HEAD
﻿import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { tradeFairCleaningData } from "@/data/services/tradeFairCleaning";
import { useNavigate } from "react-router-dom";

const TradeFairCleaning = () => {
  const navigate = useNavigate();

  const handleBookingClick = () => {
    navigate("/booking");
  };

  // Convert data format to match ServicePageTemplate
  const features = tradeFairCleaningData.features.map((feature, index) => ({
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
      title={tradeFairCleaningData.title}
      subtitle={tradeFairCleaningData.subtitle}
      description={tradeFairCleaningData.valueProposition}
      heroImage={tradeFairCleaningData.heroImage}
      features={features}
      benefits={benefits}
      startingPrice={tradeFairCleaningData.startingPrice}
      responseTime={tradeFairCleaningData.responseTime}
      faqs={tradeFairCleaningData.faqs}
      onBookingClick={handleBookingClick}
      showPackages={false}
    />
  );
};

export default TradeFairCleaning;






=======

import ModernServiceTemplate from "@/components/services/ModernServiceTemplate";
import { tradeFairCleaningData } from "@/data/services/tradeFairCleaning";

const TradeFairCleaning = () => {
  return <ModernServiceTemplate data={tradeFairCleaningData} />;
};

export default TradeFairCleaning;
>>>>>>> dc44d81132ea9da53ee6737f03f43d7881530caf
