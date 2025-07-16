
import { motion } from "framer-motion";
import { Shield, Clock, Star, CheckCircle, Users, Sparkles } from 'lucide-react';

const benefits = [
  {
    icon: Shield,
    title: "Fully Insured",
    description: "€5M coverage for complete peace of mind",
    color: "text-primary"
  },
  {
    icon: Clock,
    title: "2-Minute Booking",
    description: "Quick online booking, no lengthy calls",
    color: "text-primary"
  },
  {
    icon: Star,
    title: "95% Success Rate",
    description: "Proven track record with satisfaction guarantee",
    color: "text-primary"
  },
  {
    icon: CheckCircle,
    title: "Fixed Pricing",
    description: "Transparent upfront costs, no hidden fees",
    color: "text-primary"
  },
  {
    icon: Users,
    title: "Vetted Professionals",
    description: "Background-checked local cleaning experts",
    color: "text-primary"
  },
  {
    icon: Sparkles,
    title: "Eco-Friendly",
    description: "Safe, environmentally conscious products",
    color: "text-primary"
  }
];

const WhyChooseUs = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Why Choose Kleaners.de
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
            Professional cleaning services designed around your needs, backed by reliability and quality you can trust.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group p-6 bg-card rounded-xl border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg"
            >
              <div className={`w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors`}>
                <benefit.icon className={`w-6 h-6 ${benefit.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
