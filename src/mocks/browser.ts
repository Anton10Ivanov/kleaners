
import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'
import { dev } from '@/lib/utils'

/**
 * MSW Browser setup for intercepting and mocking API requests in development
 */
export const worker = setupWorker(...handlers)

/**
 * Initializes MSW in development environment
 * Can be conditionally enabled/disabled via localStorage
 */
export function startMockServiceWorker() {
  if (import.meta.env.DEV) {
    // Allow enabling/disabling MSW via localStorage for easier testing
    const enableMocks = localStorage.getItem('enableMockApi') !== 'false'
    
    if (enableMocks) {
      worker.start({
        onUnhandledRequest: 'bypass', // Don't warn about unhandled requests
      }).catch((error) => {
        dev.log('Error starting MSW', error)
      })
      dev.log('🔶 Mock Service Worker activated')
    } else {
      dev.log('⚪ Mock Service Worker disabled')
    }
  }
}
