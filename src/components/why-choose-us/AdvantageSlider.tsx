
import { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import Slider from "react-slick";
import { whyChooseUsContent } from "./WhyChooseUsContent";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const AdvantageSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (_: number, next: number) => setActiveSlide(next),
    arrows: !isMobile,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    adaptiveHeight: true,
    customPaging: (i: number) => (
      <div 
        className={`w-3 h-3 mx-1 rounded-full transition-all duration-300 ${
          i === activeSlide ? "bg-primary scale-125" : "bg-gray-300 dark:bg-gray-700"
        }`} 
      />
    ),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          adaptiveHeight: true
        }
      }
    ]
  };

  return (
    <div className="slick-container max-w-5xl mx-auto">
      <Slider {...settings}>
        {whyChooseUsContent.map((item, index) => (
          <div key={index} className="focus:outline-none py-0 px-0">
            <div className="rounded-2xl overflow-hidden shadow-xl transition-all duration-700 transform bg-white border border-gray-100">
              <div className="relative w-full min-h-[250px] md:min-h-[300px] lg:min-h-[400px] flex items-center justify-center text-gray-900 p-6 md:p-8 lg:p-10 overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-gray-100 blur-3xl"></div>
                  <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-gray-100 blur-3xl"></div>
                </div>
                
                <div className="text-center transform transition-all duration-700 z-10 animate-fadeIn">
                  <div className="mb-6 md:mb-8 p-4 md:p-6 rounded-full bg-[#E3F4FF] inline-block shadow-inner">
                    <item.icon className="w-10 h-10 md:w-14 md:h-14 lg:w-18 lg:h-18 text-[#0FA0CE]" />
                  </div>
                  <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-3 md:mb-4 drop-shadow-md text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-base md:text-lg lg:text-xl max-w-md mx-auto font-medium text-gray-700 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};
