
import { memo } from "react";

export const BackgroundElements = memo(() => (
  <>
    {/* Noise texture overlay */}
    <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSIgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOCIgc3RpdGNoVGlsZXM9InN0aXRjaCIgbnVtT2N0YXZlcz0iNCIgc2VlZD0iMiIgcmVzdWx0PSJ0dXJidWxlbmNlIj48L2ZlVHVyYnVsZW5jZT48ZmVDb2xvck1hdHJpeCB0eXBlPSJzYXR1cmF0ZSIgdmFsdWVzPSIwIiByZXN1bHQ9ImRlc2F0dXJhdGVkVHVyYnVsZW5jZSI+PC9mZUNvbG9yTWF0cml4PjxmZUJsZW5kIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImRlc2F0dXJhdGVkVHVyYnVsZW5jZSIgbW9kZT0ib3ZlcmxheSIgcmVzdWx0PSJub2lzZUJsZW5kIj48L2ZlQmxlbmQ+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuMiI+PC9yZWN0Pjwvc3ZnPg==')]"></div>
    
    {/* Background image container with improvements */}
    <div className="absolute inset-0 overflow-hidden bg-theme-lightblue">
      {/* Desktop background image */}
      <div className="absolute inset-0 z-0 hidden md:block">
        <div 
          className="w-full h-full bg-no-repeat bg-contain bg-right-top"
          style={{
            backgroundImage: "url('/lovable-uploads/d6c1d213-92bc-42b1-bd21-3789664c3faf.png')",
            backgroundSize: "45%", /* Adjusted size for better visibility */
            backgroundPosition: "right 10% top 50%", /* Positioned more precisely */
            opacity: 1
          }}
        ></div>
      </div>
      
      {/* Mobile background image - added for responsive design */}
      <div className="absolute inset-0 z-0 block md:hidden">
        <div 
          className="w-full h-full bg-no-repeat"
          style={{
            backgroundImage: "url('/lovable-uploads/d6c1d213-92bc-42b1-bd21-3789664c3faf.png')",
            backgroundSize: "90%",
            backgroundPosition: "center 30%",
            opacity: 0.3 /* Lower opacity on mobile to not interfere with content */
          }}
        ></div>
      </div>
    </div>
  </>
));

BackgroundElements.displayName = "BackgroundElements";
