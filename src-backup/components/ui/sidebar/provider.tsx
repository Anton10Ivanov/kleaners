import * as React from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { SidebarContext } from "./context"
import { SIDEBAR_COOKIE_NAME, SIDEBAR_COOKIE_MAX_AGE } from "./constants"

interface SidebarProviderProps extends React.ComponentProps<"div"> {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const SidebarProvider = React.forwardRef<HTMLDivElement, SidebarProviderProps>(
  ({ defaultOpen = true, open: openProp, onOpenChange, ...props }, ref) => {
    const isMobile = useIsMobile()
    const [openMobile, setOpenMobile] = React.useState(false)

    // Handle controlled vs uncontrolled state
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
    const open = openProp ?? internalOpen

    const setOpen = React.useCallback(
      (open: boolean) => {
        if (openProp === undefined) {
          setInternalOpen(open)
        }
        onOpenChange?.(open)
      },
      [openProp, onOpenChange]
    )

    const toggleSidebar = React.useCallback(() => {
      setOpen(!open)
    }, [open, setOpen])

    // Handle mobile state
    const handleOpenChange = React.useCallback(
      (open: boolean) => {
        if (isMobile) {
          setOpenMobile(open)
        } else {
          setOpen(open)
        }
      },
      [isMobile, setOpen]
    )

    // Keyboard shortcut
    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "b" && (event.metaKey || event.ctrlKey)) {
          event.preventDefault()
          toggleSidebar()
        }
      }

      document.addEventListener("keydown", handleKeyDown)
      return () => document.removeEventListener("keydown", handleKeyDown)
    }, [toggleSidebar])

    // Persist state to cookies
    React.useEffect(() => {
      if (typeof document !== "undefined") {
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${open}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
      }
    }, [open])

    const contextValue = React.useMemo(
      () => ({
        state: open ? "expanded" : "collapsed",
        open,
        setOpen: handleOpenChange,
        openMobile,
        setOpenMobile,
        isMobile,
        toggleSidebar,
      }),
      [open, handleOpenChange, openMobile, isMobile, toggleSidebar]
    )

    return (
      <SidebarContext.Provider value={contextValue}>
        <div ref={ref} {...props} />
      </SidebarContext.Provider>
    )
  }
)

SidebarProvider.displayName = "SidebarProvider"

export { SidebarProvider }
