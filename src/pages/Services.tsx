
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Regular Cleaning Service – Tailored to Your Busy Lifestyle
          </h1>
          
          <div className="prose dark:prose-invert max-w-none space-y-8">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              At Kleaners.de, we know your time is valuable. That's why our Regular Cleaning Service is designed for busy individuals and families who want a clean, comfortable home without the hassle. With flexible booking options and no restrictive packages, we make it easy to fit cleaning into your schedule – your way.
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Why Choose Us?</h2>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Flexibility Without Compromise:</h3>
              <p className="text-gray-700 dark:text-gray-300">
                We don't lock you into rigid packages based on the size of your home. Instead, our booking form lets you estimate the cleaning time needed for your property, based on industry standards and our years of expertise.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-2">Transparent Pricing:</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Unlike most companies, we offer fixed-price services for added peace of mind. No hidden fees, no surprises.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-2">Local Professionals, Trusted Service:</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Our cleaners live in your area, thanks to our postal code-based system. This means no extra travel costs – just reliable, efficient service from professionals you can trust.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">What's Included?</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Our regular cleaning covers all the essentials to keep your home fresh and inviting. Take a look here to learn more about the differences between our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Our Unique Advantages</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "No Travel Fees: Our cleaners are local, so you don't pay extra for travel time.",
                  "Fixed Pricing: Know exactly what you're paying upfront – no guesswork.",
                  "Customizable Service: Adjust the scope of cleaning directly with your cleaner or via our app.",
                  "Mon-Sat Support: Chat, email, or phone support available Monday to Saturday.",
                  "No Contracts: Cancel anytime – no strings attached.",
                  "Last-Minute Bookings: Schedule cleanings with just 24 hours' notice (compared to 48 hours with competitors).",
                  "95% Success Rate: We deliver exceptional results, with the remaining 5% accounting for unforeseen obstacles."
                ].map((advantage, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                    <p className="text-gray-700 dark:text-gray-300">{advantage}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-gray-700 dark:text-gray-300">
                Need something specific? Customize your cleaning plan directly with your cleaner or through our user-friendly app.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">How It Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Book Online",
                    description: "Use our booking form to estimate cleaning time and schedule your service."
                  },
                  {
                    title: "Meet Your Cleaner",
                    description: "Discuss your needs and adjust the scope of work as needed."
                  },
                  {
                    title: "Enjoy a Spotless Home",
                    description: "Sit back, relax, and let us handle the rest."
                  }
                ].map((step, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300">{step.description}</p>
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

export default Services;
