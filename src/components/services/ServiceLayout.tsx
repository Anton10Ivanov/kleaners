
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface ServiceLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

const ServiceLayout = ({ children, title, description }: ServiceLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {title}
            </h1>
            {description && (
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                {description}
              </p>
            )}
          </div>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceLayout;
