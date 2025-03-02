import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Building2, Briefcase, HardHat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
const fadeInUp = {
  hidden: {
    opacity: 0,
    y: 20
  },
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
  const navigate = useNavigate();
  const services = [{
    title: "Regular Cleaning",
    description: "Weekly or bi-weekly cleaning services to maintain a spotless home",
    price: "From €29/hour",
    icon: Sparkles,
    color: "bg-[#E3F4FF]",
    // Lighter blue background
    iconColor: "text-[#0FA0CE]",
    route: "/services/regular-cleaning"
  }, {
    title: "Move In/Out Cleaning",
    description: "Comprehensive cleaning service for moving transitions",
    price: "Custom quote",
    icon: Building2,
    color: "bg-[#E3F4FF]",
    // Lighter blue background
    iconColor: "text-[#0FA0CE]",
    route: "/services/move-in-out"
  }, {
    title: "Business Cleaning",
    description: "Professional cleaning solutions for offices and commercial spaces",
    price: "Custom quote",
    icon: Briefcase,
    color: "bg-[#E3F4FF]",
    // Lighter blue background
    iconColor: "text-[#0FA0CE]",
    route: "/services/business-cleaning"
  }, {
    title: "Post-Construction",
    description: "Specialized cleaning for newly constructed or renovated spaces",
    price: "Coming Soon",
    icon: HardHat,
    color: "bg-[#E3F4FF]",
    // Lighter blue background
    iconColor: "text-[#0FA0CE]",
    route: "/services/post-construction-cleaning"
  }];
  return <section id="services" className="bg-white transition-colors duration-300 py-16 md:py-[12px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-[12px]">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.5
      }} className="text-left mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-zinc-950 my-[36px]">Cleaning Services with online pricing</h2>
          
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
          {services.map((service, index) => <motion.div key={service.title} custom={index} initial="hidden" whileInView="visible" viewport={{
          once: true
        }} variants={fadeInUp} whileHover={{
          y: -5,
          transition: {
            duration: 0.2
          }
        }} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col h-full">
              <div className="flex items-center mb-4">
                <div className={`${service.color} p-3 rounded-xl w-10 h-10 flex items-center justify-center mr-3`}>
                  <service.icon className={`h-5 w-5 ${service.iconColor}`} />
                </div>
                <h3 className="text-xl font-semibold text-center text-zinc-800">
                  {service.title}
                </h3>
              </div>
              
              <p className="mb-4 flex-grow text-zinc-600">
                {service.description}
              </p>
              
              <div className="flex justify-between items-center mt-auto">
                <span className="px-[12px] font-semibold text-theme-blue">{service.price}</span>
                <Button variant="ghost" size="sm" onClick={() => navigate(service.route)} className="hover:bg-transparent p-0 text-zinc-800 font-semibold">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </motion.div>)}
        </div>
      </div>
    </section>;
};
export default Services;