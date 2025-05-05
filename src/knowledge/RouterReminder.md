
# React Router Context Reminder

## Important Router Structure Requirements

React Router's hooks (like `useLocation`, `useNavigate`, `useParams`, etc.) must be used within a Router context. Always ensure:

1. **Main Application Wrapper**: 
   - The `App` component must be wrapped in a `BrowserRouter` component in `main.tsx`
   - This ensures the router context is available throughout the entire application

2. **Component Usage**:
   - Only use router hooks inside components that are children of a Router
   - Using these hooks outside of Router context will cause the error: `useX() may be used only in the context of a <Router> component`

3. **Testing Components with Router Hooks**:
   - When testing components that use router hooks, wrap them in `MemoryRouter` or `BrowserRouter`

4. **Nested Routers**:
   - Avoid nesting multiple Router components as this can cause unpredictable behavior
   - If you need routing in a specific area, use `Routes` and `Route` components instead

5. **Code Splitting with React.lazy**:
   - Ensure lazy-loaded components that use router hooks are still rendered within the Router context

## May 2025 Update:
Fixed Router context error in the application by wrapping the App component with BrowserRouter in main.tsx. This ensures that useLocation() and other router hooks have access to the router context throughout the application.

## Common Router Issues:
- Double-wrapping components with BrowserRouter can cause strange behavior
- Using Router hooks outside of Router context causes errors
- Inconsistent router versions can lead to compatibility issues
- Navigation components need Router context to function properly
