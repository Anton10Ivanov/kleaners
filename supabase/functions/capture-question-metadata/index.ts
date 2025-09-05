
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { questionId } = await req.json()

    if (!questionId) {
      return new Response(
        JSON.stringify({ error: 'Question ID is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get client IP address from headers
    const forwarded = req.headers.get('x-forwarded-for')
    const realIp = req.headers.get('x-real-ip')
    const clientIp = forwarded?.split(',')[0] || realIp || 'unknown'

    // Check for spam protection - 2 submissions per week
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    
    const { data: recentSubmissions, error: checkError } = await supabaseClient
      .from('customer_questions')
      .select('id')
      .eq('ip_address', clientIp)
      .gte('created_at', oneWeekAgo)
      .eq('is_spam', false)

    if (checkError) {
      console.error('Error checking spam protection:', checkError)
    }

    // If more than 2 submissions in the past week, mark as spam
    let isSpam = false
    if (recentSubmissions && recentSubmissions.length >= 2) {
      isSpam = true
    }

    // Update the question record with IP address and spam status
    const { error } = await supabaseClient
      .from('customer_questions')
      .update({ 
        ip_address: clientIp,
        is_spam: isSpam,
        status: isSpam ? 'spam' : 'pending'
      })
      .eq('id', questionId)

    if (error) {
      console.error('Error updating question with IP:', error)
      return new Response(
        JSON.stringify({ error: 'Failed to update question metadata' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (isSpam) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Maximum 2 submissions per week.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ success: true, ip_captured: clientIp }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in capture-question-metadata function:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
