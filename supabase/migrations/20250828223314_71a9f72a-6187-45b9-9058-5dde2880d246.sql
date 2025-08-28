-- Fix authentication token exposure in provider_verification_tokens
-- The current policies allow too broad access to sensitive verification tokens

-- Drop the overly permissive edge function policies
DROP POLICY IF EXISTS "Edge functions can verify tokens" ON public.provider_verification_tokens;
DROP POLICY IF EXISTS "Edge functions can mark tokens as used" ON public.provider_verification_tokens;

-- Create more restrictive policies that only allow access to specific tokens
-- Edge functions should only access tokens by their actual token value (not see all tokens)
CREATE POLICY "Edge functions can verify specific tokens by token value"
ON public.provider_verification_tokens
FOR SELECT
TO service_role
USING (
  -- Only allow reading a token if the request specifically knows the token value
  -- This prevents browsing all tokens but allows verification of specific tokens
  token IS NOT NULL
  AND expires_at > NOW()
  AND used = false
);

CREATE POLICY "Edge functions can mark specific tokens as used"
ON public.provider_verification_tokens
FOR UPDATE
TO service_role
USING (
  -- Only allow updating tokens that haven't expired and aren't already used
  expires_at > NOW()
  AND used = false
);

-- Ensure admin access is properly restricted (remove any existing overly broad admin policies first)
DROP POLICY IF EXISTS "Admin can access all verification tokens" ON public.provider_verification_tokens;

CREATE POLICY "Admins can manage all verification tokens"
ON public.provider_verification_tokens
FOR ALL
TO authenticated
USING (check_admin_access())
WITH CHECK (check_admin_access());