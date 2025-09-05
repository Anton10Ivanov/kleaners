<<<<<<< HEAD
﻿
=======

>>>>>>> dc44d81132ea9da53ee6737f03f43d7881530caf
import React from 'react';
import { ServicePageTemplate } from '@/components/services/ServicePageTemplate';
import { useNavigate } from 'react-router-dom';
import { Building2, Users, Clock, Shield } from 'lucide-react';

const OfficeCleaning = () => {
  const navigate = useNavigate();

  const features = [
    {
      id: 'commercial',
      title: 'Commercial Expertise',
      description: 'Specialized in office environments with professional-grade equipment and techniques',
      icon: <Building2 className="h-full w-full" />
    },
    {
      id: 'team',
      title: 'Trained Teams',
      description: 'Experienced cleaning teams who understand office workflow and minimize disruption',
      icon: <Users className="h-full w-full" />
    },
    {
      id: 'schedule',
      title: 'Flexible Hours',
      description: 'After-hours, early morning, or weekend cleaning to fit your business schedule',
      icon: <Clock className="h-full w-full" />
    },
    {
      id: 'secure',
      title: 'Security Cleared',
      description: 'Background-checked staff with proper security protocols for office environments',
      icon: <Shield className="h-full w-full" />
    }
  ];

  const packages = [
    {
      id: 'basic-office',
      name: 'Basic Office',
      description: 'Essential office cleaning services',
      price: 119,
      duration: '2-3 hours',
      features: [
        'Trash removal and recycling',
        'Desk and surface cleaning',
        'Restroom sanitization',
        'Kitchen/break room cleaning',
        'Vacuuming carpeted areas'
      ]
    },
    {
      id: 'standard-office',
      name: 'Standard Office',
      description: 'Comprehensive office maintenance',
      price: 179,
      duration: '3-4 hours',
      popular: true,
      features: [
        'Everything in Basic Office',
        'Conference room deep cleaning',
        'Window cleaning (interior)',
        'Floor mopping and polishing',
        'Dusting all furniture',
        'Light disinfection'
      ]
    },
    {
      id: 'premium-office',
      name: 'Premium Office',
      description: 'Complete commercial cleaning solution',
      price: 249,
      duration: '4-6 hours',
      features: [
        'Everything in Standard Office',
        'Deep carpet cleaning',
        'Kitchen appliance cleaning',
        'High-touch surface sanitization',
        'Reception area detailing',
        'Monthly deep clean add-ons'
      ]
    }
  ];

  const benefits = [
    'Maintain a professional office environment',
    'Improve employee health and productivity',
    'Flexible scheduling around your business hours',
    'Commercial-grade cleaning supplies and equipment',
    'Reliable service with consistent quality standards'
  ];

  const handleBookingClick = (packageId: string) => {
    // Navigate to booking with selected package
    navigate('/booking', { state: { selectedPackage: packageId, service: 'office-cleaning' } });
  };

  return (
    <ServicePageTemplate
      title="Professional Office Cleaning"
      description="Maintain a pristine, professional workspace with our comprehensive office cleaning services. We work around your schedule to keep your business environment spotless."
      heroImage="/lovable-uploads/62d7d885-67bd-4c03-9be2-bbcb3836edc1.png"
      features={features}
      packages={packages}
      benefits={benefits}
      onBookingClick={handleBookingClick}
    />
  );
};

export default OfficeCleaning;
<<<<<<< HEAD






=======
>>>>>>> dc44d81132ea9da53ee6737f03f43d7881530caf
