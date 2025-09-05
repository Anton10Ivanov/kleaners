# Container Standardization Guide

## Overview
This guide documents the unified container system implemented to resolve width inconsistencies across the Kleaners platform.

## Container Hierarchy

### 1. UnifiedContainer (Primary)
**Location**: `src/components/layout/UnifiedContainer.tsx`
**Status**: ✅ Active - Use for all new components

#### Features:
- Standardized responsive widths
- Enhanced padding system
- Breakout and centering options
- Mobile-first design

#### Size Classes:
```typescript
sm: "max-w-2xl"      // 672px - Forms, narrow content
md: "max-w-4xl"      // 896px - Articles, medium content  
lg: "max-w-6xl"      // 1152px - Wide content, dashboards
xl: "max-w-7xl"      // 1280px - Main content areas (default)
"2xl": "max-w-[1400px]" // 1400px - Ultra-wide content
"ultra-wide": "max-w-[1600px]" // 1600px - Maximum width
full: "max-w-none"   // No constraint
```

#### Padding System:
```typescript
// Boolean padding (default: true)
padding={true}  // Responsive: 16px → 24px → 32px → 40px → 48px → 64px

// Granular padding control
padding="sm"    // Smaller padding for compact layouts
padding="md"    // Medium padding for standard layouts  
padding="lg"    // Large padding for spacious layouts
padding="xl"    // Extra large padding for hero sections
padding={false} // No padding
```

#### Props:
```typescript
interface UnifiedContainerProps {
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "ultra-wide" | "full";
  padding?: boolean | "sm" | "md" | "lg" | "xl";
  breakout?: boolean;  // Remove max-width constraints
  centered?: boolean;  // Center horizontally (default: true)
  className?: string;
  children: React.ReactNode;
}
```

### 2. ModernContainer (Legacy Wrapper)
**Location**: `src/components/layout/ModernContainer.tsx`
**Status**: 🔄 Deprecated - Wraps UnifiedContainer for backward compatibility

### 3. MobileContainer (Legacy Wrapper)
**Location**: `src/components/layout/mobile-container.tsx`
**Status**: 🔄 Deprecated - Wraps UnifiedContainer for backward compatibility

## Implementation Guidelines

### For New Components:
```tsx
import { UnifiedContainer } from "@/components/layout/UnifiedContainer";

// Standard content area
<UnifiedContainer size="xl" padding="md">
  {content}
</UnifiedContainer>

// Hero section with breakout
<UnifiedContainer size="2xl" padding="lg" breakout>
  {heroContent}
</UnifiedContainer>

// Compact form
<UnifiedContainer size="sm" padding="sm">
  {formContent}
</UnifiedContainer>
```

### For Existing Components:
- Keep using ModernContainer/MobileContainer (they now use UnifiedContainer internally)
- Gradually migrate to UnifiedContainer during refactoring
- No breaking changes required

## Responsive Breakpoints

### Standard Breakpoints:
- **Mobile**: < 640px (px-4 = 16px padding)
- **Small**: 640px+ (px-6 = 24px padding)
- **Medium**: 768px+ (px-8 = 32px padding)
- **Large**: 1024px+ (px-10 = 40px padding)
- **XL**: 1280px+ (px-12 = 48px padding)
- **2XL**: 1536px+ (px-16 = 64px padding)

### Content Width Limits:
- **Forms/Narrow**: 672px (max-w-2xl)
- **Articles**: 896px (max-w-4xl)
- **Dashboards**: 1152px (max-w-6xl)
- **Main Content**: 1280px (max-w-7xl) ← **Default for service pages**
- **Ultra-wide**: 1400px (max-w-[1400px])
- **Maximum**: 1600px (max-w-[1600px])

## Service Page Implementation

All 34 service pages now use:
```tsx
<UnifiedContainer size="xl">  // 1280px max-width
  <ServicePageTemplate {...props} />
</UnifiedContainer>
```

This ensures consistent width across:
- Hero sections
- Feature grids
- Package cards
- Benefits sections
- FAQ sections

## Migration Status

### ✅ Completed:
- Enhanced UnifiedContainer with advanced features
- Updated ModernContainer to use UnifiedContainer
- Updated MobileContainer to use UnifiedContainer
- All 34 service pages use consistent containers
- TypeScript errors resolved

### 🔄 In Progress:
- Testing width consistency across all pages
- Mobile responsiveness validation

### 📋 Pending:
- Performance testing
- Accessibility validation
- Documentation updates

## Testing Checklist

### Width Consistency:
- [ ] Service pages maintain 1280px max-width
- [ ] Hero sections are properly contained
- [ ] Mobile layouts don't overflow
- [ ] Tablet layouts are optimized
- [ ] Desktop layouts are centered

### Responsive Behavior:
- [ ] Padding scales correctly across breakpoints
- [ ] Content remains readable on all screen sizes
- [ ] No horizontal scrollbars on mobile
- [ ] Touch targets are appropriately sized

### Cross-Browser:
- [ ] Chrome/Edge consistency
- [ ] Firefox compatibility
- [ ] Safari mobile testing
- [ ] Internet Explorer 11 (if required)

## Performance Impact

### Benefits:
- Reduced CSS bundle size (unified system)
- Consistent layout calculations
- Improved Core Web Vitals
- Better caching efficiency

### Metrics to Monitor:
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- First Input Delay (FID)
- Bundle size impact

## Best Practices

### Do:
- Use UnifiedContainer for new components
- Stick to standard size classes
- Test on multiple screen sizes
- Follow mobile-first approach
- Use semantic HTML structure

### Don't:
- Create custom container components
- Override max-width with CSS
- Use fixed pixel widths
- Ignore mobile breakpoints
- Mix container systems

## Troubleshooting

### Common Issues:
1. **Content overflowing**: Use smaller size class or breakout prop
2. **Too much padding**: Use padding="sm" or padding={false}
3. **Not centered**: Ensure centered={true} (default)
4. **Mobile issues**: Test with padding="sm" for mobile

### Debug Tools:
- Browser dev tools responsive mode
- Tailwind CSS IntelliSense
- React Developer Tools
- Lighthouse performance audit

## Future Enhancements

### Planned Features:
- Container query support
- Advanced grid layouts
- Animation-aware containers
- Accessibility improvements
- Performance optimizations

### Monitoring:
- Real User Monitoring (RUM)
- Core Web Vitals tracking
- Container usage analytics
- Performance regression detection
