
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'
import { corsHeaders } from '../_shared/cors.ts'

interface RequestPayload {
  questionId: string;
}

interface MetadataUpdatePayload {
  ip_address: string;
  user_agent: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Get request info - with type safety
    const payload = await req.json() as RequestPayload;
    const { questionId } = payload;
    
    if (!questionId) {
      throw new Error('Missing required field: questionId');
    }
    
    const clientIp = req.headers.get('x-forwarded-for') || 'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';
    
    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing required environment variables for Supabase client');
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    console.log(`Updating question ${questionId} with metadata: IP=${clientIp}`);
    
    // Update the question with the client IP and user agent
    const updatePayload: MetadataUpdatePayload = {
      ip_address: clientIp,
      user_agent: userAgent
    };
    
    const { error } = await supabase
      .from('customer_questions')
      .update(updatePayload)
      .eq('id', questionId);
    
    if (error) {
      console.error('Error updating question metadata:', error);
      throw error;
    }
    
    console.log('Successfully updated question metadata');
    
    // Return success response
    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders 
        } 
      }
    );
  } catch (error) {
    console.error('Error in capture-question-metadata function:', error);
    
    // Return error response with proper type handling
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 400, 
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders 
        } 
      }
    );
  }
})
