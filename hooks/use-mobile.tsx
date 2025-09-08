'use client'


import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Set initial value
    setIsMobile(mql.matches)
    
    // Use the MediaQueryList event listener instead of resize
    const onChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches)
    }

    // Modern browsers
    mql.addEventListener("change", onChange)
    
    return () => {
      mql.removeEventListener("change", onChange)
    }
  }, [])

  return !!isMobile
}
