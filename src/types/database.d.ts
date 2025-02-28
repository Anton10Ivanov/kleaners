
export interface Database {
  public: {
    Tables: {
      customers: {
        Row: {
          id: string;
          first_name: string;
          last_name: string;
          email: string;
          phone?: string | null;
          address?: string | null;
          notes?: string | null;
          password?: string | null;
          username?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
          avatar_url?: string | null;
        };
        Insert: {
          id: string;
          first_name: string;
          last_name: string;
          email: string;
          phone?: string | null;
          address?: string | null;
          notes?: string | null;
          password?: string | null;
          username?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
          avatar_url?: string | null;
        };
        Update: {
          id?: string;
          first_name?: string;
          last_name?: string;
          email?: string;
          phone?: string | null;
          address?: string | null;
          notes?: string | null;
          password?: string | null;
          username?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
          avatar_url?: string | null;
        };
      };
      // Add other tables as needed
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
