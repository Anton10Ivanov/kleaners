
import { cn } from '@/lib/utils';
import { useMobileOptimizations } from '@/hooks/useMobileOptimizations';
import { EnhancedDropdownNavigation } from './EnhancedDropdownNavigation';
import { ContextualMenus } from '../smart/ContextualMenus';
import { navItems } from '../navigationData';
import { useAuth } from '@/hooks/useAuth';

export const DesktopNavigation = () => {
  const { isMobile, getMobileSpacing } = useMobileOptimizations();
  const { user } = useAuth();

  // Safely cast user role to the expected type
  const userRole = (user?.role as 'client' | 'provider' | 'admin') || null;

  return (
    <div className="hidden lg:flex items-center space-x-6">
      <div className={cn(
        "flex items-center",
        isMobile ? "space-x-4" : "space-x-6"
      )}>
        <EnhancedDropdownNavigation navItems={navItems} />
      </div>
      
      {/* Smart navigation features */}
      <div className="flex items-center space-x-4">
        <ContextualMenus userRole={userRole} />
      </div>
    </div>
  );
};
