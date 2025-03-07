
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMockApi } from '@/hooks/useMockApi';

/**
 * DevTools component provides development utilities and debugging tools
 * Only appears in development mode
 */
export function DevTools() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const { isAvailable: isMockApiAvailable, isEnabled: isMockApiEnabled, toggleMockApi } = useMockApi();
  
  // Hide in production
  if (import.meta.env.PROD) return null;
  
  const toggleVisibility = () => setIsVisible(!isVisible);
  
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
    
    // Prevent text selection while dragging
    e.preventDefault();
  };
  
  // Attach event listeners for drag
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      }
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);
  
  // Key shortcuts to toggle
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt+D to toggle dev tools
      if (e.altKey && e.key === 'd') {
        toggleVisibility();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVisible]);
  
  return (
    <>
      {/* Floating button */}
      <div 
        className="fixed z-50 bg-slate-800 text-white text-xs px-2 py-1 rounded-full cursor-pointer hover:bg-slate-700"
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
        onMouseDown={handleMouseDown}
        onClick={toggleVisibility}
      >
        {isVisible ? <X size={16} /> : 'DEV'}
      </div>
      
      {/* DevTools panel */}
      {isVisible && (
        <div className="fixed z-40 bottom-4 right-4 w-96 max-w-[90vw] bg-slate-900 rounded-lg shadow-lg text-white p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium">Dev Tools</h3>
            <X size={16} className="cursor-pointer" onClick={toggleVisibility} />
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-2">
              {/* Debug UI helper toggles */}
              <button 
                className={cn(
                  "px-2 py-1 rounded text-xs",
                  localStorage.getItem('dev-debug-forms') === 'true' 
                    ? "bg-blue-600" 
                    : "bg-slate-700"
                )}
                onClick={() => {
                  const current = localStorage.getItem('dev-debug-forms') === 'true';
                  localStorage.setItem('dev-debug-forms', (!current).toString());
                  window.location.reload();
                }}
              >
                Debug Forms
              </button>
              
              <button 
                className={cn(
                  "px-2 py-1 rounded text-xs",
                  localStorage.getItem('dev-enable-new-ui') === 'true' 
                    ? "bg-blue-600" 
                    : "bg-slate-700"
                )}
                onClick={() => {
                  const current = localStorage.getItem('dev-enable-new-ui') === 'true';
                  localStorage.setItem('dev-enable-new-ui', (!current).toString());
                  window.location.reload();
                }}
              >
                New UI
              </button>
              
              {/* New Mock API toggle */}
              {isMockApiAvailable && (
                <button 
                  className={cn(
                    "px-2 py-1 rounded text-xs",
                    isMockApiEnabled
                      ? "bg-blue-600" 
                      : "bg-slate-700"
                  )}
                  onClick={toggleMockApi}
                >
                  {isMockApiEnabled ? "Disable" : "Enable"} Mock API
                </button>
              )}
              
              <button 
                className="px-2 py-1 rounded text-xs bg-slate-700"
                onClick={() => {
                  console.clear();
                }}
              >
                Clear Console
              </button>
              
              <button 
                className="px-2 py-1 rounded text-xs bg-slate-700"
                onClick={() => {
                  console.log('--------- COMPONENT DEBUGGING ---------');
                  const components = document.querySelectorAll('[data-component]');
                  console.log(`Found ${components.length} components on page`);
                  components.forEach(c => {
                    console.log(`Component: ${c.getAttribute('data-component')}`);
                  });
                }}
              >
                Debug Components
              </button>
            </div>
            
            <div className="text-xs opacity-70 mt-2">
              Alt+D to toggle this panel • Drag to move
            </div>
            
            <div className="text-xs pt-2 border-t border-slate-700">
              <div className="flex justify-between">
                <span>Vite Mode:</span>
                <span className="font-mono">{import.meta.env.MODE}</span>
              </div>
              <div className="flex justify-between">
                <span>Build Time:</span>
                <span className="font-mono">{import.meta.env.VITE_BUILD_TIME || 'N/A'}</span>
              </div>
              {isMockApiAvailable && (
                <div className="flex justify-between">
                  <span>Mock API:</span>
                  <span className="font-mono">{isMockApiEnabled ? 'Enabled' : 'Disabled'}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
