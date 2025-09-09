'use client'

import { ServicePageTemplate } from '@/components/services/ServicePageTemplate';
import { deepCleaningData } from '@/data/services/deepCleaning';
import { useRouter } from "next/navigation";

const DeepCleaning = () => {
  const router = useRouter();

  const handleBookingClick = (packageId?: string) => {
    const bookingPath = packageId 
      ? `/booking/deep-cleaning?package=${packageId}`
      : '/booking/deep-cleaning';
    router.push(bookingPath);
  };

  return (
    <ServicePageTemplate
      title={deepCleaningData.title}
      subtitle={deepCleaningData.subtitle}
      description={deepCleaningData.description}
      heroImage={deepCleaningData.heroImage}
      features={deepCleaningData.features}
      packages={deepCleaningData.packages}
      benefits={deepCleaningData.benefits}
      faqs={deepCleaningData.faqs}
      startingPrice={deepCleaningData.startingPrice}
      responseTime={deepCleaningData.responseTime}
      onBookingClick={handleBookingClick}
    />
  );
};

export default DeepCleaning;
