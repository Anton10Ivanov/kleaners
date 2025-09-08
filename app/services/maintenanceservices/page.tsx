import React from 'react';
import { ServicePageTemplate } from '@/components/services/ServicePageTemplate';

interface MaintenanceServicesProps {
  serviceType: string;
}

const MaintenanceServices: React.FC<MaintenanceServicesProps> = ({ serviceType }) => {
  const defaultConfig = {
    title: 'Maintenance Service',
    description: 'Professional maintenance and upkeep services',
    features: [
      { id: '1', title: 'Regular Maintenance', description: 'Consistent upkeep services', icon: '🔧' },
      { id: '2', title: 'Preventive Care', description: 'Preventive maintenance solutions', icon: '🛡️' },
      { id: '3', title: 'Long-term Care', description: 'Ongoing maintenance programs', icon: '📅' }
    ],
    packages: [
      { id: '1', name: 'Basic Maintenance', description: 'Essential maintenance services', price: 99, duration: '1-2 hours', features: ['Basic upkeep', 'Regular service', 'Standard care'], popular: true },
      { id: '2', name: 'Complete Maintenance', description: 'Comprehensive maintenance program', price: 179, duration: '2-3 hours', features: ['All basic features', 'Preventive care', 'Long-term program'], popular: false }
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

export default MaintenanceServices;
