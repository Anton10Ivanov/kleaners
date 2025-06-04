
import { cn } from '@/lib/utils';
import { useMobileOptimizations } from '@/hooks/useMobileOptimizations';
import { ServicesMegamenu, EnhancedDropdownNavigation } from '../';
import { navItems } from '../navigationData';

export const DesktopNavigation = () => {
  const { isMobile, getMobileSpacing } = useMobileOptimizations();

  return (
    <div className="hidden lg:flex items-center space-x-6">
      <div className={cn(
        "flex items-center",
        isMobile ? "space-x-4" : "space-x-6"
      )}>
        <ServicesMegamenu />
        <EnhancedDropdownNavigation navItems={navItems} />
      </div>
    </div>
  );
};
