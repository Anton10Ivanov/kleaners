
import { Heart, HelpCircle, Phone, Users, FileText, Shield, Home, Building, Sparkles } from 'lucide-react';

export const serviceCategories = [
  {
    title: "Home Cleaning",
    description: "Professional cleaning for your home",
    icon: Home,
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
    title: "Office Cleaning",
    description: "Commercial cleaning solutions",
    icon: Building,
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

export const popularServices = [
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

export const Icons = {
  Heart,
  HelpCircle,
  Phone,
  Users,
  FileText,
  Shield,
  Home,
  Building,
  Sparkles
};

export const navItems = [
  {
    id: 2,
    label: "About Us",
    subMenus: [{
      title: "About Us",
      items: [{
        label: "Company's Values",
        description: "Our principles and what we stand for",
        icon: Heart,
        path: "/about/values"
      }, {
        label: "FAQ",
        description: "Frequently asked questions",
        icon: HelpCircle,
        path: "/about/faq"
      }, {
        label: "Terms of Service",
        description: "Our terms and conditions",
        icon: FileText,
        path: "/legal/terms"
      }, {
        label: "Privacy Policy",
        description: "How we handle your data",
        icon: Shield,
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
        icon: Phone,
        path: "/contact"
      }, {
        label: "Join Our Team",
        description: "Apply to work with us",
        icon: Users,
        path: "/join-team"
      }]
    }]
  }
];
