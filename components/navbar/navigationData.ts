'use client'

import React from 'react';
import { Heart, HelpCircle, Phone, Users, FileText, Shield, Home, Building, Sparkles, LucideIcon, Briefcase, Building2, HardHat, Brush, TreePine, Droplets } from 'lucide-react';
import { ServiceCategory, NavItem, PopularService } from '@/types/navigation';

// Icons export for backward compatibility
export const Icons: Record<string, LucideIcon> = {
  regular: Sparkles,
  business: Briefcase,
  moveInOut: Building2,
  postConstruction: HardHat,
};

// Centralized service categories - reorganized into 6 main categories
export const serviceCategories: ServiceCategory[] = [
  // RESIDENTIAL SERVICES
  {
    id: 'residential',
    title: "Residential",
    description: "Professional cleaning for your home",
    icon: Home,
    image: "/placeholder.svg",
    price: "From €25/hour",
    href: "/services",
    category: "residential",
    features: ["Home Cleaning", "Deep Cleaning", "Move In/Out", "Carpet & Upholstery"],
    services: [
      {
        title: "Home Cleaning",
        description: "Regular residential cleaning",
        href: "/services/home-cleaning",
        icon: Home
      },
      {
        title: "Deep Cleaning", 
        description: "Thorough one-time cleaning",
        href: "/services/deep-cleaning",
        icon: Sparkles
      },
      {
        title: "Move In/Out Cleaning",
        description: "Transition cleaning services",
        href: "/services/move-in-out",
        icon: Building2
      },
      {
        title: "Carpet Cleaning",
        description: "Professional carpet care",
        href: "/services/carpet-cleaning",
        icon: Star
      }
    ]
  },
  // COMMERCIAL SERVICES
  {
    id: 'commercial',
    title: "Commercial",
    description: "Professional business cleaning solutions",
    icon: Building,
    image: "/placeholder.svg",
    price: "From €30/hour",
    href: "/services",
    category: "commercial",
    features: ["Office Cleaning", "Industrial", "Childcare Facilities"],
    services: [
      {
        title: "Office Cleaning",
        description: "Professional office maintenance",
        href: "/services/office-cleaning",
        icon: Building
      },
      {
        title: "Industrial Cleaning",
        description: "Heavy-duty facility cleaning",
        href: "/services/industrial-cleaning",
        icon: Building2
      },
      {
        title: "Kindergarten Cleaning",
        description: "Childcare facility cleaning",
        href: "/services/kindergarten-cleaning",
        icon: Users
      }
    ]
  },
  // SPECIALISED SERVICES
  {
    id: 'specialised',
    title: "Specialised",
    description: "Expert cleaning for unique requirements",
    icon: Sparkles,
    image: "/placeholder.svg",
    price: "From €40/hour",
    href: "/services",
    category: "specialised",
    features: ["Construction Cleanup", "Biohazard", "Graffiti Removal"],
    services: [
      {
        title: "Post-Construction Cleaning",
        description: "Construction site cleanup",
        href: "/services/post-construction",
        icon: HardHat
      },
      {
        title: "Crime Scene Cleaning",
        description: "Biohazard cleanup services",
        href: "/services/crime-scene-cleaning",
        icon: Shield
      },
      {
        title: "Graffiti Removal",
        description: "Professional graffiti removal",
        href: "/services/graffiti-removal",
        icon: Brush
      }
    ]
  },
  // WINDOWS SERVICES
  {
    id: 'windows',
    title: "Windows",
    description: "Professional window and glass cleaning",
    icon: Star,
    image: "/placeholder.svg",
    price: "From €20/hour",
    href: "/services",
    category: "windows",
    features: ["Window Cleaning", "Conservatory Glass"],
    services: [
      {
        title: "Window Cleaning",
        description: "Professional window cleaning",
        href: "/services/window-cleaning",
        icon: Star
      },
      {
        title: "Glass Cleaning Winter Garden",
        description: "Conservatory glass cleaning",
        href: "/services/glass-cleaning-winter-garden",
        icon: Star
      }
    ]
  },
  // GARDEN & OUTDOOR SERVICES
  {
    id: 'garden-outdoor',
    title: "Garden & Outdoor",
    description: "Outdoor cleaning and maintenance services",
    icon: TreePine,
    image: "/placeholder.svg",
    price: "From €25/hour",
    href: "/services",
    category: "garden-outdoor",
    features: ["Gardening", "Pool Cleaning", "Facade Cleaning"],
    services: [
      {
        title: "Gardening",
        description: "Garden maintenance and landscaping",
        href: "/services/gardening",
        icon: TreePine
      },
      {
        title: "Pool Cleaning",
        description: "Swimming pool maintenance",
        href: "/services/pool-cleaning",
        icon: Droplets
      },
      {
        title: "Facade Cleaning",
        description: "Building exterior cleaning",
        href: "/services/facade-cleaning",
        icon: Building2
      }
    ]
  },
  // HEALTH & SAFETY SERVICES
  {
    id: 'health-safety',
    title: "Health & Safety",
    description: "Specialized health and safety cleaning",
    icon: Shield,
    image: "/placeholder.svg",
    price: "From €35/hour",
    href: "/services",
    category: "health-safety",
    features: ["Disinfection", "Mold Removal", "Medical Facilities"],
    services: [
      {
        title: "Disinfection Cleaning",
        description: "Professional sanitization",
        href: "/services/disinfection-cleaning",
        icon: Shield
      },
      {
        title: "Mold Removal",
        description: "Mold remediation services",
        href: "/services/mold-removal",
        icon: Shield
      },
      {
        title: "Medical Practice Cleaning",
        description: "Healthcare facility cleaning",
        href: "/services/medical-practice-cleaning",
        icon: Users
      }
    ]
  }
];

