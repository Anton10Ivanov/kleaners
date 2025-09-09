'use client'

import React from 'react';
import { ServicePageTemplate } from '@/components/services/ServicePageTemplate';
import { useRouter } from 'next/navigation';
import { Sparkles, Clock, Shield } from 'lucide-react';

const HomeCleaning = () => {
  const router = useRouter();

  const features = [
    {
      id: 'quality',
      title: 'Professional Quality',
      description: 'Experienced cleaners with professional-grade equipment and eco-friendly products',
      icon: <Sparkles className="h-full w-full" />
    },
    {
      id: 'flexible',
      title: 'Flexible Scheduling',
      description: 'Weekly, bi-weekly, or monthly cleaning schedules that fit your lifestyle',
      icon: <Clock className="h-full w-full" />
    },
    {
      id: 'insured',
      title: 'Fully Insured',
      description: 'All our cleaners are background-checked, bonded, and insured for your peace of mind',
      icon: <Shield className="h-full w-full" />
    }
  ];

  const packages = [
    {
      id: 'basic',
      name: 'Basic Clean',
      description: 'Essential cleaning for your home',
      price: 89,
      duration: '2-3 hours',
      features: [
        'Dusting all surfaces',
        'Vacuuming all floors',
        'Mopping hard floors',
        'Bathroom cleaning',
        'Kitchen cleaning'
      ]
    },
    {
      id: 'standard',
      name: 'Standard Clean',
      description: 'Comprehensive cleaning service',
      price: 129,
      duration: '3-4 hours',
      popular: true,
      features: [
        'Everything in Basic Clean',
        'Inside oven cleaning',
        'Inside refrigerator cleaning',
        'Window sill cleaning',
        'Baseboards dusting',
        'Light fixtures cleaning'
      ]
    },
    {
      id: 'premium',
      name: 'Premium Clean',
      description: 'Complete deep cleaning experience',
      price: 189,
      duration: '4-5 hours',
      features: [
        'Everything in Standard Clean',
        'Inside cabinet cleaning',
        'Interior window cleaning',
        'Detailed bathroom scrubbing',
        'Appliance exterior cleaning',
        'Organization assistance'
      ]
    }
  ];

  const benefits = [
    'Save time for what matters most to you',
    'Consistent, reliable cleaning every visit',
    'Eco-friendly and pet-safe cleaning products',
    'Flexible rescheduling and easy communication',
    '100% satisfaction guarantee on all services'
  ];

  const handleBookingClick = () => {
    // Navigate to booking with selected package
    router.push('/booking');
  };

  return (
    <ServicePageTemplate
      title="Professional Home Cleaning"
      description="Keep your home spotless with our reliable, professional cleaning services. From regular maintenance to deep cleaning, we've got you covered."
      heroImage="/Images/81a146c8-f4d6-4adf-8dd6-7d590780093e.png"
      features={features}
      packages={packages}
      benefits={benefits}
      onBookingClick={handleBookingClick}
    />
  );
};

export default HomeCleaning;

