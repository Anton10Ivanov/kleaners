<<<<<<< HEAD
﻿import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { vehicleCleaningData } from "@/data/services/vehicleCleaning";
import { useNavigate } from "react-router-dom";

const VehicleCleaning = () => {
  const navigate = useNavigate();

  const handleBookingClick = () => {
    navigate("/booking");
  };

  // Convert data format to match ServicePageTemplate
  const features = vehicleCleaningData.features.map((feature, index) => ({
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
      title={vehicleCleaningData.title}
      subtitle={vehicleCleaningData.subtitle}
      description={vehicleCleaningData.valueProposition}
      heroImage={vehicleCleaningData.heroImage}
      features={features}
      benefits={benefits}
      startingPrice={vehicleCleaningData.startingPrice}
      responseTime={vehicleCleaningData.responseTime}
      faqs={vehicleCleaningData.faqs}
      onBookingClick={handleBookingClick}
      showPackages={false}
    />
  );
};

export default VehicleCleaning;






=======

import ModernServiceTemplate from "@/components/services/ModernServiceTemplate";
import { vehicleCleaningData } from "@/data/services/vehicleCleaning";

const VehicleCleaning = () => {
  return <ModernServiceTemplate data={vehicleCleaningData} />;
};

export default VehicleCleaning;
>>>>>>> dc44d81132ea9da53ee6737f03f43d7881530caf
