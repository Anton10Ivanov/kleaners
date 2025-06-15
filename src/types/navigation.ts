
import React from 'react';
import { LucideIcon } from 'lucide-react';

// Base navigation types
export interface NavigationItem {
  label: string;
  description: string;
  icon?: React.ReactNode; // Made optional
  path: string;
  price?: string;
}

export interface NavigationSubMenu {
  title: string;
  items: NavigationItem[];
}

export interface NavItem {
  id: number;
  label: string;
  subMenus?: NavigationSubMenu[];
  link?: string;
}

// Service category types - Updated to fix type conflicts
export interface ServiceItem {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon; // Changed from React.ReactNode to LucideIcon
}

// Enhanced ServiceCategory that supports both navbar and homepage requirements
export interface ServiceCategory {
  id?: string;
  title: string;
  description: string;
  icon: LucideIcon; // Consistent LucideIcon usage
  services: ServiceItem[];
  // Optional fields for HomePage compatibility
  image?: string;
  price?: string;
  href?: string;
  features?: string[];
  category?: string;
}

// Enhanced dropdown navigation props
export interface EnhancedDropdownNavigationProps {
  navItems: NavItem[];
}

// Popular services type
export interface PopularService {
  name: string;
  title: string;
  description: string;
  price: string;
  icon: string;
  href: string;
}
