-- Phase 1: Critical Database Security Fixes

-- 1. Enable RLS on clients table and create secure policies
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- Only allow users to view their own client record
CREATE POLICY "Users can view their own client record"
  ON public.clients FOR SELECT
  USING (auth.uid() = id);

-- Allow users to update their own client record
CREATE POLICY "Users can update their own client record"
  ON public.clients FOR UPDATE
  USING (auth.uid() = id);

-- Allow admins to view all client records
CREATE POLICY "Admins can view all client records"
  ON public.clients FOR SELECT
  USING (check_admin_access());

-- Allow admins to update all client records
CREATE POLICY "Admins can update all client records"
  ON public.clients FOR UPDATE
  USING (check_admin_access());

-- 2. Fix database function security by adding proper search_path settings
CREATE OR REPLACE FUNCTION public.check_is_admin(user_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = ''
AS $function$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_roles 
    WHERE admin_roles.user_id = $1
  );
END;
$function$;

CREATE OR REPLACE FUNCTION public.check_admin_access()
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = ''
AS $function$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_roles 
    WHERE admin_roles.user_id = auth.uid()
  );
END;
$function$;

CREATE OR REPLACE FUNCTION public.has_role(user_id uuid, role app_role)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = ''
AS $function$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.admin_roles 
        WHERE admin_roles.user_id = $1 
        AND admin_roles.role = $2
    );
END;
$function$;

CREATE OR REPLACE FUNCTION public.check_admin_role_directly()
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = ''
AS $function$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM public.admin_roles 
    WHERE user_id = auth.uid()
  );
END;
$function$;

CREATE OR REPLACE FUNCTION public.check_is_admin()
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = ''
AS $function$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM public.admin_roles 
    WHERE admin_roles.user_id = auth.uid()
  );
END;
$function$;

CREATE OR REPLACE FUNCTION public.check_question_spam_protection(p_email text, p_ip_address text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = ''
AS $function$
DECLARE
  recent_count INTEGER;
BEGIN
  -- Count submissions from this email or IP in the last hour
  SELECT COUNT(*) INTO recent_count
  FROM public.customer_questions
  WHERE (
    (p_email IS NOT NULL AND email = p_email) OR
    (p_ip_address IS NOT NULL AND ip_address = p_ip_address)
  )
  AND created_at > NOW() - INTERVAL '1 hour';
  
  -- Return true if too many submissions detected
  RETURN recent_count > 5; -- Limit to 5 submissions per hour
END;
$function$;