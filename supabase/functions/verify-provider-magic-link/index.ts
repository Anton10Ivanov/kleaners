
// This edge function verifies the magic link token and sets up the provider account
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
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { token } = await req.json();

    if (!token) {
      return new Response(
        JSON.stringify({ error: "Missing required token" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Find and validate the token
    const { data: tokenData, error: tokenError } = await supabase
      .from("provider_verification_tokens")
      .select("*")
      .eq("token", token)
      .eq("used", false)
      .single();

    if (tokenError || !tokenData) {
      return new Response(
        JSON.stringify({ error: "Invalid or expired token" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Check if token has expired
    if (new Date(tokenData.expires_at) < new Date()) {
      return new Response(
        JSON.stringify({ error: "Token has expired" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Get the provider application
    const { data: application, error: applicationError } = await supabase
      .from("provider_applications")
      .select("*")
      .eq("id", tokenData.application_id)
      .single();

    if (applicationError || !application) {
      console.error("Application not found:", applicationError);
      return new Response(
        JSON.stringify({ error: "Application not found" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Generate a temporary password
    const tempPassword = Math.random().toString(36).slice(-10);

    // Create the user account if it doesn't exist
    let userId;
    
    // Check if user already exists
    const { data: existingUser } = await supabase
      .auth.admin.listUsers({
        filters: {
          email: application.email
        }
      });

    if (existingUser && existingUser.users && existingUser.users.length > 0) {
      // User exists, get their ID
      userId = existingUser.users[0].id;
    } else {
      // Create a new user
      const { data: newUser, error: userError } = await supabase.auth.admin.createUser({
        email: application.email,
        password: tempPassword,
        email_confirm: true,
        user_metadata: {
          first_name: application.name.split(' ')[0] || '',
          last_name: application.name.split(' ').slice(1).join(' ') || '',
          user_type: 'provider'
        }
      });

      if (userError) {
        console.error("Error creating user:", userError);
        return new Response(
          JSON.stringify({ error: "Failed to create user account" }),
          { 
            status: 500, 
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          }
        );
      }

      userId = newUser.user.id;
    }

    // Update the provider application
    const { error: updateAppError } = await supabase
      .from("provider_applications")
      .update({
        user_id: userId,
        status: "account_created"
      })
      .eq("id", tokenData.application_id);

    if (updateAppError) {
      console.error("Error updating application:", updateAppError);
    }

    // Create service provider record if it doesn't exist
    const { data: existingProvider } = await supabase
      .from("service_providers")
      .select("id")
      .eq("id", userId)
      .single();

    if (!existingProvider) {
      const { error: providerError } = await supabase
        .from("service_providers")
        .insert({
          id: userId,
          email: application.email,
          first_name: application.name.split(' ')[0] || '',
          last_name: application.name.split(' ').slice(1).join(' ') || '',
          phone: application.phone || ''
        });

      if (providerError) {
        console.error("Error creating provider record:", providerError);
      }
    }

    // Mark the token as used
    const { error: updateTokenError } = await supabase
      .from("provider_verification_tokens")
      .update({ used: true })
      .eq("id", tokenData.id);

    if (updateTokenError) {
      console.error("Error marking token as used:", updateTokenError);
    }

    // Generate a login session
    const { data: session, error: sessionError } = await supabase.auth.admin.createUser({
      email: application.email,
      email_confirm: true,
      user_metadata: {
        user_type: 'provider'
      }
    });

    if (sessionError) {
      console.error("Error creating session:", sessionError);
      return new Response(
        JSON.stringify({ error: "Failed to create session" }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Return a success response with the session
    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Provider account verified and created successfully",
        user: {
          id: userId,
          email: application.email
        }
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    console.error("Error in verify-provider-magic-link function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
