
export interface Database {
  public: {
    Tables: {
      clients: {
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
          client_id: string;
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
          // Phase 1: Service-specific fields
          property_size?: number | null;
          num_residents?: number | null;
          supplies_provided?: boolean | null;
          square_meters?: number | null;
          num_employees?: number | null;
          avg_visitors_per_week?: number | null;
          cleaning_during_work_hours?: boolean | null;
          security_clearance_required?: boolean | null;
          dirtiness_level?: number | null;
          last_cleaned?: string | null;
          include_walls_and_ceilings?: boolean | null;
          mold_or_pest_presence?: boolean | null;
          special_surfaces_to_handle?: string | null;
          target_areas?: string[] | null;
          is_furnished?: boolean | null;
          trash_removal_needed?: boolean | null;
          pre_inspection_required?: boolean | null;
          parking_available?: boolean | null;
          cleaning_goal?: string | null;
          disinfection_required?: boolean | null;
        };
        Insert: {
          id?: string;
          client_id: string;
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
          // Phase 1: Service-specific fields
          property_size?: number | null;
          num_residents?: number | null;
          supplies_provided?: boolean | null;
          square_meters?: number | null;
          num_employees?: number | null;
          avg_visitors_per_week?: number | null;
          cleaning_during_work_hours?: boolean | null;
          security_clearance_required?: boolean | null;
          dirtiness_level?: number | null;
          last_cleaned?: string | null;
          include_walls_and_ceilings?: boolean | null;
          mold_or_pest_presence?: boolean | null;
          special_surfaces_to_handle?: string | null;
          target_areas?: string[] | null;
          is_furnished?: boolean | null;
          trash_removal_needed?: boolean | null;
          pre_inspection_required?: boolean | null;
          parking_available?: boolean | null;
          cleaning_goal?: string | null;
          disinfection_required?: boolean | null;
        };
        Update: {
          id?: string;
          client_id?: string;
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
          // Phase 1: Service-specific fields
          property_size?: number | null;
          num_residents?: number | null;
          supplies_provided?: boolean | null;
          square_meters?: number | null;
          num_employees?: number | null;
          avg_visitors_per_week?: number | null;
          cleaning_during_work_hours?: boolean | null;
          security_clearance_required?: boolean | null;
          dirtiness_level?: number | null;
          last_cleaned?: string | null;
          include_walls_and_ceilings?: boolean | null;
          mold_or_pest_presence?: boolean | null;
          special_surfaces_to_handle?: string | null;
          target_areas?: string[] | null;
          is_furnished?: boolean | null;
          trash_removal_needed?: boolean | null;
          pre_inspection_required?: boolean | null;
          parking_available?: boolean | null;
          cleaning_goal?: string | null;
          disinfection_required?: boolean | null;
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
          client_id: string;
          provider_id: string;
          rating: number;
          comment?: string | null;
          created_at?: string | null;
        };
        Insert: {
          id?: string;
          booking_id: string;
          client_id: string;
          provider_id: string;
          rating: number;
          comment?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          booking_id?: string;
          client_id?: string;
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
