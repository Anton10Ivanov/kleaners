import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { medicalPracticeCleaningData } from "@/data/services/medicalPracticeCleaning";
import { useNavigate } from "react-router-dom";

const MedicalPracticeCleaning = () => {
  const navigate = useNavigate();

  const handleBookingClick = () => {
    navigate("/booking");
  };

  // Convert data format to match ServicePageTemplate
  const features = medicalPracticeCleaningData.features.map((feature, index) => ({
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
      title={medicalPracticeCleaningData.title}
      subtitle={medicalPracticeCleaningData.subtitle}
      description={medicalPracticeCleaningData.valueProposition}
      heroImage={medicalPracticeCleaningData.heroImage}
      features={features}
      benefits={benefits}
      startingPrice={medicalPracticeCleaningData.startingPrice}
      responseTime={medicalPracticeCleaningData.responseTime}
      faqs={medicalPracticeCleaningData.faqs}
      onBookingClick={handleBookingClick}
      showPackages={false}
    />
  );
};

export default MedicalPracticeCleaning;






