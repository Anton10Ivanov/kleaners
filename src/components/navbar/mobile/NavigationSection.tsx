
import React from 'react';
import { Link } from 'react-router-dom';
import { SheetClose } from '@/components/ui/sheet';
import { Home } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

interface NavigationItem {
  title: string;
  href: string;
  children?: Array<{
    title: string;
    href: string;
  }>;
}

interface NavigationSectionProps {
  navigationData: NavigationItem[];
}

const NavigationSection: React.FC<NavigationSectionProps> = ({ navigationData }) => {
  return (
    <div className="rounded-lg border border-border p-4 bg-card shadow-sm">
      <h3 className="text-sm font-semibold text-primary mb-3 flex items-center">
        <Home className="mr-2 h-4 w-4" />
        Main Navigation
      </h3>
      <div className="space-y-1">
        {navigationData.map((item, index) => (
          item.children ? (
            <Accordion type="single" collapsible key={index} className="border-none">
              <AccordionItem value={item.title} className="border-b-0">
                <AccordionTrigger className="py-2 px-1 hover:no-underline text-sm">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col space-y-1 pl-2">
                    {item.children.map((child, childIndex) => (
                      <SheetClose asChild key={childIndex}>
                        <Link
                          to={child.href}
                          className="py-2 px-3 text-sm rounded-md hover:bg-accent transition-colors"
                        >
                          {child.title}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : (
            <SheetClose asChild key={index}>
              <Link
                to={item.href}
                className="block py-2 px-3 rounded-md hover:bg-accent text-sm transition-colors"
              >
                {item.title}
              </Link>
            </SheetClose>
          )
        ))}
      </div>
    </div>
  );
};

export default NavigationSection;
