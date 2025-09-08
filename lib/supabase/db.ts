import { createClient } from '@/lib/supabase/client'

// Helper functions with improved error handling
export async function fetchData<T>(
  tableName: string, 
  queryFn: (query: any) => any
): Promise<T[]> {
  try {
    const supabase = createClient()
    const { data, error } = await queryFn(supabase.from(tableName).select())
    
    if (error) {
      throw error
    }
    
    console.debug(`Successfully fetched data from ${tableName}`, { count: data?.length })
    
    return data as T[]
  } catch (error) {
    console.error(`Failed to fetch data from ${tableName}`, error)
    return []
  }
}

// Type-safe function to get a single record by ID
export async function getRecordById<T>(
  tableName: string, 
  id: string, 
  columns = '*'
): Promise<T | null> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from(tableName)
      .select(columns)
      .eq('id', id)
      .single()
    
    if (error) {
      throw error
    }
    
    return data as T
  } catch (error) {
    console.error(`Failed to get ${tableName} record with ID ${id}`, error)
    return null
  }
}

// Type-safe function to insert a record
export async function insertRecord<T>(
  tableName: string, 
  record: T
): Promise<T | null> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from(tableName)
      .insert(record)
      .select()
      .single()
    
    if (error) {
      throw error
    }
    
    console.info(`Successfully inserted record in ${tableName}`)
    
    return data as T
  } catch (error) {
    console.error(`Failed to insert record in ${tableName}`, error)
    return null
  }
}

// Type-safe function to update a record
export async function updateRecord<T>(
  tableName: string, 
  id: string, 
  updates: Partial<T>
): Promise<T | null> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from(tableName)
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      throw error
    }
    
    console.info(`Successfully updated record in ${tableName}`, { id })
    
    return data as T
  } catch (error) {
    console.error(`Failed to update record in ${tableName}`, error)
    return null
  }
}

// Type-safe function to delete a record
export async function deleteRecord(
  tableName: string, 
  id: string
): Promise<boolean> {
  try {
    const supabase = createClient()
    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq('id', id)
    
    if (error) {
      throw error
    }
    
    console.info(`Successfully deleted record from ${tableName}`, { id })
    
    return true
  } catch (error) {
    console.error(`Failed to delete record from ${tableName}`, error)
    return false
  }
}

// Function to get all bookings
export async function getAllBookings() {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      throw error
    }
    
    return data
  } catch (error) {
    console.error('Failed to fetch bookings', error)
    return []
  }
}

// Function to get bookings by user ID
export async function getBookingsByUserId(userId: string) {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) {
      throw error
    }
    
    return data
  } catch (error) {
    console.error('Failed to fetch user bookings', error)
    return []
  }
}

// Function to get all service providers
export async function getAllServiceProviders() {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('service_providers')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      throw error
    }
    
    return data
  } catch (error) {
    console.error('Failed to fetch service providers', error)
    return []
  }
}

// Function to get all clients
export async function getAllClients() {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      throw error
    }
    
    return data
  } catch (error) {
    console.error('Failed to fetch clients', error)
    return []
  }
}

// Function to get all provider applications
export async function getAllProviderApplications() {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('provider_applications')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      throw error
    }
    
    return data
  } catch (error) {
    console.error('Failed to fetch provider applications', error)
    return []
  }
}

// Function to get all customer questions
export async function getAllCustomerQuestions() {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('customer_questions')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      throw error
    }
    
    return data
  } catch (error) {
    console.error('Failed to fetch customer questions', error)
    return []
  }
}

// Function to get all invoices
export async function getAllInvoices() {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('invoices')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      throw error
    }
    
    return data
  } catch (error) {
    console.error('Failed to fetch invoices', error)
    return []
  }
}

// Function to get provider availability
export async function getProviderAvailability(providerId: string) {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('provider_availability')
      .select('*')
      .eq('provider_id', providerId)
      .order('start_time', { ascending: true })
    
    if (error) {
      throw error
    }
    
    return data
  } catch (error) {
    console.error('Failed to fetch provider availability', error)
    return []
  }
}

// Function to get provider schedules
export async function getProviderSchedules(providerId: string) {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('provider_schedules')
      .select('*')
      .eq('provider_id', providerId)
      .order('day', { ascending: true })
    
    if (error) {
      throw error
    }
    
    return data
  } catch (error) {
    console.error('Failed to fetch provider schedules', error)
    return []
  }
}

// Function to get vacation requests
export async function getVacationRequests(providerId?: string) {
  try {
    const supabase = createClient()
    let query = supabase
      .from('provider_vacation_requests')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (providerId) {
      query = query.eq('provider_id', providerId)
    }
    
    const { data, error } = await query
    
    if (error) {
      throw error
    }
    
    return data
  } catch (error) {
    console.error('Failed to fetch vacation requests', error)
    return []
  }
}

// Function to get Google reviews
export async function getGoogleReviews() {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('google_reviews')
      .select('*')
      .order('time_created', { ascending: false })
    
    if (error) {
      throw error
    }
    
    return data
  } catch (error) {
    console.error('Failed to fetch Google reviews', error)
    return []
  }
}

// Function to get calendar events for a user
export async function getCalendarEvents(userId: string) {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('calendar_events')
      .select('*')
      .eq('user_id', userId)
      .order('start_time', { ascending: true })
    
    if (error) {
      throw error
    }
    
    return data
  } catch (error) {
    console.error('Failed to fetch calendar events', error)
    return []
  }
}

// Function to get admin roles
export async function getAdminRoles() {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('admin_roles')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      throw error
    }
    
    return data
  } catch (error) {
    console.error('Failed to fetch admin roles', error)
    return []
  }
}
