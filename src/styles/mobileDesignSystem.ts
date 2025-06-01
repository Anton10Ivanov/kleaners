
/**
 * Mobile-First Design System
 * Optimized patterns for mobile devices
 */

import { designTokens } from './designTokens';

export const mobileDesignSystem = {
  // Mobile-optimized component patterns
  components: {
    button: {
      height: designTokens.touchTargets.comfortable,
      padding: `${designTokens.spacing.md} ${designTokens.spacing.xl}`,
      borderRadius: designTokens.borderRadius.xl,
      fontSize: designTokens.typography.fontSizes.base,
      fontWeight: designTokens.typography.fontWeights.medium,
    },
    
    input: {
      height: designTokens.touchTargets.comfortable,
      padding: `${designTokens.spacing.md} ${designTokens.spacing.lg}`,
      borderRadius: designTokens.borderRadius.lg,
      fontSize: designTokens.typography.fontSizes.base,
    },
    
    card: {
      padding: designTokens.spacing.xl,
      borderRadius: designTokens.borderRadius.xl,
      shadow: designTokens.shadows.md,
      marginBottom: designTokens.spacing.lg,
    },
    
    section: {
      paddingTop: designTokens.spacing['2xl'],
      paddingBottom: designTokens.spacing['2xl'],
      paddingX: designTokens.spacing.lg,
    },
  },

  // Mobile spacing patterns
  layout: {
    container: {
      maxWidth: '100%',
      paddingX: designTokens.spacing.lg,
      marginX: 'auto',
    },
    
    stack: {
      gap: designTokens.spacing.lg,
    },
    
    grid: {
      gap: designTokens.spacing.lg,
      columns: {
        mobile: 1,
        tablet: 2,
        desktop: 3,
      },
    },
  },

  // Mobile typography patterns
  typography: {
    heading: {
      h1: {
        fontSize: designTokens.typography.fontSizes['3xl'],
        fontWeight: designTokens.typography.fontWeights.bold,
        lineHeight: designTokens.typography.lineHeights.tight,
        marginBottom: designTokens.spacing.lg,
      },
      h2: {
        fontSize: designTokens.typography.fontSizes['2xl'],
        fontWeight: designTokens.typography.fontWeights.semibold,
        lineHeight: designTokens.typography.lineHeights.tight,
        marginBottom: designTokens.spacing.md,
      },
      h3: {
        fontSize: designTokens.typography.fontSizes.xl,
        fontWeight: designTokens.typography.fontWeights.semibold,
        lineHeight: designTokens.typography.lineHeights.normal,
        marginBottom: designTokens.spacing.md,
      },
    },
    
    body: {
      base: {
        fontSize: designTokens.typography.fontSizes.base,
        lineHeight: designTokens.typography.lineHeights.normal,
        fontWeight: designTokens.typography.fontWeights.normal,
      },
      small: {
        fontSize: designTokens.typography.fontSizes.sm,
        lineHeight: designTokens.typography.lineHeights.normal,
        fontWeight: designTokens.typography.fontWeights.normal,
      },
    },
  },

  // Mobile interaction patterns
  interactions: {
    activeStates: {
      scale: '0.98',
      opacity: '0.8',
    },
    
    hoverStates: {
      scale: '1.02',
      transition: `transform ${designTokens.animation.duration.fast} ${designTokens.animation.easing.ease}`,
    },
    
    focusStates: {
      ring: '2px solid',
      ringColor: designTokens.colors.primary[500],
      ringOffset: '2px',
    },
  },
} as const;

// Utility classes generator
export const generateMobileClasses = () => ({
  // Button classes
  'btn-primary': `
    inline-flex items-center justify-center
    h-12 px-6 rounded-xl
    text-base font-medium text-white
    bg-primary-500 hover:bg-primary-600
    transition-colors duration-150
    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
    active:scale-98
  `,
  
  'btn-secondary': `
    inline-flex items-center justify-center
    h-12 px-6 rounded-xl
    text-base font-medium text-primary-700
    bg-primary-50 hover:bg-primary-100
    border border-primary-200
    transition-colors duration-150
    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
    active:scale-98
  `,
  
  // Input classes
  'input-field': `
    w-full h-12 px-4 rounded-lg
    text-base text-gray-900
    bg-white border border-gray-300
    placeholder:text-gray-500
    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
    transition-all duration-150
  `,
  
  // Card classes
  'card-base': `
    bg-white rounded-xl p-6 shadow-md
    border border-gray-100
  `,
  
  // Typography classes
  'heading-1': `
    text-3xl font-bold text-gray-900
    leading-tight mb-4
  `,
  
  'heading-2': `
    text-2xl font-semibold text-gray-900
    leading-tight mb-3
  `,
  
  'body-text': `
    text-base text-gray-700
    leading-normal
  `,
  
  'small-text': `
    text-sm text-gray-600
    leading-normal
  `,
});
