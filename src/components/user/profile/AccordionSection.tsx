
import React, { ReactNode } from 'react';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { LucideIcon } from 'lucide-react';

interface AccordionSectionProps {
  /** Value for the accordion item */
  value: string;
  
  /** Title for the accordion section */
  title: string;
  
  /** Icon component to display */
  icon: LucideIcon;
  
  /** Content to display inside the accordion */
  children: ReactNode;
}

/**
 * AccordionSection Component
 * 
 * Renders a consistent accordion section for the profile page
 * 
 * @param {AccordionSectionProps} props Component props
 * @returns {JSX.Element} Accordion section component
 */
export function AccordionSection({
  value,
  title,
  icon: Icon,
  children
}: AccordionSectionProps): JSX.Element {
  return (
    <AccordionItem value={value} className="border rounded-lg shadow-sm overflow-hidden">
      <AccordionTrigger className="p-4 hover:no-underline">
        <div className="flex items-center">
          <Icon className="h-5 w-5 mr-2 text-primary" />
          <span className="font-semibold">{title}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4">
        {children}
      </AccordionContent>
    </AccordionItem>
  );
}
