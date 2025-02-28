
import React from "react";
import { whyChooseUsContent } from "./WhyChooseUsContent";

const MobileView: React.FC = () => (
  <div className="space-y-6 pt-4">
    {whyChooseUsContent.map((item, index) => (
      <div 
        key={index}
        className={`p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 
          transition-all duration-500 hover:shadow-lg hover:scale-[1.02] 
          ${item.color} bg-opacity-10 dark:bg-opacity-20`}
      >
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-lg ${item.color} bg-opacity-90 text-white shadow-lg`}>
            <item.icon className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 drop-shadow-sm">
              {item.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default MobileView;
