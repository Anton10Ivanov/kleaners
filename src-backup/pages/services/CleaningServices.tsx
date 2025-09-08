import React from 'react';
import { ServicePageTemplate } from '@/components/services/ServicePageTemplate';

interface CleaningServicesProps {
  serviceType: string;
}

const CleaningServices: React.FC<CleaningServicesProps> = ({ serviceType }) => {
  // Service configurations
  const serviceConfigs = {
    'home-cleaning': {
      title: 'Home Cleaning',
      description: 'Professional residential cleaning services for your home',
      features: [
        { id: '1', title: 'Regular Maintenance', description: 'Consistent cleaning schedules', icon: '🏠' },
        { id: '2', title: 'Deep Cleaning', description: 'Thorough cleaning of all areas', icon: '✨' },
        { id: '3', title: 'Eco-Friendly Products', description: 'Safe for your family and pets', icon: '🌱' }
      ],
      packages: [
        { id: '1', name: 'Basic', description: 'Essential cleaning services', price: 89, duration: '2-3 hours', features: ['Living areas', 'Kitchen', 'Bathroom'], popular: false },
        { id: '2', name: 'Standard', description: 'Comprehensive cleaning', price: 129, duration: '3-4 hours', features: ['All basic features', 'Bedrooms', 'Windows'], popular: true },
        { id: '3', name: 'Premium', description: 'Complete home cleaning', price: 179, duration: '4-5 hours', features: ['All standard features', 'Appliances', 'Deep cleaning'], popular: false }
      ]
    },
    'deep-cleaning': {
      title: 'Deep Cleaning',
      description: 'Intensive cleaning service for maximum cleanliness',
      features: [
        { id: '1', title: 'Intensive Cleaning', description: 'Thorough cleaning of every surface', icon: '🧽' },
        { id: '2', title: 'Appliance Cleaning', description: 'Deep clean of all appliances', icon: '🔧' },
        { id: '3', title: 'Sanitization', description: 'Complete sanitization of all areas', icon: '🦠' }
      ],
      packages: [
        { id: '1', name: 'Standard Deep Clean', description: 'Comprehensive deep cleaning', price: 199, duration: '4-6 hours', features: ['All rooms', 'Appliances', 'Sanitization'], popular: true },
        { id: '2', name: 'Intensive Deep Clean', description: 'Maximum cleaning power', price: 299, duration: '6-8 hours', features: ['All standard features', 'Carpet cleaning', 'Window cleaning'], popular: false }
      ]
    },
    'move-in-out': {
      title: 'Move In/Out Cleaning',
      description: 'Complete cleaning for property transitions',
      features: [
        { id: '1', title: 'Empty Property Cleaning', description: 'Thorough cleaning of empty spaces', icon: '📦' },
        { id: '2', title: 'Appliance Deep Clean', description: 'Complete appliance cleaning', icon: '🔌' },
        { id: '3', title: 'Wall & Floor Care', description: 'Careful cleaning of all surfaces', icon: '🧹' }
      ],
      packages: [
        { id: '1', name: 'Move Out', description: 'Prepare property for handover', price: 249, duration: '4-6 hours', features: ['Empty property', 'Appliances', 'Final inspection'], popular: true },
        { id: '2', name: 'Move In', description: 'Fresh start in new home', price: 199, duration: '3-5 hours', features: ['Deep cleaning', 'Sanitization', 'Ready to move in'], popular: false }
      ]
    },
    'office-cleaning': {
      title: 'Office Cleaning',
      description: 'Professional business cleaning services',
      features: [
        { id: '1', title: 'Daily Maintenance', description: 'Regular office cleaning', icon: '💼' },
        { id: '2', title: 'Sanitization', description: 'Complete sanitization of workspaces', icon: '🧼' },
        { id: '3', title: 'Flexible Scheduling', description: 'After-hours cleaning options', icon: '⏰' }
      ],
      packages: [
        { id: '1', name: 'Daily Service', description: 'Regular office maintenance', price: 89, duration: '2-3 hours', features: ['Desks', 'Common areas', 'Bathrooms'], popular: true },
        { id: '2', name: 'Weekly Deep Clean', description: 'Comprehensive weekly cleaning', price: 199, duration: '4-6 hours', features: ['All daily features', 'Windows', 'Deep sanitization'], popular: false }
      ]
    },
    'window-cleaning': {
      title: 'Window Cleaning',
      description: 'Professional window and glass cleaning services',
      features: [
        { id: '1', title: 'Interior & Exterior', description: 'Complete window cleaning', icon: '🪟' },
        { id: '2', title: 'Frame Cleaning', description: 'Thorough frame maintenance', icon: '🖼️' },
        { id: '3', title: 'Streak-Free Results', description: 'Professional finish guaranteed', icon: '✨' }
      ],
      packages: [
        { id: '1', name: 'Standard Windows', description: 'Regular window cleaning', price: 59, duration: '1-2 hours', features: ['Interior windows', 'Basic frames'], popular: true },
        { id: '2', name: 'Complete Service', description: 'Full window maintenance', price: 99, duration: '2-3 hours', features: ['All windows', 'Frames', 'Sills'], popular: false }
      ]
    },
    'stairwell-cleaning': {
      title: 'Stairwell Cleaning',
      description: 'Specialized cleaning for stairwells and common areas',
      features: [
        { id: '1', title: 'Step Cleaning', description: 'Thorough cleaning of all steps', icon: '🪜' },
        { id: '2', title: 'Handrail Sanitization', description: 'Complete handrail cleaning', icon: '🤚' },
        { id: '3', title: 'Wall Maintenance', description: 'Wall and corner cleaning', icon: '🧱' }
      ],
      packages: [
        { id: '1', name: 'Basic Stairwell', description: 'Essential stairwell cleaning', price: 79, duration: '1-2 hours', features: ['Steps', 'Handrails', 'Basic walls'], popular: true },
        { id: '2', name: 'Complete Stairwell', description: 'Full stairwell maintenance', price: 129, duration: '2-3 hours', features: ['All basic features', 'Deep walls', 'Sanitization'], popular: false }
      ]
    }
  };

  const config = serviceConfigs[serviceType as keyof typeof serviceConfigs] || serviceConfigs['home-cleaning'];

  return (
    <ServicePageTemplate
      title={config.title}
      description={config.description}
      features={config.features}
      packages={config.packages}
    />
  );
};

export default CleaningServices;
