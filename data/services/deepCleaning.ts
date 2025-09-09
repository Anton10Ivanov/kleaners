import { Home, Sparkles, CheckCircle, Clock, Shield } from 'lucide-react';

export const deepCleaningData = {
  title: "Deep Cleaning Service",
  subtitle: "Comprehensive intensive cleaning for your home",
  description: "Transform your space with our thorough deep cleaning service. Perfect for spring cleaning, move-in preparation, or when your home needs extra attention.",
  heroImage: "/lovable-uploads/deep-cleaning-bg.jpg",
  features: [
    {
      icon: Home,
      title: 'Intensive Deep Clean',
      description: 'Every surface, corner, and hidden area gets thorough attention with specialized equipment'
    },
    {
      icon: CheckCircle,
      title: 'Detailed Approach',
      description: 'Comprehensive cleaning checklist covering areas often missed in regular cleaning'
    },
    {
      icon: Sparkles,
      title: 'Professional Quality',
      description: 'Experienced cleaners with professional-grade equipment and eco-friendly products'
    },
    {
      icon: Shield,
      title: 'Fully Insured',
      description: 'All our cleaners are background-checked, bonded, and insured for your peace of mind'
    }
  ],
  packages: [
    {
      id: 'studio-deep',
      name: 'Studio Deep Clean',
      description: 'Perfect for small spaces and studios',
      price: 149,
      duration: '4-5 hours',
      features: [
        'Complete kitchen deep clean including inside appliances',
        'Bathroom sanitization and tile scrubbing',
        'All surfaces wiped and disinfected',
        'Baseboards and window sills cleaning',
        'Floor deep cleaning and mopping',
        'Light fixtures and ceiling fans'
      ]
    },
    {
      id: 'apartment-deep',
      name: 'Apartment Deep Clean',
      description: 'Comprehensive cleaning for 1-3 bedroom apartments',
      price: 229,
      duration: '5-7 hours',
      popular: true,
      features: [
        'Everything in Studio package',
        'Multiple bedroom deep cleaning',
        'Inside cabinet and drawer cleaning',
        'Window cleaning (interior)',
        'Detailed bathroom scrubbing',
        'Closet organization and cleaning'
      ]
    },
    {
      id: 'house-deep',
      name: 'House Deep Clean',
      description: 'Complete deep cleaning for larger homes',
      price: 349,
      duration: '7-9 hours',
      features: [
        'Everything in Apartment package',
        'Multiple floor cleaning',
        'Garage and basement cleaning',
        'Exterior door and entrance cleaning',
        'Detailed appliance cleaning',
        'Attic and storage area cleaning'
      ]
    }
  ],
  benefits: [
    'Eliminate hidden dirt, germs, and allergens from hard-to-reach places',
    'Experience the satisfaction of a completely clean and organized space',
    'Create a healthier living environment for you and your family',
    'Professional results that exceed regular cleaning standards',
    'Peace of mind with fully insured and bonded cleaning professionals'
  ],
  faqs: [
    {
      question: 'How is deep cleaning different from regular cleaning?',
      answer: 'Deep cleaning includes detailed cleaning of areas typically not covered in regular cleaning, such as inside appliances, baseboards, light fixtures, and thorough sanitization of all surfaces.'
    },
    {
      question: 'How often should I get deep cleaning?',
      answer: 'We recommend deep cleaning 2-4 times per year, or when moving in/out, after renovations, or when your space needs extra attention.'
    },
    {
      question: 'What is included in the pricing?',
      answer: 'Our pricing includes all cleaning supplies, equipment, and labor. No hidden fees or surprise charges.'
    },
    {
      question: 'Do you bring your own supplies?',
      answer: 'Yes, we bring all professional-grade cleaning supplies and equipment needed for the job.'
    },
    {
      question: 'What if I\'m not satisfied with the service?',
      answer: 'We offer a 100% satisfaction guarantee. If you\'re not happy, we\'ll return to make it right at no extra cost.'
    }
  ],
  startingPrice: "€149",
  responseTime: "Within 24h",
  completedJobs: 750,
  averageRating: 4.9,
  ctaText: "Book Deep Clean"
};
