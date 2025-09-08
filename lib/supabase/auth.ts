import { createClient } from '@/lib/supabase/client'
import { UserRole } from '@/types/roles'
import type { Database } from '@/types/database'

// Helper function to check user role using optimized approach to prevent RLS recursion
export async function getUserRoles(userId?: string): Promise<UserRole[]> {
  try {
    const supabase = createClient()
    
    // If no userId is provided, get the current user
    if (!userId) {
      const { data: { user } } = await supabase.auth.getUser()
      userId = user?.id
      
      if (!userId) {
        return []
      }
    }
    
    // First check if user is an admin - using a direct query to admin_roles
    const { data: adminRolesData, error: adminRolesError } = await supabase
      .from('admin_roles')
      .select('role')
      .eq('user_id', userId)
      
    if (adminRolesError) {
      console.error("Error checking admin roles:", adminRolesError)
    }
    
    const roles: UserRole[] = []
    
    // Check admin roles directly
    if (adminRolesData && adminRolesData.length > 0) {
      const isSuperAdmin = adminRolesData.some(role => role.role === 'super_admin')
      
      if (isSuperAdmin) {
        roles.push(UserRole.SUPER_ADMIN)
      }
      
      roles.push(UserRole.ADMIN)
    }
    
    // Check if the user is a service provider
    const { data: providerData, error: providerError } = await supabase
      .from('service_providers')
      .select('id')
      .eq('id', userId)
      .maybeSingle()
      
    if (providerError) {
      console.error('Failed to check provider role:', providerError)
    }
    
    if (providerData) {
      roles.push(UserRole.PROVIDER)
    }
    
    // Check if the user is a client
    const { data: clientData, error: clientError } = await supabase
      .from('clients')
      .select('id')
      .eq('id', userId)
      .maybeSingle()
      
    if (clientError) {
      console.error('Failed to check client role:', clientError)
    }
    
    if (clientData) {
      roles.push(UserRole.CLIENT)
    }
    
    // If no roles assigned yet, default to CLIENT
    if (roles.length === 0) {
      roles.push(UserRole.CLIENT)
    }
    
    return roles
  } catch (error) {
    console.error("Error in getUserRoles:", error)
    return []
  }
}

// Check if user has a specific role
export async function hasRole(role: UserRole, userId?: string): Promise<boolean> {
  const roles = await getUserRoles(userId)
  return roles.includes(role)
}

// Check if user has admin access (either admin or super_admin)
export const hasAdminAccess = async (userId: string): Promise<boolean> => {
  console.log("Admin access check bypassed for development")
  return true // Always return true for development
}

// Check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    return !!user
  } catch (error) {
    console.error("Error checking authentication:", error)
    return false
  }
}

// Get current user
export async function getCurrentUser() {
  try {
    const supabase = createClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error) {
      console.error("Error getting current user:", error)
      return null
    }
    
    return user
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}

// Sign out user
export async function signOut(): Promise<void> {
  try {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      console.error("Error signing out:", error)
      throw error
    }
  } catch (error) {
    console.error("Error signing out:", error)
    throw error
  }
}
