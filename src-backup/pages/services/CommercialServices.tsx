import React from 'react';
import { ServicePageTemplate } from '@/components/services/ServicePageTemplate';

interface CommercialServicesProps {
  serviceType: string;
}

const CommercialServices: React.FC<CommercialServicesProps> = ({ serviceType }) => {
  const defaultConfig = {
    title: 'Commercial Cleaning Service',
    description: 'Professional commercial cleaning services for businesses',
    features: [
      { id: '1', title: 'Business Focus', description: 'Designed for commercial spaces', icon: '🏢' },
      { id: '2', title: 'Flexible Scheduling', description: 'After-hours cleaning options', icon: '⏰' },
      { id: '3', title: 'Scalable Solutions', description: 'Services that grow with your business', icon: '📈' }
    ],
    packages: [
      { id: '1', name: 'Daily Service', description: 'Regular commercial maintenance', price: 199, duration: '2-4 hours', features: ['Daily cleaning', 'Common areas', 'Bathrooms'], popular: true },
      { id: '2', name: 'Weekly Deep Clean', description: 'Comprehensive weekly service', price: 399, duration: '4-6 hours', features: ['All daily features', 'Deep cleaning', 'Specialized areas'], popular: false }
    ]
  };

  return (
    <ServicePageTemplate
      title={defaultConfig.title}
      description={defaultConfig.description}
      features={defaultConfig.features}
      packages={defaultConfig.packages}
    />
  );
};

export default CommercialServices;
