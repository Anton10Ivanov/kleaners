import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { SectionTemplate } from "../home/SectionTemplate";
import { Info } from "lucide-react";

const FAQSection = () => (
  <SectionTemplate
    icon={<Info className="h-8 w-8 text-primary" />}
    title="Frequently Asked Questions"
    description="Have questions? We have answers. Find everything you need to know below."
    background="bg-gradient-to-br from-primary/5 via-theme-lightblue to-white"
    id="faq"
    grid={false}
  >
    <div className="max-w-2xl mx-auto">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            Yes. It's animated with React Spring, powered by Radix UI primitives.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it styled with Tailwind CSS?</AccordionTrigger>
          <AccordionContent>
            Yes. It's styled with Tailwind CSS.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  </SectionTemplate>
);

export default FAQSection;
