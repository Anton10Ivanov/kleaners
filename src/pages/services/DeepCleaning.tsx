
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const DeepCleaning = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Deep Cleaning Service
          </h1>
          
          <div className="prose dark:prose-invert max-w-none space-y-8">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Our Deep Cleaning Service goes beyond regular cleaning to tackle built-up dirt, grime, and overlooked areas. Perfect for seasonal cleaning or when your space needs extra attention.
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Comprehensive Deep Clean Includes:</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Deep carpet and upholstery cleaning",
                  "Detailed baseboards and crown molding cleaning",
                  "Behind and under furniture cleaning",
                  "Cabinet interiors and exteriors",
                  "Appliance deep cleaning",
                  "Scale and soap scum removal",
                  "Air vent cleaning",
                  "Window track and frame cleaning"
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

export default DeepCleaning;
