
/**
 * Mobile-First Design System Configuration
 * Extends the base design tokens with mobile-specific patterns
 */

export const mobileDesignSystem = {
  // Mobile Touch Targets (following Apple/Google guidelines)
  touchTargets: {
    minimum: '44px',      // iOS/Android absolute minimum
    comfortable: '48px',  // Recommended comfortable size
    large: '56px',        // For primary actions
    extraLarge: '64px',   // For critical actions
  },

  // Mobile Typography Scale (optimized for small screens)
  mobileTypography: {
    display: {
      fontSize: '2rem',     // 32px - For hero text on mobile
      lineHeight: '1.2',
      fontWeight: '700',
    },
    title: {
      fontSize: '1.5rem',   // 24px - Page titles
      lineHeight: '1.3',
      fontWeight: '600',
    },
    heading: {
      fontSize: '1.25rem',  // 20px - Section headings
      lineHeight: '1.4',
      fontWeight: '600',
    },
    body: {
      fontSize: '1rem',     // 16px - Standard body text
      lineHeight: '1.5',
      fontWeight: '400',
    },
    caption: {
      fontSize: '0.875rem', // 14px - Captions, labels
      lineHeight: '1.4',
      fontWeight: '400',
    },
    small: {
      fontSize: '0.75rem',  // 12px - Fine print, helper text
      lineHeight: '1.3',
      fontWeight: '400',
    },
  },

  // Mobile-optimized spacing
  mobileSpacing: {
    screen: {
      horizontal: '1rem',   // 16px - Standard screen padding
      vertical: '1.5rem',   // 24px - Standard screen padding
    },
    section: {
      gap: '2rem',          // 32px - Between major sections
    },
    component: {
      gap: '1rem',          // 16px - Between components
    },
    element: {
      gap: '0.5rem',        // 8px - Between related elements
    },
  },

  // Mobile interaction states
  mobileStates: {
    tap: {
      scale: '0.95',        // Scale down on tap
      opacity: '0.8',       // Reduce opacity on tap
      duration: '150ms',    // Quick feedback
    },
    focus: {
      ringWidth: '2px',
      ringOffset: '2px',
      duration: '200ms',
    },
  },

  // Mobile animation preferences
  mobileAnimations: {
    // Faster animations for mobile (users expect quick responses)
    fast: '150ms',
    normal: '250ms',
    slow: '400ms',
    
    // Easing curves optimized for mobile
    easing: {
      standard: 'cubic-bezier(0.2, 0, 0, 1)',
      accelerate: 'cubic-bezier(0.3, 0, 1, 1)',
      decelerate: 'cubic-bezier(0, 0, 0.2, 1)',
    },
  },

  // Mobile layout patterns
  mobileLayouts: {
    stack: {
      gap: '1rem',          // Standard vertical spacing
      padding: '1rem',      // Standard container padding
    },
    card: {
      borderRadius: '0.75rem', // 12px - Mobile-friendly corners
      padding: '1rem',      // Internal padding
      shadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
    bottomSheet: {
      borderRadius: '1rem 1rem 0 0', // Rounded top corners
      padding: '1.5rem 1rem 2rem',   // Extra bottom padding for safe area
    },
  },
} as const;

export type MobileDesignSystem = typeof mobileDesignSystem;

// Utility functions for mobile design system
export const getMobileTouchTarget = (size: keyof typeof mobileDesignSystem.touchTargets) => 
  mobileDesignSystem.touchTargets[size];

export const getMobileTypography = (variant: keyof typeof mobileDesignSystem.mobileTypography) => 
  mobileDesignSystem.mobileTypography[variant];

export const getMobileSpacing = (category: keyof typeof mobileDesignSystem.mobileSpacing, key?: string) => {
  const categoryData = mobileDesignSystem.mobileSpacing[category];
  if (key && typeof categoryData === 'object') {
    return (categoryData as any)[key];
  }
  return categoryData;
};
