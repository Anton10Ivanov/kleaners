
# Development Workflow

## Getting Started

1. **Environment Setup**
   ```bash
   npm install
   cp .env.example .env
   # Configure your Supabase credentials
   npm run dev
   ```

2. **Code Standards**
   - Follow existing TypeScript patterns
   - Use mobile-first responsive design
   - Keep components under 50 lines
   - Write descriptive commit messages

## Component Development

### Creating New Components

1. **Location**: Place in appropriate feature folder
2. **Naming**: Use PascalCase for components
3. **Props**: Define clear TypeScript interfaces
4. **Export**: Use default exports for components

Example component structure:
```typescript
interface ComponentProps {
  title: string;
  onAction: () => void;
}

const Component: React.FC<ComponentProps> = ({ title, onAction }) => {
  return (
    <div className="p-4">
      <h2>{title}</h2>
      <button onClick={onAction}>Action</button>
    </div>
  );
};

export default Component;
```

### Styling Guidelines

- Use TailwindCSS classes exclusively
- Mobile-first approach (default styles for mobile, then `md:`, `lg:` etc.)
- Consistent spacing scale: 4px increments (p-1, p-2, etc.)
- Use semantic colors from the design system

## State Management

### When to Use What

- **useState**: Component-local UI state
- **React Query**: Server data, caching, synchronization
- **Zustand**: Global application state (user preferences, etc.)
- **URL state**: Shareable, bookmarkable state

### Error Handling

Always use the standardized error utilities:
```typescript
import { handleApiError } from '@/utils/errors';

try {
  await apiCall();
} catch (error) {
  handleApiError(error, 'Failed to load data');
}
```

## Testing

Currently, the project doesn't have automated testing. Manual testing guidelines:

1. Test on mobile devices/responsive design
2. Test all user flows end-to-end
3. Verify error states and loading states
4. Check accessibility with screen readers

## Performance Guidelines

- Use React.memo for components that receive stable props
- Implement proper dependency arrays in useEffect and useCallback
- Avoid unnecessary re-renders
- Use lazy loading for routes, not critical components

## Code Review Checklist

- [ ] Mobile responsiveness tested
- [ ] TypeScript errors resolved
- [ ] No console errors in development
- [ ] Proper error handling implemented
- [ ] Loading states provided
- [ ] Accessibility considerations addressed
