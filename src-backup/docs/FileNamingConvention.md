
# File Naming Conventions

This document outlines the standard file naming conventions for our project.

## General Guidelines

- Use descriptive names that clearly indicate the file's purpose
- Avoid abbreviations unless they are widely recognized
- Keep filenames reasonably short but descriptive

## Specific Conventions

### Components

- Use **PascalCase** for component filenames
- Component files should end with `.tsx` extension
- Example: `UserProfile.tsx`, `BookingCard.tsx`

### Custom Hooks

- Use **camelCase** and prefix with `use`
- Hook files should end with `.ts` extension
- Example: `useBookingStore.ts`, `useFormValidation.ts`

### Utility Functions

- Use **camelCase** for utility files
- Utility files should end with `.ts` extension
- Example: `dateUtils.ts`, `formatters.ts`

### Type Definitions

- Use **camelCase** for type files
- Type files should end with `.ts` extension
- Add `.types` suffix for dedicated type files
- Example: `booking.types.ts`, `api.types.ts`

### Constants

- Use **camelCase** with `.constants` suffix
- Example: `routes.constants.ts`, `api.constants.ts`

### Context Providers

- Use **PascalCase** with `Provider` suffix
- Example: `AuthProvider.tsx`, `ThemeProvider.tsx`

### Tests

- Mirror the name of the file being tested
- Add `.test` or `.spec` suffix
- Example: `Button.test.tsx`, `useAuth.spec.ts`

## Directory Structure

- Group related files in directories
- Use **kebab-case** for directory names
- Example: `src/components/user-profile/`, `src/hooks/form-handling/`

## Examples

```
src/
├── components/
│   ├── Button.tsx                  ✅
│   ├── UserProfile.tsx             ✅
│   ├── dashboard/
│   │   ├── DashboardCard.tsx       ✅
│   │   └── stats/
│   │       └── StatisticsChart.tsx ✅
├── hooks/
│   ├── useAuth.ts                  ✅
│   └── form/
│       └── useFormValidation.ts    ✅
├── utils/
│   ├── dateUtils.ts                ✅
│   └── formatters.ts               ✅
├── types/
│   ├── api.types.ts                ✅
│   └── booking.types.ts            ✅
└── constants/
    └── routes.constants.ts         ✅
```
