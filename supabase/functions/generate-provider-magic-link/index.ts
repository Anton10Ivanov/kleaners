
// This edge function generates and sends a magic link for provider account creation
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.48.1";
import * as crypto from "https://deno.land/std@0.168.0/crypto/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Generate a secure random token
async function generateToken(length = 32): Promise<string> {
  const randomBytes = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(randomBytes)
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

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
    const { applicationId, email, name } = await req.json();

    if (!applicationId || !email) {
      return new Response(
        JSON.stringify({ 
          error: "Missing required fields: applicationId and email are required"
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Save the application data if it doesn't exist yet
    const { data: existingApp, error: fetchError } = await supabase
      .from("provider_applications")
      .select("id")
      .eq("id", applicationId)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("Error fetching application:", fetchError);
      throw fetchError;
    }

    if (!existingApp) {
      const { error: insertError } = await supabase
        .from("provider_applications")
        .insert({
          id: applicationId,
          email,
          name,
          phone: "",  // These fields will be updated later
          status: "pending_verification"
        });

      if (insertError) {
        console.error("Error inserting application:", insertError);
        throw insertError;
      }
    }

    // Generate token and set expiration (24 hours from now)
    const token = await generateToken();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    // Store the token in the database
    const { error: tokenError } = await supabase
      .from("provider_verification_tokens")
      .insert({
        application_id: applicationId,
        email,
        token,
        expires_at: expiresAt.toISOString(),
        used: false
      });

    if (tokenError) {
      console.error("Error storing token:", tokenError);
      throw tokenError;
    }

    // Generate the verification URL
    const baseUrl = new URL(req.url).origin;
    const verificationUrl = `${baseUrl}/auth/verify-provider?token=${token}`;

    // For now, we'll return the verification URL to the client
    // In a production environment, you would send this via email
    console.log("Generated verification URL:", verificationUrl);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Magic link generated successfully",
        // Only for development purposes
        url: verificationUrl
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    console.error("Error in generate-provider-magic-link function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
