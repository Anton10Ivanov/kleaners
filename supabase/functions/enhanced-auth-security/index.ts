import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Rate limiting map
const authRateLimit = new Map<string, { count: number; resetTime: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { action, email, ip } = await req.json();
    
    // Rate limiting by IP
    const now = Date.now();
    const rateLimitKey = ip || 'unknown';
    const currentLimit = authRateLimit.get(rateLimitKey);
    
    if (currentLimit && now < currentLimit.resetTime) {
      if (currentLimit.count >= MAX_ATTEMPTS) {
        console.log(`Rate limit exceeded for IP: ${rateLimitKey}`);
        return new Response(
          JSON.stringify({ 
            error: 'Too many attempts. Please try again later.',
            retryAfter: Math.ceil((currentLimit.resetTime - now) / 1000)
          }),
          {
            status: 429,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
      authRateLimit.set(rateLimitKey, {
        count: currentLimit.count + 1,
        resetTime: currentLimit.resetTime
      });
    } else {
      authRateLimit.set(rateLimitKey, {
        count: 1,
        resetTime: now + WINDOW_MS
      });
    }

    switch (action) {
      case 'validate_password': {
        const { password } = await req.json();
        
        const validation = {
          length: password.length >= 8,
          uppercase: /[A-Z]/.test(password),
          lowercase: /[a-z]/.test(password),
          number: /[0-9]/.test(password),
          special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        };
        
        const isValid = Object.values(validation).every(Boolean);
        
        return new Response(
          JSON.stringify({ isValid, validation }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
      
      case 'check_leaked_password': {
        const { password } = await req.json();
        
        // Simple check for common leaked passwords
        const commonPasswords = [
          'password', '123456', '123456789', 'qwerty', 'abc123',
          'password123', 'admin', 'letmein', 'welcome', 'monkey'
        ];
        
        const isLeaked = commonPasswords.includes(password.toLowerCase());
        
        return new Response(
          JSON.stringify({ isLeaked }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
      
      default:
        return new Response(
          JSON.stringify({ error: 'Invalid action' }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
    }
  } catch (error) {
    console.error('Auth security function error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});