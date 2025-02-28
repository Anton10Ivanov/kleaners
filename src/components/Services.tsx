
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Building2, Briefcase, HardHat } from 'lucide-react';
import { Button } from '@/components/ui/button';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * i,
      duration: 0.5,
      ease: 'easeOut'
    }
  })
};

const Services = () => {
  const services = [
    {
      title: "Regular Cleaning",
      description: "Weekly or bi-weekly cleaning services to maintain a spotless home",
      price: "From €29/hour",
      icon: Sparkles,
      color: "bg-orange-50 dark:bg-orange-900/20",
      iconColor: "text-primary"
    },
    {
      title: "Move In/Out Cleaning",
      description: "Comprehensive cleaning service for moving transitions",
      price: "Custom quote",
      icon: Building2,
      color: "bg-blue-50 dark:bg-blue-900/20",
      iconColor: "text-blue-500"
    },
    {
      title: "Business Cleaning",
      description: "Professional cleaning solutions for offices and commercial spaces",
      price: "Custom quote",
      icon: Briefcase,
      color: "bg-purple-50 dark:bg-purple-900/20",
      iconColor: "text-purple-500"
    },
    {
      title: "Post-Construction",
      description: "Specialized cleaning for newly constructed or renovated spaces",
      price: "Coming Soon",
      icon: HardHat,
      color: "bg-green-50 dark:bg-green-900/20",
      iconColor: "text-green-500"
    }
  ];

  return (
    <section id="services" className="bg-gradient-to-b from-[rgba(244,248,252,1)] to-[rgba(223,234,247,1)] dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Cleaning Services
          </h2>
          <p className="text-lg text-[#8E9196] dark:text-gray-400 max-w-2xl mx-auto">
            Professional cleaning solutions tailored for every need
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col h-full"
            >
              <div className={`${service.color} p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-4`}>
                <service.icon className={`h-6 w-6 ${service.iconColor}`} />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {service.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                {service.description}
              </p>
              
              <div className="flex justify-between items-center mt-auto">
                <span className="text-primary font-bold">{service.price}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-600 dark:text-gray-400 hover:text-primary hover:bg-transparent p-0"
                >
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
