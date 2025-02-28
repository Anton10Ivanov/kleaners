
import { ShoppingBag, HomeIcon, Building2, ArrowRightLeft, HardHat, User, BookOpen, Phone, Shield, FileText, Mail } from 'lucide-react';

export const Icons = {
  regular: ShoppingBag,
  business: Building2,
  moveInOut: ArrowRightLeft,
  postConstruction: HardHat,
  user: User,
  about: BookOpen,
  contact: Phone,
  admin: Shield,
  legal: FileText,
  email: Mail,
};

export const serviceLinks = [
  {
    title: "Regular Cleaning",
    href: "/services/regular-cleaning",
    description: "Professional home cleaning service",
    icon: Icons.regular,
  },
  {
    title: "Business Cleaning",
    href: "/services/business-cleaning",
    description: "Commercial cleaning solutions",
    icon: Icons.business,
  },
  {
    title: "Move In/Out",
    href: "/services/move-in-out",
    description: "Thorough cleaning for transitions",
    icon: Icons.moveInOut,
  },
  {
    title: "Post Construction",
    href: "/services/post-construction-cleaning",
    description: "Clean-up after construction work",
    icon: Icons.postConstruction,
  },
];

export const navigationData = [
  {
    title: "Services",
    href: "/services",
    children: [
      { title: "Regular Cleaning", href: "/services/regular-cleaning" },
      { title: "Business Cleaning", href: "/services/business-cleaning" },
      { title: "Move In/Out", href: "/services/move-in-out" },
      { title: "Post Construction Cleaning", href: "/services/post-construction-cleaning" }
    ]
  },
  {
    title: "About",
    href: "/about",
    children: [
      { title: "Company Values", href: "/about/values" },
      { title: "FAQ", href: "/about/faq" }
    ]
  },
  {
    title: "Contact",
    href: "/contact"
  },
  {
    title: "Legal",
    href: "/legal",
    children: [
      { title: "Terms of Service", href: "/legal/terms" },
      { title: "Privacy Policy", href: "/legal/privacy" }
    ]
  }
];
