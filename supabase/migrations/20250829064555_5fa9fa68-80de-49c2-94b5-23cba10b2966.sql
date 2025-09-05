-- Fix function search path security issues by setting search_path for all functions

-- Update existing functions to have secure search_path
CREATE OR REPLACE FUNCTION public.check_question_spam_protection(p_email text, p_ip_address text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
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

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  
  -- Update to create a client record instead of a customer record
  INSERT INTO public.clients (
    id,
    email,
    first_name,
    last_name
  ) VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name'
  );
  
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.check_admin_role_directly()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
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
SET search_path TO 'public'
AS $function$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM public.admin_roles 
    WHERE admin_roles.user_id = auth.uid()
  );
END;
$function$;

CREATE OR REPLACE FUNCTION public.check_is_admin(user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_roles 
    WHERE admin_roles.user_id = $1
  );
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $function$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.check_admin_access()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_roles 
    WHERE admin_roles.user_id = auth.uid()
  );
END;
$function$;

CREATE OR REPLACE FUNCTION public.mark_spam_questions()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Check if this submission exceeds our rate limits
  IF public.check_question_spam_protection(NEW.email, NEW.ip_address) THEN
    NEW.is_spam := TRUE;
    NEW.status := 'spam';
  END IF;
  
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.check_question_spam_protection_enhanced()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $function$
DECLARE
    recent_count INTEGER;
    hourly_limit INTEGER := 3;
    daily_limit INTEGER := 10;
BEGIN
    -- Count recent submissions from this IP in the last hour
    SELECT COUNT(*) INTO recent_count
    FROM public.customer_questions
    WHERE ip_address = NEW.ip_address
    AND created_at > NOW() - INTERVAL '1 hour'
    AND is_spam = FALSE;
    
    -- Mark as spam if hourly limit exceeded
    IF recent_count >= hourly_limit THEN
        NEW.is_spam := TRUE;
        NEW.status := 'spam';
        RETURN NEW;
    END IF;
    
    -- Count submissions from this IP in the last 24 hours
    SELECT COUNT(*) INTO recent_count
    FROM public.customer_questions
    WHERE ip_address = NEW.ip_address
    AND created_at > NOW() - INTERVAL '24 hours'
    AND is_spam = FALSE;
    
    -- Mark as spam if daily limit exceeded
    IF recent_count >= daily_limit THEN
        NEW.is_spam := TRUE;
        NEW.status := 'spam';
        RETURN NEW;
    END IF;
    
    -- Check for identical content in last 24 hours
    SELECT COUNT(*) INTO recent_count
    FROM public.customer_questions
    WHERE question = NEW.question
    AND created_at > NOW() - INTERVAL '24 hours'
    AND is_spam = FALSE;
    
    IF recent_count > 0 THEN
        NEW.is_spam := TRUE;
        NEW.status := 'spam';
        RETURN NEW;
    END IF;
    
    RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.has_role(user_id uuid, role app_role)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.admin_roles 
        WHERE admin_roles.user_id = $1 
        AND admin_roles.role = $2
    );
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_conversation_timestamp()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $function$
BEGIN
  UPDATE public.conversations
  SET updated_at = NOW()
  WHERE id = NEW.conversation_id;
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.enhanced_question_spam_protection()
RETURNS TRIGGER 
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
DECLARE
    hourly_count INTEGER;
    daily_count INTEGER;
    duplicate_count INTEGER;
BEGIN
    -- Count questions from this IP in last hour
    SELECT COUNT(*) INTO hourly_count
    FROM public.client_questions
    WHERE ip_address = NEW.ip_address
    AND created_at > NOW() - INTERVAL '1 hour'
    AND is_spam = FALSE;
    
    -- Count questions from this IP in last 24 hours
    SELECT COUNT(*) INTO daily_count
    FROM public.client_questions
    WHERE ip_address = NEW.ip_address
    AND created_at > NOW() - INTERVAL '24 hours'
    AND is_spam = FALSE;
    
    -- Check for duplicate content
    SELECT COUNT(*) INTO duplicate_count
    FROM public.client_questions
    WHERE question = NEW.question
    AND created_at > NOW() - INTERVAL '24 hours'
    AND is_spam = FALSE;
    
    -- Mark as spam if limits exceeded
    IF hourly_count >= 3 OR daily_count >= 10 OR duplicate_count > 0 THEN
        NEW.is_spam := TRUE;
        NEW.status := 'spam';
    END IF;
    
    -- Set IP address from client
    NEW.ip_address := COALESCE(NEW.ip_address, inet_client_addr()::text);
    
    RETURN NEW;
END;
$$;