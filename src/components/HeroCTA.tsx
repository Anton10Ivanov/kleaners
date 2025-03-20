
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroCTA = () => {
  return (
    <section className="py-14 text-white bg-theme-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="w-full md:w-2/3 space-y-4">
            <span className="inline-block text-orange-300 font-medium text-sm mb-1">
              Don't Wait Any Longer
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Ready to experience spotless cleaning?
            </h2>
            <p className="text-sm md:text-base text-stone-50">
              Book your professional cleaning service today and enjoy a pristine home or office without the hassle.
            </p>
          </div>
          
          <div className="w-full md:w-1/3 flex justify-center md:justify-end">
            <Link to="/booking">
              <Button className="text-white rounded-xl h-12 px-6 shadow-[0_8px_15px_rgba(126,188,230,0.2)] hover:shadow-[0_8px_15px_rgba(126,188,230,0.4)] bg-orange-600 hover:bg-orange-500 text-lg font-normal transform hover:-translate-y-0.5 transition-all">
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
