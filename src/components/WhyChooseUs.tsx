
import { motion } from "framer-motion";
import { CompetitiveComparisonTable } from "./why-choose-us/CompetitiveComparisonTable";

const WhyChooseUs = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-secondary transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-heading-color mb-4 drop-shadow-sm">
            Why Choose Kleaners.de
          </h2>
          <p className="text-lg text-secondary-text max-w-3xl mx-auto font-medium leading-relaxed">
            See how we compare to typical cleaning companies. Our systematic approach ensures superior service quality and customer satisfaction.
          </p>
        </motion.div>
        
        <CompetitiveComparisonTable />
      </div>
    </section>
  );
};

export default WhyChooseUs;
