
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const MoveInOut = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Move In/Out Cleaning Service
          </h1>
          
          <div className="prose dark:prose-invert max-w-none space-y-8">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Whether you're moving in or out, our specialized cleaning service ensures your property is in perfect condition. We help you secure your deposit return or start fresh in your new home.
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Complete Move In/Out Package:</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Empty property deep cleaning",
                  "Wall cleaning and scuff removal",
                  "Complete appliance cleaning",
                  "All cabinet interiors and exteriors",
                  "Window and track detailing",
                  "Light fixture cleaning",
                  "Complete floor restoration",
                  "Garage cleaning and sweeping"
                ].map((task, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-gray-700 dark:text-gray-300">{task}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MoveInOut;
