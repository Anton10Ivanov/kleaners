<<<<<<< HEAD
﻿
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { windowCleaningData } from "@/data/services/windowCleaning";
import { useNavigate } from "react-router-dom";

const WindowCleaning = () => {
  const navigate = useNavigate();

  const handleBookingClick = () => {
    navigate("/booking");
  };

  // Convert data format to match ServicePageTemplate
  const features = windowCleaningData.features.map((feature, index) => ({
    id: `feature-${index}`,
    title: feature.title,
    description: feature.description,
    icon: <feature.icon className="h-full w-full" />
  }));

  const benefits = [
    "Crystal-clear, streak-free windows every time",
    "Enhanced natural light and improved views",
    "Professional safety equipment and techniques",
    "Eco-friendly cleaning solutions",
    "Flexible scheduling including weekends"
  ];

  return (
    <ServicePageTemplate
      title={windowCleaningData.title}
      subtitle={windowCleaningData.subtitle}
      description={windowCleaningData.valueProposition}
      heroImage={windowCleaningData.heroImage}
      features={features}
      benefits={benefits}
      startingPrice={windowCleaningData.startingPrice}
      responseTime={windowCleaningData.responseTime}
      faqs={windowCleaningData.faqs}
      onBookingClick={handleBookingClick}
      showPackages={false}
    />
  );
};

export default WindowCleaning;






=======

import ModernServiceTemplate from "@/components/services/ModernServiceTemplate";
import { windowCleaningData } from "@/data/services/windowCleaning";

const WindowCleaning = () => {
  return <ModernServiceTemplate data={windowCleaningData} />;
};

export default WindowCleaning;
>>>>>>> dc44d81132ea9da53ee6737f03f43d7881530caf
