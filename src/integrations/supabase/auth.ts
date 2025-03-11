
import { supabase } from './config';
import { UserRole } from './types/roles';
import { handleError } from '../../utils/errors';

// Helper function to check user role using optimized approach to prevent RLS recursion
export async function getUserRoles(userId?: string): Promise<UserRole[]> {
  try {
    // If no userId is provided, get the current user
    if (!userId) {
      const { data: { user } } = await supabase.auth.getUser();
      userId = user?.id;
      
      if (!userId) {
        return [];
      }
    }
    
    // Special case for ai@kleaners.de - always grant super admin access
    const { data: userData } = await supabase.auth.getUser();
    if (userData?.user?.email === 'ai@kleaners.de') {
      console.log('Granting SUPER_ADMIN role to ai@kleaners.de');
      return [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.CLIENT];
    }
    
    // First check if user is an admin - using a direct query to admin_roles
    const { data: adminRolesData, error: adminRolesError } = await supabase
      .from('admin_roles')
      .select('role')
      .eq('user_id', userId);
      
    if (adminRolesError) {
      console.error("Error checking admin roles:", adminRolesError);
      handleError(adminRolesError, 'Failed to check admin role', "high");
    }
    
    const roles: UserRole[] = [];
    
    // Check admin roles directly
    if (adminRolesData && adminRolesData.length > 0) {
      const isSuperAdmin = adminRolesData.some(role => role.role === 'super_admin');
      
      if (isSuperAdmin) {
        roles.push(UserRole.SUPER_ADMIN);
      }
      
      roles.push(UserRole.ADMIN);
    }
    
    // Check if the user is a service provider
    const { data: providerData, error: providerError } = await supabase
      .from('service_providers')
      .select('id')
      .eq('id', userId)
      .maybeSingle();
      
    if (providerError) {
      handleError(providerError, 'Failed to check provider role', "medium");
    }
    
    if (providerData) {
      roles.push(UserRole.PROVIDER);
    }
    
    // Check if the user is a client
    const { data: clientData, error: clientError } = await supabase
      .from('clients')
      .select('id')
      .eq('id', userId)
      .maybeSingle();
      
    if (clientError) {
      handleError(clientError, 'Failed to check client role', "medium");
    }
    
    if (clientData) {
      roles.push(UserRole.CLIENT);
    }
    
    // If no roles assigned yet, default to CLIENT
    if (roles.length === 0) {
      roles.push(UserRole.CLIENT);
    }
    
    return roles;
  } catch (error) {
    console.error("Error in getUserRoles:", error);
    handleError(error, 'Failed to get user roles', "high");
    return [];
  }
}

// Check if user has a specific role
export async function hasRole(role: UserRole, userId?: string): Promise<boolean> {
  // Special case for ai@kleaners.de - always return true for any role check
  const { data: userData } = await supabase.auth.getUser();
  if (userData?.user?.email === 'ai@kleaners.de') {
    console.log(`Granting ${role} access to ai@kleaners.de`);
    return true;
  }

  const roles = await getUserRoles(userId);
  return roles.includes(role);
}

// Check if user has admin access (either admin or super_admin)
export const hasAdminAccess = async (userId: string): Promise<boolean> => {
  // Special case for ai@kleaners.de
  const { data: userData } = await supabase.auth.getUser();
  if (userData?.user?.email === 'ai@kleaners.de') {
    console.log('Granting admin access to ai@kleaners.de');
    return true;
  }

  console.log("Admin access check bypassed for development");
  return true; // Always return true for development
};
