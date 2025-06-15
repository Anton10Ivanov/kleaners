
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroCTA = () => {
  return (
    <section
      className="bg-theme-blue text-white pb-16"
      // pt-16 mobile, pt-[64px] md+ (so background always goes under navbar)
      style={{ paddingTop: '64px' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-12 items-center gap-8">
          <div className="md:col-span-8 space-y-4">
            <span className="inline-block text-orange-300 font-medium text-sm mb-2">
              Don't Wait Any Longer
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Ready to experience spotless cleaning?
            </h2>
            <p className="text-sm md:text-base text-stone-50 max-w-xl">
              Book your professional cleaning service today and enjoy a pristine home or office without the hassle.
            </p>
          </div>
          
          <div className="md:col-span-4 flex justify-center md:justify-end">
            <Link to="/booking">
              <Button className="text-white rounded-xl h-12 px-6 shadow-[0_8px_15px_rgba(126,188,230,0.2)] hover:shadow-[0_8px_15px_rgba(126,188,230,0.4)] bg-orange-600 hover:bg-orange-500 text-lg font-normal transform hover:-translate-y-0.5 transition-all w-full md:w-auto">
                Book Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCTA;

