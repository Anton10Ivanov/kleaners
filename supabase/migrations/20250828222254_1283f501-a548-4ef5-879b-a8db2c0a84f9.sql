-- Fix security issue: Restrict service role access to provider_verification_tokens
-- Remove the overly permissive service role policy
DROP POLICY IF EXISTS "Service role can access all verification tokens" ON public.provider_verification_tokens;

-- Create a more restrictive policy for edge functions
-- Only allow service role to SELECT and UPDATE tokens (for verification process)
-- No need for INSERT/DELETE as those are handled by admin users
CREATE POLICY "Edge functions can verify tokens"
ON public.provider_verification_tokens
FOR SELECT
TO service_role
USING (true);

CREATE POLICY "Edge functions can mark tokens as used"
ON public.provider_verification_tokens
FOR UPDATE
TO service_role
USING (true)
WITH CHECK (true);

-- Also fix the admin roles exposure issue while we're at it
-- Remove overly permissive policies on admin_roles
DROP POLICY IF EXISTS "Allow all access to admin_roles" ON public.admin_roles;
DROP POLICY IF EXISTS "Allow read access to admin_roles" ON public.admin_roles;
DROP POLICY IF EXISTS "Authenticated users can view admin_roles" ON public.admin_roles;

-- Keep only the necessary policies for admin_roles
-- (The other policies that check for admin access are fine)