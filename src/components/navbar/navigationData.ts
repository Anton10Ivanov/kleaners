
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

export const serviceCategories: ServiceCategory[] = [
  {
    title: "Home Cleaning",
    description: "Professional cleaning for your home",
    icon: Home,
    services: [
      {
        title: "Regular Cleaning",
        description: "Weekly or bi-weekly cleaning service",
        href: "/services/home-cleaning",
        icon: React.createElement(Home, { className: "h-5 w-5" })
      },
      {
        title: "Deep Cleaning", 
        description: "Thorough one-time cleaning",
        href: "/services/deep-cleaning",
        icon: React.createElement(Sparkles, { className: "h-5 w-5" })
      }
    ]
  },
  {
    title: "Office Cleaning",
    description: "Commercial cleaning solutions",
    icon: Building,
    services: [
      {
        title: "Office Maintenance",
        description: "Regular office cleaning",
        href: "/services/office-cleaning",
        icon: React.createElement(Building, { className: "h-5 w-5" })
      }
    ]
  }
];

export const popularServices: PopularService[] = [
  {
    name: "Regular Cleaning",
    title: "Regular Cleaning",
    description: "Weekly or bi-weekly cleaning service",
    price: "From €25/hour",
    icon: "🏠",
    href: "/services/home-cleaning"
  },
  {
    name: "Deep Cleaning",
    title: "Deep Cleaning", 
    description: "Thorough one-time cleaning",
    price: "From €35/hour",
    icon: "✨",
    href: "/services/deep-cleaning"
  },
  {
    name: "Office Cleaning",
    title: "Office Cleaning",
    description: "Professional office cleaning",
    price: "From €30/hour",
    icon: "🏢",
    href: "/services/office-cleaning"
  }
];

export const navigationData = [
  { href: "/", title: "Home" },
  { href: "/services", title: "Services" },
  { href: "/about", title: "About" },
  { href: "/contact", title: "Contact" }
];

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
