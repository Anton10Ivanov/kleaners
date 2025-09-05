-- Fix remaining database functions that need search_path security

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = ''
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

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = ''
AS $function$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.mark_spam_questions()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = ''
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
 SET search_path = ''
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

CREATE OR REPLACE FUNCTION public.update_conversation_timestamp()
RETURNS TRIGGER 
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  UPDATE public.conversations
  SET updated_at = NOW()
  WHERE id = NEW.conversation_id;
  RETURN NEW;
END;
$$;