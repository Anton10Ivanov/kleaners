import { motion } from "framer-motion";
import { Shield, Clock, Star, CheckCircle, Users, Sparkles, Award, Heart } from 'lucide-react';

const trustMetrics = [
  { value: "95%", label: "Success Rate", icon: Star },
  { value: "€5M", label: "Insurance", icon: Shield },
  { value: "2min", label: "Booking", icon: Clock },
  { value: "5★", label: "Rating", icon: Award }
];

const benefits = [
  {
    icon: Shield,
    title: "Fully Insured",
    description: "€5M coverage for complete peace of mind"
  },
  {
    icon: Clock,
    title: "2-Minute Booking",
    description: "Quick online booking, no lengthy calls"
  },
  {
    icon: CheckCircle,
    title: "Fixed Pricing",
    description: "Transparent upfront costs, no hidden fees"
  },
  {
    icon: Users,
    title: "Vetted Professionals",
    description: "Background-checked local cleaning experts"
  },
  {
    icon: Sparkles,
    title: "Eco-Friendly",
    description: "Safe, environmentally conscious products"
  },
  {
    icon: Heart,
    title: "Satisfaction Guarantee",
    description: "Not happy? We'll make it right or refund"
  }
];

const TrustAndBenefits = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Metrics Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {trustMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-card rounded-xl border border-border"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <metric.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
              </div>
              <div className="text-2xl font-bold text-primary mb-1">{metric.value}</div>
              <div className="text-sm text-muted-foreground font-medium">{metric.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
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
        
        {/* Benefits Grid */}
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
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <benefit.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
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

export default TrustAndBenefits;