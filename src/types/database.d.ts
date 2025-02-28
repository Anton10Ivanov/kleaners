
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
      
      bookings: {
        Row: {
          id: string;
          customer_id: string;
          service_type: "regular" | "business" | "move_in_out" | "post_construction";
          booking_date: string;
          start_time: string;
          end_time?: string | null;
          status: "pending" | "confirmed" | "completed" | "cancelled";
          total_price: number;
          address: string;
          notes?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
          provider_id?: string | null;
          extras?: string[] | null;
          frequency?: "one_time" | "weekly" | "bi_weekly" | "monthly" | null;
        };
        Insert: {
          id?: string;
          customer_id: string;
          service_type: "regular" | "business" | "move_in_out" | "post_construction";
          booking_date: string;
          start_time: string;
          end_time?: string | null;
          status?: "pending" | "confirmed" | "completed" | "cancelled";
          total_price: number;
          address: string;
          notes?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
          provider_id?: string | null;
          extras?: string[] | null;
          frequency?: "one_time" | "weekly" | "bi_weekly" | "monthly" | null;
        };
        Update: {
          id?: string;
          customer_id?: string;
          service_type?: "regular" | "business" | "move_in_out" | "post_construction";
          booking_date?: string;
          start_time?: string;
          end_time?: string | null;
          status?: "pending" | "confirmed" | "completed" | "cancelled";
          total_price?: number;
          address?: string;
          notes?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
          provider_id?: string | null;
          extras?: string[] | null;
          frequency?: "one_time" | "weekly" | "bi_weekly" | "monthly" | null;
        };
      };
      
      providers: {
        Row: {
          id: string;
          first_name: string;
          last_name: string;
          email: string;
          phone?: string | null;
          status: "available" | "busy" | "offline";
          rating?: number | null;
          avatar_url?: string | null;
          specialties?: string[] | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Insert: {
          id?: string;
          first_name: string;
          last_name: string;
          email: string;
          phone?: string | null;
          status?: "available" | "busy" | "offline";
          rating?: number | null;
          avatar_url?: string | null;
          specialties?: string[] | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          first_name?: string;
          last_name?: string;
          email?: string;
          phone?: string | null;
          status?: "available" | "busy" | "offline";
          rating?: number | null;
          avatar_url?: string | null;
          specialties?: string[] | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      
      reviews: {
        Row: {
          id: string;
          booking_id: string;
          customer_id: string;
          provider_id: string;
          rating: number;
          comment?: string | null;
          created_at?: string | null;
        };
        Insert: {
          id?: string;
          booking_id: string;
          customer_id: string;
          provider_id: string;
          rating: number;
          comment?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          booking_id?: string;
          customer_id?: string;
          provider_id?: string;
          rating?: number;
          comment?: string | null;
          created_at?: string | null;
        };
      };
    };
    
    Views: {
      [_ in never]: never;
    };
    
    Functions: {
      [_ in never]: never;
    };
    
    Enums: {
      service_type: "regular" | "business" | "move_in_out" | "post_construction";
      booking_status: "pending" | "confirmed" | "completed" | "cancelled";
      provider_status: "available" | "busy" | "offline";
      booking_frequency: "one_time" | "weekly" | "bi_weekly" | "monthly";
    };
  };
}
