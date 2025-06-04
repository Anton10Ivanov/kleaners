
import React from 'react';

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

export interface ServiceCategory {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  services: ServiceItem[];
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
