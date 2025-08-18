
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroCTA = () => {
  return (
    <section
      className="bg-secondary text-secondary-foreground pb-16"
      // pt-16 mobile, pt-[64px] md+ (so background always goes under navbar)
      style={{ paddingTop: '64px' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-12 items-center gap-8">
          <div className="md:col-span-8 space-y-6">
            <span className="inline-block text-warning font-semibold text-sm uppercase tracking-wider mb-2 animate-pulse">
              ⭐ Premium Service Available
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-foreground leading-tight">
              Ready to experience 
              <span className="block text-accent font-extrabold">spotless cleaning?</span>
            </h2>
            <p className="text-lg md:text-xl text-secondary-foreground/90 max-w-2xl leading-relaxed font-medium">
              Transform your space with our professional cleaning service. Book today and discover the difference quality makes.
            </p>
            <div className="flex items-center gap-4 text-sm text-secondary-foreground/80">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span>Instant Booking</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span>100% Satisfaction</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span>Eco-Friendly</span>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-4 flex justify-center md:justify-end">
            <div className="space-y-4 w-full md:w-auto">
              <Link to="/booking" className="block">
                <Button className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl h-14 px-8 text-xl font-bold shadow-[0_8px_25px_rgba(0,255,135,0.3)] hover:shadow-[0_12px_35px_rgba(0,255,135,0.4)] transform hover:-translate-y-1 transition-all duration-300 group">
                  Get Free Quote 
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <p className="text-center text-secondary-foreground/70 text-sm font-medium">
                ⚡ 2-minute form • Instant pricing
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCTA;

