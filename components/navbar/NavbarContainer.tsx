'use client'

interface NavbarContainerProps {
  children: React.ReactNode
}

export function NavbarContainer({ children }: NavbarContainerProps) {
  return (
    <nav className="bg-white shadow-sm border-b" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {children}
        </div>
      </div>
    </nav>
  )
}
