<<<<<<< HEAD
﻿import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { gardeningData } from "@/data/services/gardening";
import { useNavigate } from "react-router-dom";

const Gardening = () => {
  const navigate = useNavigate();

  const handleBookingClick = () => {
    navigate("/booking");
  };

  // Convert data format to match ServicePageTemplate
  const features = gardeningData.features.map((feature, index) => ({
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
      title={gardeningData.title}
      subtitle={gardeningData.subtitle}
      description={gardeningData.valueProposition}
      heroImage={gardeningData.heroImage}
      features={features}
      benefits={benefits}
      startingPrice={gardeningData.startingPrice}
      responseTime={gardeningData.responseTime}
      faqs={gardeningData.faqs}
      onBookingClick={handleBookingClick}
      showPackages={false}
    />
  );
};

export default Gardening;






=======

import ModernServiceTemplate from "@/components/services/ModernServiceTemplate";
import { gardeningData } from "@/data/services/gardening";

const Gardening = () => {
  return <ModernServiceTemplate data={gardeningData} />;
};

export default Gardening;
>>>>>>> dc44d81132ea9da53ee6737f03f43d7881530caf
