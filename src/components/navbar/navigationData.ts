
import { Heart, HelpCircle, Phone, Users, FileText, Shield } from 'lucide-react';

export const serviceCategories = [
  {
    title: "Home Cleaning",
    description: "Professional cleaning for your home",
    services: [
      {
        name: "Regular Cleaning",
        description: "Weekly or bi-weekly cleaning service",
        price: "From €25/hour",
        icon: "🏠"
      },
      {
        name: "Deep Cleaning",
        description: "Thorough one-time cleaning",
        price: "From €35/hour", 
        icon: "✨"
      }
    ]
  },
  {
    title: "Office Cleaning",
    description: "Commercial cleaning solutions",
    services: [
      {
        name: "Office Maintenance",
        description: "Regular office cleaning",
        price: "From €30/hour",
        icon: "🏢"
      }
    ]
  }
];

export const navItems = [
  {
    id: 2,
    label: "About Us",
    subMenus: [{
      title: "About Us",
      items: [{
        label: "Company's Values",
        description: "Our principles and what we stand for",
        icon: <Heart className="h-4 w-4" />,
        path: "/about/values"
      }, {
        label: "FAQ",
        description: "Frequently asked questions",
        icon: <HelpCircle className="h-4 w-4" />,
        path: "/about/faq"
      }, {
        label: "Terms of Service",
        description: "Our terms and conditions",
        icon: <FileText className="h-4 w-4" />,
        path: "/legal/terms"
      }, {
        label: "Privacy Policy",
        description: "How we handle your data",
        icon: <Shield className="h-4 w-4" />,
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
        icon: <Phone className="h-4 w-4" />,
        path: "/contact"
      }, {
        label: "Join Our Team",
        description: "Apply to work with us",
        icon: <Users className="h-4 w-4" />,
        path: "/join-team"
      }]
    }]
  }
];
