import { motion } from "framer-motion";
import { Shield, Clock, Star, CheckCircle, Users, Sparkles, Award, Heart, Phone } from 'lucide-react';

// Consolidated trust data - single source of truth
const TRUST_METRICS = [
  { value: "4.9★", label: "Average Rating", icon: Star, color: "text-muted-gold" },
  { value: "€5M", label: "Insurance Coverage", icon: Shield, color: "text-green-500" },
  { value: "2min", label: "Quick Booking", icon: Clock, color: "text-blue-500" },
  { value: "2,500+", label: "Happy Customers", icon: Users, color: "text-purple-500" }
];

const KEY_BENEFITS = [
  {
    icon: Shield,
    title: "Fully Insured & Bonded",
    description: "€5M comprehensive coverage for complete peace of mind",
    priority: 1
  },
  {
    icon: Clock,
    title: "Book in 2 Minutes",
    description: "Lightning-fast online booking, no lengthy phone calls required",
    priority: 1
  },
  {
    icon: CheckCircle,
    title: "Transparent Pricing",
    description: "Fixed upfront costs with no hidden fees or surprises",
    priority: 1
  },
  {
    icon: Users,
    title: "Vetted Professionals",
    description: "Background-checked, local cleaning experts you can trust",
    priority: 2
  },
  {
    icon: Sparkles,
    title: "Eco-Friendly Products",
    description: "Safe, environmentally conscious cleaning solutions",
    priority: 2
  },
  {
    icon: Heart,
    title: "Satisfaction Guaranteed",
    description: "Not happy? We'll make it right or provide a full refund",
    priority: 1
  }
];

const SECURITY_BADGES = [
  { text: "100% Insured", subtext: "Full Coverage" },
  { text: "Licensed & Certified", subtext: "Professional Standards" },
  { text: "24/7 Support", subtext: "Always Available" },
  { text: "Secure Payments", subtext: "Protected Transactions" }
];

const ConsolidatedTrustSection = () => {
  return (
    <section className="section-spacing-xl md:py-24 bg-gradient-to-br from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trust Metrics Bar - Immediate Credibility */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {TRUST_METRICS.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group text-center card-spacing-md bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/20 hover:bg-card/80 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200`}>
                <metric.icon className={`w-6 h-6 ${metric.color}`} strokeWidth={1.5} />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{metric.value}</div>
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
        
        {/* Primary Benefits Grid - Detailed Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {KEY_BENEFITS.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`group card-spacing-md bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/20 hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                benefit.priority === 1 ? 'ring-1 ring-primary/10' : ''
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-200">
                <benefit.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Social Proof Strip - Peer Validation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 card-spacing-lg bg-primary/5 rounded-2xl border border-primary/10"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            {[1, 2, 3, 4, 5].map(i => (
              <Star key={i} className="h-6 w-6 fill-muted-gold text-muted-gold" />
            ))}
            <span className="text-2xl font-bold text-primary ml-2">4.9</span>
          </div>
          <p className="text-lg text-muted-foreground font-medium mb-2">
            Trusted by 2,500+ satisfied customers across Germany
          </p>
          <div className="flex justify-center items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-green-500" />
              95% success rate
            </span>
            <span className="flex items-center gap-1">
              <Phone className="w-4 h-4 text-blue-500" />
              24/7 support
            </span>
          </div>
        </motion.div>

        {/* Security Badges - Final Reassurance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {SECURITY_BADGES.map((badge, index) => (
            <motion.div
              key={badge.text}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              viewport={{ once: true }}
              className="text-center card-spacing-sm bg-card/40 backdrop-blur-sm rounded-xl border border-border/30 hover:border-primary/20 hover:bg-card/60 transition-all duration-200"
            >
              <div className="text-sm font-semibold text-card-foreground mb-1">{badge.text}</div>
              <div className="text-xs text-muted-foreground">{badge.subtext}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ConsolidatedTrustSection;