import React from 'react';
import { ServicePageTemplate } from '@/components/services/ServicePageTemplate';
import { useNavigate } from 'react-router-dom';
import { Home, Truck, CheckCircle, Clock } from 'lucide-react';

const MoveInOut = () => {
  const navigate = useRouter();

  const features = [
    {
      id: 'thorough',
      title: 'Thorough Deep Clean',
      description: 'Complete deep cleaning of every room, including inside appliances and hard-to-reach areas',
      icon: <Home className="h-full w-full" />
    },
    {
      id: 'moveready',
      title: 'Move-Ready Service',
      description: 'Specialized cleaning for move-in/move-out situations with deposit return guarantee',
      icon: <Truck className="h-full w-full" />
    },
    {
      id: 'checklist',
      title: 'Comprehensive Checklist',
      description: 'Detailed cleaning checklist covering all areas required by landlords and property managers',
      icon: <CheckCircle className="h-full w-full" />
    },
    {
      id: 'flexible',
      title: 'Flexible Timing',
      description: 'Available on short notice with same-day and next-day service options for urgent moves',
      icon: <Clock className="h-full w-full" />
    }
  ];

  const packages = [
    {
      id: 'studio-moveout',
      name: 'Studio/1BR Move-Out',
      description: 'Perfect for small apartments and studios',
      price: 149,
      duration: '3-4 hours',
      features: [
        'Complete kitchen deep clean',
        'Bathroom sanitization',
        'All surfaces wiped down',
        'Baseboards and window sills',
        'Interior appliance cleaning',
        'Floor deep cleaning'
      ]
    },
    {
      id: 'apartment-moveout',
      name: '2-3BR Move-Out',
      description: 'Comprehensive cleaning for larger apartments',
      price: 229,
      duration: '4-6 hours',
      popular: true,
      features: [
        'Everything in Studio package',
        'Multiple bedroom cleaning',
        'Additional bathroom cleaning',
        'Inside cabinet cleaning',
        'Light fixture cleaning',
        'Closet cleaning'
      ]
    },
    {
      id: 'house-moveout',
      name: 'House Move-Out',
      description: 'Full house deep cleaning service',
      price: 329,
      duration: '6-8 hours',
      features: [
        'Everything in Apartment package',
        'Garage cleaning',
        'Basement/attic cleaning',
        'Multiple floor cleaning',
        'Exterior door cleaning',
        'Deposit guarantee service'
      ]
    }
  ];

  const benefits = [
    'Maximize your security deposit return',
    'Professional-grade equipment and eco-friendly products',
    'Detailed before and after photo documentation',
    'Flexible scheduling around your moving timeline',
    'Satisfaction guarantee with free touch-ups if needed'
  ];

  const handleBookingClick = (packageId: string) => {
    // Navigate to booking with selected package
    navigate('/booking', { state: { selectedPackage: packageId, service: 'move-in-out' } });
  };

  return (
    <ServicePageTemplate
      title="Move-In/Move-Out Cleaning"
      description="Make your move stress-free with our comprehensive move-in/move-out cleaning service. Get your security deposit back or start fresh in your new home with our thorough deep cleaning."
      heroImage="/lovable-uploads/opciya1 (1) 2.png"
      features={features}
      packages={packages}
      benefits={benefits}
      onBookingClick={handleBookingClick}
    />
  );
};

export default MoveInOut;

