
import { cn } from '@/lib/utils';
import { useMobileOptimizations } from '@/hooks/useMobileOptimizations';
import { ServicesMegamenu, EnhancedDropdownNavigation } from '../';
import { navItems } from '../navigationData';

export const DesktopNavigation = () => {
  const { isMobile, getMobileSpacing } = useMobileOptimizations();

  // Convert navItems to fix icon type issues
  const convertedNavItems = navItems.map(item => ({
    ...item,
    subMenus: item.subMenus?.map(subMenu => ({
      ...subMenu,
      items: subMenu.items.map(subItem => ({
        ...subItem,
        icon: subItem.icon // This will be handled as ReactNode in the component
      }))
    }))
  }));

  return (
    <div className="hidden lg:flex items-center space-x-6">
      <div className={cn(
        "flex items-center",
        isMobile ? "space-x-4" : "space-x-6"
      )}>
        <ServicesMegamenu />
        <EnhancedDropdownNavigation navItems={convertedNavItems} />
      </div>
    </div>
  );
};
