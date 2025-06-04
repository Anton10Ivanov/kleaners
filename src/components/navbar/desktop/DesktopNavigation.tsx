
import { cn } from '@/lib/utils';
import { useMobileOptimizations } from '@/hooks/useMobileOptimizations';
import { DesktopMegaMenu } from './DesktopMegaMenu';
import { EnhancedDropdownNavigation } from './EnhancedDropdownNavigation';
import { ContextualMenus } from '../smart/ContextualMenus';
import { SearchIntegration } from '../smart/SearchIntegration';
import { navItems } from '../navigationData';
import { useAuth } from '@/hooks/useAuth';

export const DesktopNavigation = () => {
  const { isMobile, getMobileSpacing } = useMobileOptimizations();
  const { user } = useAuth();

  // Determine user role (this would typically come from your auth system)
  const userRole = user?.role || null;

  return (
    <div className="hidden lg:flex items-center space-x-6">
      <div className={cn(
        "flex items-center",
        isMobile ? "space-x-4" : "space-x-6"
      )}>
        <DesktopMegaMenu />
        <EnhancedDropdownNavigation navItems={navItems} />
      </div>
      
      {/* Smart navigation features */}
      <div className="flex items-center space-x-4">
        <SearchIntegration />
        <ContextualMenus userRole={userRole} />
      </div>
    </div>
  );
};
