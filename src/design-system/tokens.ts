
/**
 * Design tokens for the application
 * These are reusable values that represent the design decisions for the application
 */

export const tokens = {
  // Spacing scale (matches CSS variables)
  spacing: {
    xs: 'var(--spacing1)', // 4px
    sm: 'var(--spacing2)', // 8px
    md: 'var(--spacing3)', // 16px
    lg: 'var(--spacing4)', // 20px
    xl: 'var(--spacing5)', // 40px
    xxl: 'var(--spacing6)', // 80px
    xxxl: 'var(--spacing7)', // 160px
  },
  
  // Font sizes
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
  },
  
  // Breakpoints (matches tailwind config)
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
    '3xl': '1800px',
    '4xl': '2000px',
  },
  
  // Z-index scale
  zIndex: {
    base: 1,
    dropdown: 10,
    sticky: 20,
    fixed: 30,
    modal: 40,
    popover: 50,
    tooltip: 60,
  },
  
  // Animation durations
  animation: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  
  // Border radius
  radius: {
    sm: 'calc(var(--radius) - 4px)',
    md: 'calc(var(--radius) - 2px)',
    lg: 'var(--radius)',
    full: '9999px',
  },
};
