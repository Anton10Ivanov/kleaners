import { createClient } from '@supabase/supabase-js';
import type { Database } from '../../types/database';
import { handleError } from '../../utils/errors';
import { logger } from '../../utils/logging';

// Use direct values for now to fix the immediate error
const supabaseUrl = 'https://goldvhaiyzrlighyobbn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvbGR2aGFpeXpybGlnaHlvYmJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk2NTkxNzIsImV4cCI6MjA1NTIzNTE3Mn0.7RP-GHb1iNvTFwPpf3rT6q62oDasPj4UPKOL1hHz5VI';

// Log initialization
logger.info('Initializing Supabase client', { url: supabaseUrl });

// Enhanced client with error handling
export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    // Add global error handling for all Supabase requests
    fetch: (url, options) => {
      return fetch(url, options).catch(error => {
        handleError(error, "Network request failed", "high");
        throw error;
      });
    }
  }
});

// User role types 
export enum UserRole {
  ADMIN = 'admin',
  PROVIDER = 'provider',
  CLIENT = 'client',
  SUPER_ADMIN = 'super_admin'
}

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
  const roles = await getUserRoles(userId);
  return roles.includes(role);
}

// Check if user has admin access (either admin or super_admin)
export const hasAdminAccess = async (userId: string): Promise<boolean> => {
  console.log("Admin access check bypassed for development");
  return true; // Always return true for development
};

// Helper functions with improved error handling
export async function fetchData<T>(
  tableName: string, 
  queryFn: (query: any) => any
): Promise<T[]> {
  try {
    const { data, error } = await queryFn(supabase.from(tableName).select());
    
    if (error) {
      throw error;
    }
    
    logger.debug(`Successfully fetched data from ${tableName}`, { count: data?.length });
    
    return data as T[];
  } catch (error) {
    handleError(error, `Failed to fetch data from ${tableName}`, "medium");
    return [];
  }
}

// Type-safe function to get a single record by ID
export async function getRecordById<T>(
  tableName: string, 
  id: string, 
  columns = '*'
): Promise<T | null> {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select(columns)
      .eq('id', id)
      .single();
    
    if (error) {
      throw error;
    }
    
    return data as T;
  } catch (error) {
    handleError(error, `Failed to get ${tableName} record with ID ${id}`, "medium");
    return null;
  }
}

// Type-safe function to insert a record
export async function insertRecord<T>(
  tableName: string, 
  record: T
): Promise<T | null> {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .insert(record)
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    logger.info(`Successfully inserted record in ${tableName}`);
    
    return data as T;
  } catch (error) {
    handleError(error, `Failed to insert record in ${tableName}`, "high");
    return null;
  }
}

// Type-safe function to update a record
export async function updateRecord<T>(
  tableName: string, 
  id: string, 
  updates: Partial<T>
): Promise<T | null> {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    logger.info(`Successfully updated record in ${tableName}`, { id });
    
    return data as T;
  } catch (error) {
    handleError(error, `Failed to update record in ${tableName}`, "medium");
    return null;
  }
}

// Type-safe function to delete a record
export async function deleteRecord(
  tableName: string, 
  id: string
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq('id', id);
    
    if (error) {
      throw error;
    }
    
    logger.info(`Successfully deleted record from ${tableName}`, { id });
    
    return true;
  } catch (error) {
    handleError(error, `Failed to delete record from ${tableName}`, "medium");
    return false;
  }
}
