import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FeatureFlags {
  enhancedBookingSchema: boolean;
  // Add more feature flags as needed
}

interface FeatureFlagContextType {
  flags: FeatureFlags;
  toggleFlag: (flag: keyof FeatureFlags) => void;
  setFlag: (flag: keyof FeatureFlags, value: boolean) => void;
}

const FeatureFlagContext = createContext<FeatureFlagContextType | undefined>(undefined);

const defaultFlags: FeatureFlags = {
  enhancedBookingSchema: false, // Start with false for safe rollout
};

export const FeatureFlagProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [flags, setFlags] = useState<FeatureFlags>(defaultFlags);

  const toggleFlag = (flag: keyof FeatureFlags) => {
    setFlags(prev => ({
      ...prev,
      [flag]: !prev[flag]
    }));
  };

  const setFlag = (flag: keyof FeatureFlags, value: boolean) => {
    setFlags(prev => ({
      ...prev,
      [flag]: value
    }));
  };

  return (
    <FeatureFlagContext.Provider value={{ flags, toggleFlag, setFlag }}>
      {children}
    </FeatureFlagContext.Provider>
  );
};

export const useFeatureFlags = () => {
  const context = useContext(FeatureFlagContext);
  if (!context) {
    throw new Error('useFeatureFlags must be used within a FeatureFlagProvider');
  }
  return context;
};

// Development helper component
export const FeatureFlagDebugPanel: React.FC = () => {
  const { flags, toggleFlag } = useFeatureFlags();

  // Only show in development
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-card card-spacing-sm rounded-lg shadow-lg border z-50">
      <h3 className="font-semibold mb-2">Feature Flags</h3>
      {Object.entries(flags).map(([key, value]) => (
        <div key={key} className="flex items-center gap-2 mb-1">
          <input
            type="checkbox"
            id={key}
            checked={value}
            onChange={() => toggleFlag(key as keyof FeatureFlags)}
            className="rounded"
          />
          <label htmlFor={key} className="text-sm">
            {key}
          </label>
        </div>
      ))}
    </div>
  );
};