<<<<<<< HEAD
﻿import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { holidayApartmentCleaningData } from "@/data/services/holidayApartmentCleaning";
import { useNavigate } from "react-router-dom";

const HolidayApartmentCleaning = () => {
  const navigate = useNavigate();

  const handleBookingClick = () => {
    navigate("/booking");
  };

  // Convert data format to match ServicePageTemplate
  const features = holidayApartmentCleaningData.features.map((feature, index) => ({
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
      title={holidayApartmentCleaningData.title}
      subtitle={holidayApartmentCleaningData.subtitle}
      description={holidayApartmentCleaningData.valueProposition}
      heroImage={holidayApartmentCleaningData.heroImage}
      features={features}
      benefits={benefits}
      startingPrice={holidayApartmentCleaningData.startingPrice}
      responseTime={holidayApartmentCleaningData.responseTime}
      faqs={holidayApartmentCleaningData.faqs}
      onBookingClick={handleBookingClick}
      showPackages={false}
    />
  );
};

export default HolidayApartmentCleaning;






=======

import ModernServiceTemplate from "@/components/services/ModernServiceTemplate";
import { holidayApartmentCleaningData } from "@/data/services/holidayApartmentCleaning";

const HolidayApartmentCleaning = () => {
  return <ModernServiceTemplate data={holidayApartmentCleaningData} />;
};

export default HolidayApartmentCleaning;
>>>>>>> dc44d81132ea9da53ee6737f03f43d7881530caf
