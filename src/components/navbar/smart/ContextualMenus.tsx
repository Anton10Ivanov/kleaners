
import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Clock, Star, MapPin, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NavbarButton, NavbarBadge } from '../core/NavbarPrimitives';
import { getNavbarIconClasses, navbarResponsive } from '../utils/styleHelpers';

interface ContextualMenusProps {
  userRole?: 'client' | 'provider' | 'admin' | null;
  className?: string;
}

export const ContextualMenus: React.FC<ContextualMenusProps> = ({
  userRole,
  className
}) => {
  // Return null to remove the contextual menus
  return null;
};
