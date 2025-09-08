import { supabase } from '@/integrations/supabase/client';

/**
 * Determines the correct redirect path based on user role
 * @param userId - The user ID to check roles for
 * @returns Promise<string> - The redirect path
 */
export async function getRedirectPathForUser(userId: string): Promise<string> {
  try {
    // Check if user is an admin first
    const { data: adminData } = await supabase
      .from('admin_roles')
      .select('role')
      .eq('user_id', userId)
      .single();
      
    if (adminData) {
      return '/admin/dashboard';
    }

    // Check if user is a provider
    const { data: providerData } = await supabase
      .from('service_providers')
      .select('id')
      .eq('id', userId)
      .maybeSingle();
      
    if (providerData) {
      return '/provider/dashboard';
    }

    // Check if user is a client
    const { data: clientData } = await supabase
      .from('clients')
      .select('id')
      .eq('id', userId)
      .maybeSingle();
      
    if (clientData) {
      return '/client/dashboard';
    }

    // Check user_type from profiles table as fallback
    const { data: profileData } = await supabase
      .from('profiles')
      .select('user_type')
      .eq('id', userId)
      .single();
      
    if (profileData?.user_type) {
      switch (profileData.user_type) {
        case 'provider':
          return '/provider/dashboard';
        case 'client':
        default:
          return '/client/dashboard';
      }
    }

    // Default fallback to client dashboard
    return '/client/dashboard';
  } catch (error) {
    console.error('Error determining user redirect path:', error);
    // Default fallback to client dashboard
    return '/client/dashboard';
  }
}

/**
 * Gets redirect path for current authenticated user
 * @returns Promise<string> - The redirect path
 */
export async function getCurrentUserRedirectPath(): Promise<string> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return '/login';
    }
    
    return await getRedirectPathForUser(user.id);
  } catch (error) {
    console.error('Error getting current user redirect path:', error);
    return '/login';
  }
}
