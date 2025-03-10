
import { CategorizedAdvantages } from "./why-choose-us/CategorizedAdvantages";
import { useMediaQuery } from "@/hooks/use-media-query";

const SlickWhyChooseUs = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <section id="why-choose-us-slider" className="py-8 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-[12px]">
        <div className="text-left mb-6 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4 drop-shadow-sm my-[12px] text-zinc-950">
            Why Choose Us
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl">
            We make home cleaning simple, reliable, and tailored to your needs with our trusted local professionals.
          </p>
        </div>

        {/* Categorized advantages in tabs/sections */}
        <CategorizedAdvantages />
      </div>
    </section>
  );
};

export default SlickWhyChooseUs;