// Generate popular services from service categories
export const popularServices: PopularService[] = serviceCategories.flatMap(category => 
  category.services.map(service => ({
    name: service.title,
    title: service.title,
    description: service.description,
    price: category.price || "From €25/hour",
    icon: category.title === "Home Cleaning" ? "🏠" : 
          category.title === "Office Cleaning" ? "🏢" : "✨",
    href: service.href
  }))
);

// Basic navigation data
export const navigationData = [
  { href: "/", title: "Home" },
  { href: "/services", title: "Services" },
  { href: "/about", title: "About" },
  { href: "/contact", title: "Contact" }
];

// Enhanced navigation items with Services integrated into dropdown pattern
export const navItems: NavItem[] = [
  {
    id: 1,
    label: "Services",
    subMenus: [{
      title: "Our Services",
      items: [
        {
          label: "Home Cleaning",
          description: "Regular and deep cleaning for your home",
          path: "/services/home-cleaning"
        },
        {
          label: "Deep Cleaning",
          description: "Thorough one-time deep cleaning service",
          path: "/services/deep-cleaning"
        },
        {
          label: "Office Cleaning",
          description: "Professional commercial cleaning",
          path: "/services/office-cleaning"
        },
        {
          label: "Move In/Out Cleaning",
          description: "Deep cleaning for moving transitions",
          path: "/services/move-in-out"
        },
        {
          label: "Window Cleaning",
          description: "Professional window cleaning services",
          path: "/services/window-cleaning"
        },
        {
          label: "Carpet Cleaning",
          description: "Professional carpet cleaning services",
          path: "/services/carpet-cleaning"
        },
        {
          label: "Industrial Cleaning",
          description: "Heavy-duty industrial facility cleaning",
          path: "/services/industrial-cleaning"
        },
        {
          label: "Construction Cleaning",
          description: "Post-construction cleanup services",
          path: "/services/construction-cleaning"
        },
        {
          label: "View All Services",
          description: "Browse our complete range of cleaning services",
          path: "/services",
          isViewAll: true
        }
      ]
    }]
  },
  {
    id: 2,
    label: "About Us",
    subMenus: [{
      title: "About Us",
      items: [{
        label: "Company's Values",
        description: "Our principles and what we stand for",
        path: "/about/values"
      }, {
        label: "FAQ",
        description: "Frequently asked questions",
        path: "/about/faq"
      }, {
        label: "Terms of Service",
        description: "Our terms and conditions",
        path: "/legal/terms"
      }, {
        label: "Privacy Policy",
        description: "How we handle your data",
        path: "/legal/privacy"
      }]
    }]
  }, {
    id: 3,
    label: "Contact",
    subMenus: [{
      title: "Contact Us",
      items: [{
        label: "Get in Touch",
        description: "Contact our customer service team",
        path: "/contact"
      }, {
        label: "Join Our Team",
        description: "Apply to work with us",
        path: "/contact?tab=join"
      }]
    }]
  }
];

// Factory function to generate service menu items
export const generateServiceMenuItems = () => {
  return serviceCategories.map(category => ({
    label: category.title,
    description: category.description,
    icon: React.createElement(category.icon, { className: "h-5 w-5" }),
    path: category.href || "/services"
  }));
};

// Memoized service navigation for performance
export const getServiceNavigation = () => {
  return {
    id: 1,
    label: "Services",
    subMenus: [{
      title: "Our Services",
      items: generateServiceMenuItems()
    }]
  };
};
