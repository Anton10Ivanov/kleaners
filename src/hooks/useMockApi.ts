
import { dev } from '@/lib/utils'

/**
 * Hook to manage Mock API settings
 * Allows enabling/disabling the Mock Service Worker during development
 */
export function useMockApi() {
  // Only works in development mode
  const isAvailable = import.meta.env.DEV

  const isEnabled = isAvailable && localStorage.getItem('enableMockApi') !== 'false'

  const enableMockApi = () => {
    if (isAvailable) {
      localStorage.setItem('enableMockApi', 'true')
      window.location.reload()
    }
  }

  const disableMockApi = () => {
    if (isAvailable) {
      localStorage.setItem('enableMockApi', 'false')
      window.location.reload()
    }
  }

  const toggleMockApi = () => {
    if (isEnabled) {
      disableMockApi()
    } else {
      enableMockApi()
    }
  }

  return {
    isAvailable,
    isEnabled,
    enableMockApi,
    disableMockApi,
    toggleMockApi
  }
}
