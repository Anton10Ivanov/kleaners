
import { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "How much does a cleaning service cost?",
    answer: "Our pricing depends on the service type, property size, and frequency. Home cleaning starts from €27 for weekly service, €30 for bi-weekly, and €35 for one-time cleaning. You'll get an instant price quote on step 3 of our booking process.",
    category: "Pricing"
  },
  {
    id: 2,
    question: "Are your cleaners insured and background checked?",
    answer: "Yes, all our cleaners are fully insured up to €5M and undergo thorough background checks. We only work with licensed and certified professionals to ensure your safety and peace of mind.",
    category: "Safety"
  },
  {
    id: 3,
    question: "What cleaning supplies do you use?",
    answer: "We use eco-friendly, professional-grade cleaning products that are safe for your family and pets. If you have specific preferences or allergies, please let us know in the special instructions during booking.",
    category: "Service"
  },
  {
    id: 4,
    question: "How far in advance should I book?",
    answer: "You can book as little as 24 hours in advance, but we recommend booking 2-3 days ahead for the best availability. Same-day booking may be available depending on cleaner availability in your area.",
    category: "Booking"
  },
  {
    id: 5,
    question: "What if I'm not satisfied with the cleaning?",
    answer: "We guarantee your satisfaction. If you're not completely happy with our service, contact us within 24 hours and we'll return to re-clean the areas you're not satisfied with at no extra cost.",
    category: "Service"
  },
  {
    id: 6,
    question: "Do I need to be home during the cleaning?",
    answer: "No, you don't need to be home. Many customers provide access instructions or leave keys in a secure location. Our cleaners are fully trusted and insured professionals.",
    category: "Service"
  },
  {
    id: 7,
    question: "Can I cancel or reschedule my booking?",
    answer: "Yes, you can cancel or reschedule up to 24 hours before your scheduled appointment without any fees. For cancellations with less than 24 hours notice, a small fee may apply.",
    category: "Booking"
  },
  {
    id: 8,
    question: "What areas do you serve?",
    answer: "We provide cleaning services in major German cities including Berlin, Munich, Hamburg, Cologne, Frankfurt, and surrounding areas. Enter your postal code to check availability in your location.",
    category: "Coverage"
  },
  {
    id: 9,
    question: "What services do you offer?",
    answer: "We offer various cleaning services including regular home cleaning, deep cleaning, move-in/out cleaning, post-construction cleaning, and office cleaning. Each service is tailored to your specific needs and requirements.",
    category: "Service"
  },
  {
    id: 10,
    question: "How do you ensure quality cleaning?",
    answer: "We maintain quality through rigorous cleaner training, standardized checklists, customer feedback systems, and regular quality inspections. All our cleaners are experienced professionals who follow our detailed cleaning protocols.",
    category: "Service"
  },
  {
    id: 11,
    question: "What is your cancellation policy?",
    answer: "You can cancel your booking up to 24 hours before the scheduled time without any penalty. Cancellations within 24 hours may incur a fee of 50% of the service cost. Emergency cancellations are handled case by case.",
    category: "Booking"
  },
  {
    id: 12,
    question: "Do you provide cleaning supplies?",
    answer: "Yes, our cleaners come fully equipped with all necessary cleaning supplies and equipment. We use professional-grade, eco-friendly products. If you prefer us to use your own supplies, please mention this during booking.",
    category: "Service"
  },
  {
    id: 13,
    question: "What are your payment methods?",
    answer: "We accept various payment methods including credit cards, debit cards, PayPal, and bank transfers. Payment is processed securely through our platform after the service is completed to your satisfaction.",
    category: "Pricing"
  },
  {
    id: 14,
    question: "How long does a typical cleaning take?",
    answer: "Cleaning duration depends on your property size and service type. Regular cleaning typically takes 2-4 hours, while deep cleaning may take 4-8 hours. You can specify your preferred duration during booking.",
    category: "Service"
  },
  {
    id: 15,
    question: "Can I request the same cleaner for regular service?",
    answer: "Absolutely! We try to assign the same cleaner for recurring bookings to ensure consistency and familiarity. If your regular cleaner is unavailable, we'll assign a qualified substitute and notify you in advance.",
    category: "Service"
  }
];

export const FAQSection = memo(() => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <HelpCircle className="h-8 w-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h2>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Find answers to the most common questions about our cleaning services, booking process, and policies.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-base">
                    {item.question}
                  </h3>
                </div>
                <motion.div
                  animate={{ rotate: openItems.includes(item.id) ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openItems.includes(item.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Still have questions?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Our customer support team is here to help you with any additional questions.
            </p>
            <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
              Contact Support
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

FAQSection.displayName = "FAQSection";

export default FAQSection;
