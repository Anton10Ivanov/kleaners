'use client'

import React from 'react'

interface ErrorBoundaryProps {
  children: React.ReactNode
  FallbackComponent?: React.ComponentType<{ error: Error }>
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

const DefaultErrorFallback = ({ error }: { error: Error }) => (
  <div className="text-center py-8 text-red-500">
    <h2 className="text-lg font-semibold mb-2">Something went wrong</h2>
    <p className="text-sm">{error?.message}</p>
  </div>
)

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.FallbackComponent || DefaultErrorFallback
      return <FallbackComponent error={this.state.error!} />
    }

    return this.props.children
  }
}
