
# State Management with Zustand

This document outlines our approach to state management using Zustand.

## Why Zustand?

Zustand provides several advantages for our application:

1. **Simplicity**: Minimal boilerplate compared to Redux or Context API
2. **Performance**: Optimized rendering with fine-grained updates
3. **TypeScript Support**: Excellent type inference and safety
4. **Middleware**: Built-in middleware for persistence, devtools, etc.
5. **Modular**: Create multiple stores for different domains

## Store Organization

We organize our Zustand stores by domain:

- `useBookingStore` - Simplified store for booking form reset functionality
- `useUserSettingsStore` - Manages user preferences and settings
- `useAuthStore` - Manages authentication state (future)
- `useNotificationStore` - Manages notifications (future)

Note: Enhanced form persistence is now handled by `enhancedFormPersistence` utility with auto-save functionality.

## Store Implementation Pattern

Each store should follow this pattern:

1. Define the state interface
2. Define the actions interface (combined with state)
3. Set default/initial values
4. Implement the store with actions
5. Add middleware as needed (persist, devtools, etc.)

Example:

```typescript
interface MyState {
  // State properties
  count: number;
  
  // Actions
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

const useMyStore = create<MyState>()((set) => ({
  count: 0,
  
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));
```

## Using Stores in Components

Import and use a store in your component:

```tsx
import useBookingStore from '@/store/useBookingStore';

function MyComponent() {
  const { currentStep, formData, setCurrentStep } = useBookingStore();
  
  return (
    <div>
      <p>Current step: {currentStep}</p>
      <button onClick={() => setCurrentStep(currentStep + 1)}>
        Next Step
      </button>
    </div>
  );
}
```

## Persistence

Many stores use the `persist` middleware to save state to localStorage:

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      // state and actions
    }),
    {
      name: 'storage-key',
      partialize: (state) => ({ /* picked state */ }),
    }
  )
);
```

## Best Practices

1. Keep stores small and focused on specific domains
2. Use multiple stores instead of one giant store
3. Use selectors to access only needed state in components
4. Add TypeScript interfaces for type safety
5. Use middleware for common patterns (persistence, logging, etc.)
6. Consider separating state slices for complex stores

## Debugging

For debugging in development, add the devtools middleware:

```typescript
import { devtools } from 'zustand/middleware';

const useStore = create(
  devtools(
    (set) => ({
      // state and actions
    })
  )
);
```

This enables Redux DevTools integration for state inspection.
