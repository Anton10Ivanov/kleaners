import React from 'react';
import { ServicePageTemplate } from '@/components/services/ServicePageTemplate';

interface SpecializedServicesProps {
  serviceType: string;
}

const SpecializedServices: React.FC<SpecializedServicesProps> = ({ serviceType }) => {
  // Default configuration for specialized services
  const defaultConfig = {
    title: 'Specialized Cleaning Service',
    description: 'Professional specialized cleaning services tailored to your needs',
    features: [
      { id: '1', title: 'Expert Service', description: 'Specialized cleaning expertise', icon: '🔧' },
      { id: '2', title: 'Custom Solutions', description: 'Tailored cleaning solutions', icon: '⚙️' },
      { id: '3', title: 'Professional Equipment', description: 'Specialized cleaning equipment', icon: '🛠️' }
    ],
    packages: [
      { id: '1', name: 'Standard', description: 'Basic specialized cleaning', price: 149, duration: '3-4 hours', features: ['Specialized cleaning', 'Equipment', 'Expert service'], popular: true },
      { id: '2', name: 'Premium', description: 'Complete specialized service', price: 249, duration: '4-6 hours', features: ['All standard features', 'Deep cleaning', 'Custom solutions'], popular: false }
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

export default SpecializedServices;
