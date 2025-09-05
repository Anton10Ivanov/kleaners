<<<<<<< HEAD
﻿import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { glassCleaningWinterGardenData } from "@/data/services/glassCleaningWinterGarden";
import { useNavigate } from "react-router-dom";

const GlassCleaningWinterGarden = () => {
  const navigate = useNavigate();

  const handleBookingClick = () => {
    navigate("/booking");
  };

  // Convert data format to match ServicePageTemplate
  const features = glassCleaningWinterGardenData.features.map((feature, index) => ({
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
      title={glassCleaningWinterGardenData.title}
      subtitle={glassCleaningWinterGardenData.subtitle}
      description={glassCleaningWinterGardenData.valueProposition}
      heroImage={glassCleaningWinterGardenData.heroImage}
      features={features}
      benefits={benefits}
      startingPrice={glassCleaningWinterGardenData.startingPrice}
      responseTime={glassCleaningWinterGardenData.responseTime}
      faqs={glassCleaningWinterGardenData.faqs}
      onBookingClick={handleBookingClick}
      showPackages={false}
    />
  );
};

export default GlassCleaningWinterGarden;






=======

import ModernServiceTemplate from "@/components/services/ModernServiceTemplate";
import { glassCleaningWinterGardenData } from "@/data/services/glassCleaningWinterGarden";

const GlassCleaningWinterGarden = () => {
  return <ModernServiceTemplate data={glassCleaningWinterGardenData} />;
};

export default GlassCleaningWinterGarden;
>>>>>>> dc44d81132ea9da53ee6737f03f43d7881530caf
