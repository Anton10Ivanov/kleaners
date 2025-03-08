
export type CustomerQuestion = {
  id: string;
  name: string;
  email: string;
  question: string;
  status: string;
  created_at: string;
  is_spam: boolean;
  ip_address: string | null;
  user_agent: string | null;
};
