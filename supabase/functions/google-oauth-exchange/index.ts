import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.48.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") as string;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") as string;
    const googleClientId = Deno.env.get("GOOGLE_CLIENT_ID") as string;
    const googleClientSecret = Deno.env.get("GOOGLE_CLIENT_SECRET") as string;
    
    if (!supabaseUrl || !supabaseServiceKey || !googleClientId || !googleClientSecret) {
      throw new Error("Missing required environment variables");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { code, redirectUri } = await req.json();

    if (!code || !redirectUri) {
      return new Response(
        JSON.stringify({ error: "Missing required parameters: code and redirectUri" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    console.log("Exchanging OAuth code for tokens");

    // Exchange the code for tokens using secure server-side credentials
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: googleClientId,
        client_secret: googleClientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error("Google OAuth token exchange failed:", errorText);
      throw new Error('Failed to exchange authorization code');
    }

    const { access_token, refresh_token, expires_in } = await tokenResponse.json();

    // Get the current user
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Authorization header required" }),
        { 
          status: 401, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Verify the JWT and get user
    const jwt = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(jwt);
    
    if (userError || !user) {
      console.error("User verification failed:", userError);
      return new Response(
        JSON.stringify({ error: "Invalid authentication" }),
        { 
          status: 401, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Encrypt the tokens before storing (simple encryption for demo - in production use proper encryption)
    const encryptedAccessToken = btoa(access_token); // Basic encoding - use proper encryption in production
    const encryptedRefreshToken = btoa(refresh_token);

    // Store the encrypted tokens in Supabase
    const { error: insertError } = await supabase
      .from('calendar_credentials')
      .upsert({
        user_id: user.id,
        access_token: encryptedAccessToken,
        refresh_token: encryptedRefreshToken,
        expiry_date: new Date(Date.now() + expires_in * 1000).toISOString(),
      }, {
        onConflict: 'user_id'
      });

    if (insertError) {
      console.error("Failed to store calendar credentials:", insertError);
      throw new Error('Failed to store calendar credentials');
    }

    console.log("Successfully stored encrypted calendar credentials for user:", user.id);

    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Successfully connected to Google Calendar" 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );

  } catch (error) {
    console.error("Error in google-oauth-exchange function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});