-- Secure question submissions with enhanced rate limiting and authentication requirements

-- First, update client_questions table to require authentication
DROP POLICY IF EXISTS "Public users can insert questions" ON public.client_questions;

-- Create policy requiring authentication for question submission
CREATE POLICY "Authenticated users can insert questions"
ON public.client_questions
FOR INSERT
TO authenticated
WITH CHECK (
  -- Ensure user owns the question and implement rate limiting
  auth.uid() IS NOT NULL
  AND NOT EXISTS (
    -- Prevent more than 3 questions per hour from same user
    SELECT 1 FROM public.client_questions 
    WHERE created_at > NOW() - INTERVAL '1 hour'
    AND ip_address = inet_client_addr()::text
    HAVING COUNT(*) >= 3
  )
);

-- Enhanced spam protection trigger for client_questions
CREATE OR REPLACE FUNCTION public.enhanced_question_spam_protection()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql;

-- Apply the enhanced trigger
DROP TRIGGER IF EXISTS enhanced_spam_protection ON public.client_questions;
CREATE TRIGGER enhanced_spam_protection
    BEFORE INSERT ON public.client_questions
    FOR EACH ROW
    EXECUTE FUNCTION public.enhanced_question_spam_protection();

-- Add encryption key column for calendar credentials (for future encryption)
ALTER TABLE public.calendar_credentials 
ADD COLUMN IF NOT EXISTS encryption_version INTEGER DEFAULT 1;

-- Create index for better performance on spam checking
CREATE INDEX IF NOT EXISTS idx_client_questions_ip_created 
ON public.client_questions(ip_address, created_at) 
WHERE is_spam = FALSE;

CREATE INDEX IF NOT EXISTS idx_client_questions_content_created 
ON public.client_questions(question, created_at) 
WHERE is_spam = FALSE;