
import * as React from "react"
import { useCallback } from "react"

const MOBILE_BREAKPOINT = 768
const DEBOUNCE_DELAY = 150 // 150ms debounce delay

function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func(...args);
      timeout = null;
    }, wait);
  };
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  const handleResize = useCallback(() => {
    // Use requestAnimationFrame to sync with browser's render cycle
    requestAnimationFrame(() => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    })
  }, [])

  React.useEffect(() => {
    // Create debounced version of handleResize
    const debouncedHandleResize = debounce(handleResize, DEBOUNCE_DELAY)

    // Initial size check
    handleResize()

    // Add event listener with debounced callback
    window.addEventListener("resize", debouncedHandleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", debouncedHandleResize)
    }
  }, [handleResize])

  return !!isMobile
}
