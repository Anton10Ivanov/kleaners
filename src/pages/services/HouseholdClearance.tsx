﻿import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { householdClearanceData } from "@/data/services/householdClearance";
import { useNavigate } from "react-router-dom";

const HouseholdClearance = () => {
  const navigate = useNavigate();

  const handleBookingClick = () => {
    navigate("/booking");
  };

  // Convert data format to match ServicePageTemplate
  const features = householdClearanceData.features.map((feature, index) => ({
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
      title={householdClearanceData.title}
      subtitle={householdClearanceData.subtitle}
      description={householdClearanceData.valueProposition}
      heroImage={householdClearanceData.heroImage}
      features={features}
      benefits={benefits}
      startingPrice={householdClearanceData.startingPrice}
      responseTime={householdClearanceData.responseTime}
      faqs={householdClearanceData.faqs}
      onBookingClick={handleBookingClick}
      showPackages={false}
    />
  );
};

export default HouseholdClearance;






