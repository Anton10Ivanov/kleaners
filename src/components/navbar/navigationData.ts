
import React from 'react';
import { Heart, HelpCircle, Phone, Users, FileText, Shield, Home, Building, Sparkles, LucideIcon, Briefcase, Building2, HardHat } from 'lucide-react';
import { ServiceCategory, NavItem, PopularService } from '@/types/navigation';

// Icons export for backward compatibility
export const Icons: Record<string, LucideIcon> = {
  regular: Sparkles,
  business: Briefcase,
  moveInOut: Building2,
  postConstruction: HardHat,
};

// Centralized service categories - single source of truth
export const serviceCategories: ServiceCategory[] = [
  {
    id: 'home-cleaning',
    title: "Home Cleaning",
    description: "Professional cleaning for your home",
    icon: Home,
    image: "/placeholder.svg",
    price: "From €25/hour",
    href: "/services/home-cleaning",
    category: "residential",
    features: ["Regular Cleaning", "Deep Cleaning"],
    services: [
      {
        title: "Regular Cleaning",
        description: "Weekly or bi-weekly cleaning service",
        href: "/services/home-cleaning",
        icon: Home
      },
      {
        title: "Deep Cleaning", 
        description: "Thorough one-time cleaning",
        href: "/services/deep-cleaning",
        icon: Sparkles
      }
    ]
  },
  {
    id: 'office-cleaning',
    title: "Office Cleaning",
    description: "Commercial cleaning solutions",
    icon: Building,
    image: "/placeholder.svg",
    price: "From €30/hour",
    href: "/services/office-cleaning",
    category: "commercial",
    features: ["Office Maintenance"],
    services: [
      {
        title: "Office Maintenance",
        description: "Regular office cleaning",
        href: "/services/office-cleaning",
        icon: Building
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

// Enhanced navigation items with dynamic service menu
export const navItems: NavItem[] = [
  {
    id: 2,
    label: "About Us",
    subMenus: [{
      title: "About Us",
      items: [{
        label: "Company's Values",
        description: "Our principles and what we stand for",
        icon: React.createElement(Heart, { className: "h-5 w-5" }),
        path: "/about/values"
      }, {
        label: "FAQ",
        description: "Frequently asked questions",
        icon: React.createElement(HelpCircle, { className: "h-5 w-5" }),
        path: "/about/faq"
      }, {
        label: "Terms of Service",
        description: "Our terms and conditions",
        icon: React.createElement(FileText, { className: "h-5 w-5" }),
        path: "/legal/terms"
      }, {
        label: "Privacy Policy",
        description: "How we handle your data",
        icon: React.createElement(Shield, { className: "h-5 w-5" }),
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
        icon: React.createElement(Phone, { className: "h-5 w-5" }),
        path: "/contact"
      }, {
        label: "Join Our Team",
        description: "Apply to work with us",
        icon: React.createElement(Users, { className: "h-5 w-5" }),
        path: "/join-team"
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
