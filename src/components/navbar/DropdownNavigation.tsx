
import { useState } from "react";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Link } from 'react-router-dom';
import { Icons, serviceCategories } from "./navigationData";

type NavItem = {
  id: number;
  label: string;
  subMenus?: {
    title: string;
    items: {
      label: string;
      description: string;
      icon: React.ElementType;
      path?: string;
    }[];
  }[];
  serviceCategories?: typeof serviceCategories;
  link?: string;
};

type Props = {
  navItems: NavItem[];
};

export function DropdownNavigation({ navItems }: Props) {
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);
  const [isHover, setIsHover] = useState<number | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const handleHover = (menuLabel: string | null) => {
    setOpenMenu(menuLabel);
    // Reset expanded categories when opening a new menu
    if (menuLabel === "Services") {
      setExpandedCategories([]);
    }
  };

  const toggleCategory = (categoryTitle: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryTitle) 
        ? prev.filter(cat => cat !== categoryTitle)
        : [...prev, categoryTitle]
    );
  };

  return (
    <div className="hidden md:block">
      <ul className="relative flex items-center space-x-0">
        {navItems.map(navItem => (
          <li 
            key={navItem.label} 
            className="relative" 
            onMouseEnter={() => handleHover(navItem.label)} 
            onMouseLeave={() => handleHover(null)}
          >
            {navItem.link ? (
              <Link 
                to={navItem.link} 
                className="text-sm py-1.5 px-4 flex cursor-pointer group transition-colors duration-300 items-center justify-center gap-1 text-muted-foreground hover:text-foreground relative" 
                onMouseEnter={() => setIsHover(navItem.id)} 
                onMouseLeave={() => setIsHover(null)}
              >
                <span>{navItem.label}</span>
                {isHover === navItem.id && (
                  <motion.div 
                    layoutId="hover-bg" 
                    className="absolute inset-0 size-full bg-primary/10" 
                    style={{ borderRadius: 99 }} 
                  />
                )}
              </Link>
            ) : (
              <button 
                type="button"
                onMouseEnter={() => setIsHover(navItem.id)} 
                onMouseLeave={() => setIsHover(null)} 
                className="py-1.5 flex cursor-pointer group transition-colors duration-300 items-center justify-center gap-1 relative px-[17px] text-sm font-medium text-center rounded-none text-inherit"
              >
                <span>{navItem.label}</span>
                {(navItem.subMenus || navItem.label === "Services") && (
                  <ChevronDown 
                    className={`h-4 w-4 group-hover:rotate-180 duration-300 transition-transform
                      ${openMenu === navItem.label ? "rotate-180" : ""}`} 
                  />
                )}
                {(isHover === navItem.id || openMenu === navItem.label) && (
                  <motion.div 
                    layoutId="hover-bg" 
                    className="absolute inset-0 size-full bg-primary/10" 
                    style={{ borderRadius: 99 }} 
                  />
                )}
              </button>
            )}

            <AnimatePresence>
              {openMenu === navItem.label && (
                <div className="w-auto absolute left-0 top-full pt-2 z-50">
                  <motion.div 
                    className="bg-background border border-border shadow-lg overflow-hidden" 
                    style={{ borderRadius: 16 }} 
                    layoutId="menu"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Special handling for Services menu with categorization */}
                    {navItem.label === "Services" ? (
                      <div className="max-w-md p-4">
                        <div className="space-y-2">
                          {serviceCategories.map(category => {
                            const Icon = category.icon;
                            const isExpanded = expandedCategories.includes(category.title);
                            
                            return (
                              <div key={category.title} className="border border-border rounded-lg">
                                <button
                                  onClick={() => toggleCategory(category.title)}
                                  className="w-full flex items-center justify-between p-3 hover:bg-accent rounded-lg transition-colors duration-200"
                                >
                                  <div className="flex items-center space-x-3">
                                    <Icon className="h-5 w-5 text-primary" />
                                    <span className="text-sm font-semibold text-foreground">
                                      {category.title}
                                    </span>
                                  </div>
                                  <ChevronRight 
                                    className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                                      isExpanded ? 'rotate-90' : ''
                                    }`} 
                                  />
                                </button>
                                
                                <AnimatePresence>
                                  {isExpanded && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.2 }}
                                      className="overflow-hidden"
                                    >
                                      <div className="px-3 pb-3 space-y-1">
                                        {category.services.slice(0, 6).map(service => (
                                          <Link 
                                            key={service.title}
                                            to={service.href} 
                                            className="block group hover:bg-accent rounded-md p-2 transition-colors duration-200"
                                          >
                                            <p className="text-xs font-medium text-foreground group-hover:text-primary">
                                              {service.title}
                                            </p>
                                            <p className="text-xs text-muted-foreground group-hover:text-foreground mt-0.5">
                                              {service.description}
                                            </p>
                                          </Link>
                                        ))}
                                        {category.services.length > 6 && (
                                          <Link 
                                            to="/services" 
                                            className="block text-xs text-primary hover:text-primary/80 p-2 font-medium"
                                          >
                                            +{category.services.length - 6} more services →
                                          </Link>
                                        )}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                          
                          <div className="pt-2 border-t border-border">
                            <Link 
                              to="/services" 
                              className="block text-center text-sm font-medium text-primary hover:text-primary/80 p-2"
                            >
                              View All Services →
                            </Link>
                          </div>
                        </div>
                      </div>
                    ) : navItem.subMenus ? (
                      /* Regular dropdown for other menus */
                      <div className="p-4 w-max">
                        <div className="flex space-x-9">
                          {navItem.subMenus.map(sub => (
                            <motion.div layout className="w-full" key={sub.title}>
                              <h3 className="mb-4 text-sm font-medium capitalize text-muted-foreground">
                                {sub.title}
                              </h3>
                              <ul className="space-y-6">
                                {sub.items.map(item => {
                                  const Icon = item.icon;
                                  return (
                                    <li key={item.label}>
                                      <Link 
                                        to={item.path || "#"} 
                                        className="flex items-start space-x-3 group"
                                      >
                                        <div className="border border-border text-foreground rounded-md flex items-center justify-center size-9 shrink-0 group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                                          <Icon className="h-5 w-5 flex-none" />
                                        </div>
                                        <div className="leading-5 w-max">
                                          <p className="text-sm font-medium text-foreground shrink-0">
                                            {item.label}
                                          </p>
                                          <p className="text-xs text-muted-foreground shrink-0 group-hover:text-foreground transition-colors duration-300">
                                            {item.description}
                                          </p>
                                        </div>
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </li>
        ))}
      </ul>
    </div>
  );
}
