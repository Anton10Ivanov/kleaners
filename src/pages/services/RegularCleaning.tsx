
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const RegularCleaning = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Regular Cleaning Service
          </h1>
          
          <div className="prose dark:prose-invert max-w-none space-y-8">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Our Regular Cleaning Service is designed for busy individuals and families who want a clean, comfortable home without the hassle. With flexible scheduling and consistent quality, we ensure your home stays fresh and inviting.
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">What's Included?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Dusting and wiping all surfaces",
                  "Vacuuming all floors and carpets",
                  "Mopping all hard floors",
                  "Bathroom cleaning and sanitization",
                  "Kitchen cleaning and organization",
                  "Making beds and changing linens",
                  "Empty trash bins and replace bags",
                  "Interior window cleaning"
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

export default RegularCleaning;
