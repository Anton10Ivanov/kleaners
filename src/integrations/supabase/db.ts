
import { supabase } from './config';
import { handleError } from '../../utils/errors';
import { logger } from '../../utils/logging';

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

