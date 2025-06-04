
import React from 'react';
import { LucideIcon } from 'lucide-react';

// Base navigation types
export interface NavigationItem {
  label: string;
  description: string;
  icon: React.ReactNode;
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

// Service category types
export interface ServiceItem {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

// Extended ServiceCategory that supports both navbar and homepage requirements
export interface ServiceCategory {
  id?: string;
  title: string;
  description: string;
  icon: LucideIcon | React.ComponentType<any>;
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
