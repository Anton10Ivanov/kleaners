# Mock API Usage Guide

This project uses Mock Service Worker (MSW) to intercept and mock API requests during development.

## How It Works

MSW intercepts network requests at the service worker level and returns mock responses.
This allows you to:

- Develop frontend features without a functioning backend
- Test error states and edge cases
- Work offline

## Features

- Toggle mock API on/off through the DevTools panel or localStorage
- Realistic API simulation with configurable responses
- Automatic bypass for unhandled requests

## Usage

### Toggling Mock API

1. Open the DevTools panel by pressing `Alt+D`
2. Click the "Enable Mock API" or "Disable Mock API" button
3. The page will refresh with the new setting applied

### Adding New Mock Handlers

To create new mock API handlers, edit the `src/mocks/handlers.ts` file:

```typescript
// Add your handler to the handlers array
export const handlers = [
  // ... existing handlers
  
  // New handler example
  http.get('/api/your-endpoint', () => {
    return HttpResponse.json({
      // Your mock data here
    })
  }),
];
```

### Manual Control in localStorage

You can also manually toggle the mock API by setting localStorage:

```javascript
// Enable mock API
localStorage.setItem('enableMockApi', 'true')

// Disable mock API
localStorage.setItem('enableMockApi', 'false')
```

## Examples

### Basic Data Fetching with MSW

```typescript
import { useEffect, useState } from 'react'

function YourComponent() {
  const [data, setData] = useState(null)
  
  useEffect(() => {
    // This will be intercepted by MSW if enabled
    fetch('/api/your-endpoint')
      .then(res => res.json())
      .then(data => setData(data))
  }, [])
  
  return (
    <div>
      {data ? JSON.stringify(data) : 'Loading...'}
    </div>
  )
}
```

### Using with React Query

```typescript
import { useQuery } from '@tanstack/react-query'

function fetchData() {
  return fetch('/api/data').then(res => res.json())
}

function YourComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['someData'],
    queryFn: fetchData
  })
  
  // Rest of your component
}
```

## Advanced Features

### Simulating Network Delays

```typescript
http.get('/api/slow-endpoint', async () => {
  // Simulate a slow network connection
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  return HttpResponse.json({ data: 'This response was delayed by 2 seconds' })
})
```

### Simulating Errors

```typescript
http.post('/api/error-example', () => {
  // Simulate a server error
  return new HttpResponse(
    JSON.stringify({ message: 'Internal server error' }),
    { status: 500 }
  )
})
```
