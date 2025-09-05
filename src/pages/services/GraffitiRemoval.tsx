<<<<<<< HEAD
﻿import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { graffitiRemovalData } from "@/data/services/graffitiRemoval";
import { useNavigate } from "react-router-dom";

const GraffitiRemoval = () => {
  const navigate = useNavigate();

  const handleBookingClick = () => {
    navigate("/booking");
  };

  // Convert data format to match ServicePageTemplate
  const features = graffitiRemovalData.features.map((feature, index) => ({
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
      title={graffitiRemovalData.title}
      subtitle={graffitiRemovalData.subtitle}
      description={graffitiRemovalData.valueProposition}
      heroImage={graffitiRemovalData.heroImage}
      features={features}
      benefits={benefits}
      startingPrice={graffitiRemovalData.startingPrice}
      responseTime={graffitiRemovalData.responseTime}
      faqs={graffitiRemovalData.faqs}
      onBookingClick={handleBookingClick}
      showPackages={false}
    />
  );
};

export default GraffitiRemoval;






=======

import ModernServiceTemplate from "@/components/services/ModernServiceTemplate";
import { graffitiRemovalData } from "@/data/services/graffitiRemoval";

const GraffitiRemoval = () => {
  return <ModernServiceTemplate data={graffitiRemovalData} />;
};

export default GraffitiRemoval;
>>>>>>> dc44d81132ea9da53ee6737f03f43d7881530caf
