// Re-export everything from the Supabase integration
export * from './client'
export * from './auth'
export * from './db'
export * from './config-validation'
export * from './security'
export * from './auth-helpers'
export * from './chat'

// Export types
export type { Database } from '@/types/database'
export { UserRole } from '@/types/roles'
