export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      admin_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string | null
        }
        Relationships: []
      }
      bookings: {
        Row: {
          access_instructions: string | null
          access_method: string | null
          address: string | null
          avg_visitors_per_week: number | null
          bathrooms: number
          bedrooms: number
          cleaning_during_work_hours: boolean | null
          cleaning_goal: string | null
          created_at: string | null
          date: string | null
          dirtiness_level: number | null
          disinfection_required: boolean | null
          email: string | null
          entry_code: string | null
          extras: string[] | null
          first_name: string | null
          floor: string | null
          frequency: string
          hours: number
          id: string
          include_walls_and_ceilings: boolean | null
          is_furnished: boolean | null
          last_cleaned: string | null
          last_name: string | null
          mold_or_pest_presence: boolean | null
          num_employees: number | null
          num_residents: number | null
          parking_available: boolean | null
          phone: string | null
          postal_code: string
          pre_inspection_required: boolean | null
          property_size: number | null
          security_clearance_required: boolean | null
          service_type: string
          special_instructions: string | null
          special_surfaces_to_handle: string | null
          square_meters: number | null
          status: Database["public"]["Enums"]["booking_status"] | null
          supplies_provided: boolean | null
          target_areas: string[] | null
          total_price: number | null
          trash_removal_needed: boolean | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          access_instructions?: string | null
          access_method?: string | null
          address?: string | null
          avg_visitors_per_week?: number | null
          bathrooms: number
          bedrooms: number
          cleaning_during_work_hours?: boolean | null
          cleaning_goal?: string | null
          created_at?: string | null
          date?: string | null
          dirtiness_level?: number | null
          disinfection_required?: boolean | null
          email?: string | null
          entry_code?: string | null
          extras?: string[] | null
          first_name?: string | null
          floor?: string | null
          frequency: string
          hours: number
          id?: string
          include_walls_and_ceilings?: boolean | null
          is_furnished?: boolean | null
          last_cleaned?: string | null
          last_name?: string | null
          mold_or_pest_presence?: boolean | null
          num_employees?: number | null
          num_residents?: number | null
          parking_available?: boolean | null
          phone?: string | null
          postal_code: string
          pre_inspection_required?: boolean | null
          property_size?: number | null
          security_clearance_required?: boolean | null
          service_type: string
          special_instructions?: string | null
          special_surfaces_to_handle?: string | null
          square_meters?: number | null
          status?: Database["public"]["Enums"]["booking_status"] | null
          supplies_provided?: boolean | null
          target_areas?: string[] | null
          total_price?: number | null
          trash_removal_needed?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          access_instructions?: string | null
          access_method?: string | null
          address?: string | null
          avg_visitors_per_week?: number | null
          bathrooms?: number
          bedrooms?: number
          cleaning_during_work_hours?: boolean | null
          cleaning_goal?: string | null
          created_at?: string | null
          date?: string | null
          dirtiness_level?: number | null
          disinfection_required?: boolean | null
          email?: string | null
          entry_code?: string | null
          extras?: string[] | null
          first_name?: string | null
          floor?: string | null
          frequency?: string
          hours?: number
          id?: string
          include_walls_and_ceilings?: boolean | null
          is_furnished?: boolean | null
          last_cleaned?: string | null
          last_name?: string | null
          mold_or_pest_presence?: boolean | null
          num_employees?: number | null
          num_residents?: number | null
          parking_available?: boolean | null
          phone?: string | null
          postal_code?: string
          pre_inspection_required?: boolean | null
          property_size?: number | null
          security_clearance_required?: boolean | null
          service_type?: string
          special_instructions?: string | null
          special_surfaces_to_handle?: string | null
          square_meters?: number | null
          status?: Database["public"]["Enums"]["booking_status"] | null
          supplies_provided?: boolean | null
          target_areas?: string[] | null
          total_price?: number | null
          trash_removal_needed?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      calendar_credentials: {
        Row: {
          access_token: string
          created_at: string | null
          expiry_date: string
          id: string
          refresh_token: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          access_token: string
          created_at?: string | null
          expiry_date: string
          id?: string
          refresh_token: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          access_token?: string
          created_at?: string | null
          expiry_date?: string
          id?: string
          refresh_token?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      calendar_events: {
        Row: {
          created_at: string | null
          description: string | null
          end_time: string
          event_id: string
          id: string
          start_time: string
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          end_time: string
          event_id: string
          id?: string
          start_time: string
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          end_time?: string
          event_id?: string
          id?: string
          start_time?: string
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      client_questions: {
        Row: {
          created_at: string
          email: string
          id: string
          ip_address: string | null
          is_spam: boolean | null
          name: string
          question: string
          status: string | null
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          ip_address?: string | null
          is_spam?: boolean | null
          name: string
          question: string
          status?: string | null
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          ip_address?: string | null
          is_spam?: boolean | null
          name?: string
          question?: string
          status?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      clients: {
        Row: {
          address: string | null
          created_at: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          notes: string | null
          password: string | null
          phone: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          email: string
          first_name: string
          id?: string
          last_name: string
          notes?: string | null
          password?: string | null
          phone?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          notes?: string | null
          password?: string | null
          phone?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      customer_profiles: {
        Row: {
          created_at: string | null
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      customer_questions: {
        Row: {
          created_at: string
          email: string | null
          id: string
          ip_address: string | null
          is_spam: boolean | null
          last_submission_time: string | null
          name: string | null
          question: string
          status: string | null
          submission_count: number | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          ip_address?: string | null
          is_spam?: boolean | null
          last_submission_time?: string | null
          name?: string | null
          question: string
          status?: string | null
          submission_count?: number | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          ip_address?: string | null
          is_spam?: boolean | null
          last_submission_time?: string | null
          name?: string | null
          question?: string
          status?: string | null
          submission_count?: number | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      google_reviews: {
        Row: {
          author_name: string
          author_photo_url: string | null
          created_at: string | null
          id: string
          place_id: string
          rating: number
          review_id: string
          text_content: string | null
          time_created: string
          updated_at: string | null
        }
        Insert: {
          author_name: string
          author_photo_url?: string | null
          created_at?: string | null
          id?: string
          place_id: string
          rating: number
          review_id: string
          text_content?: string | null
          time_created: string
          updated_at?: string | null
        }
        Update: {
          author_name?: string
          author_photo_url?: string | null
          created_at?: string | null
          id?: string
          place_id?: string
          rating?: number
          review_id?: string
          text_content?: string | null
          time_created?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      invoices: {
        Row: {
          amount: number
          booking_id: string
          created_at: string | null
          file_path: string
          id: string
          invoice_number: string
          status: string | null
        }
        Insert: {
          amount: number
          booking_id: string
          created_at?: string | null
          file_path: string
          id?: string
          invoice_number: string
          status?: string | null
        }
        Update: {
          amount?: number
          booking_id?: string
          created_at?: string | null
          file_path?: string
          id?: string
          invoice_number?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoices_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          created_at: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      provider_applications: {
        Row: {
          created_at: string
          email: string
          experience: string | null
          id: string
          message: string | null
          name: string
          phone: string
          position: string | null
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          experience?: string | null
          id: string
          message?: string | null
          name: string
          phone: string
          position?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          experience?: string | null
          id?: string
          message?: string | null
          name?: string
          phone?: string
          position?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      provider_availability: {
        Row: {
          created_at: string | null
          end_time: string
          id: string
          provider_id: string | null
          start_time: string
        }
        Insert: {
          created_at?: string | null
          end_time: string
          id?: string
          provider_id?: string | null
          start_time: string
        }
        Update: {
          created_at?: string | null
          end_time?: string
          id?: string
          provider_id?: string | null
          start_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "provider_availability_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "service_providers"
            referencedColumns: ["id"]
          },
        ]
      }
      provider_schedules: {
        Row: {
          created_at: string | null
          day: string
          end_time: string
          id: string
          is_available: boolean | null
          provider_id: string
          start_time: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          day: string
          end_time: string
          id?: string
          is_available?: boolean | null
          provider_id: string
          start_time: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          day?: string
          end_time?: string
          id?: string
          is_available?: boolean | null
          provider_id?: string
          start_time?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      provider_vacation_requests: {
        Row: {
          created_at: string
          end_date: string
          id: string
          provider_id: string
          start_date: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          end_date: string
          id?: string
          provider_id: string
          start_date: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          end_date?: string
          id?: string
          provider_id?: string
          start_date?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      provider_verification_tokens: {
        Row: {
          application_id: string
          created_at: string
          email: string
          expires_at: string
          id: string
          token: string
          used: boolean
        }
        Insert: {
          application_id: string
          created_at?: string
          email: string
          expires_at: string
          id?: string
          token: string
          used?: boolean
        }
        Update: {
          application_id?: string
          created_at?: string
          email?: string
          expires_at?: string
          id?: string
          token?: string
          used?: boolean
        }
        Relationships: []
      }
      service_providers: {
        Row: {
          created_at: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          password: string | null
          phone: string | null
          services: string[] | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          first_name: string
          id?: string
          last_name: string
          password?: string | null
          phone?: string | null
          services?: string[] | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          password?: string | null
          phone?: string | null
          services?: string[] | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_admin_access: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      check_admin_role_directly: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      check_is_admin: {
        Args: Record<PropertyKey, never> | { user_id: string }
        Returns: boolean
      }
      check_question_spam_protection: {
        Args: { p_email: string; p_ip_address: string }
        Returns: boolean
      }
      has_role: {
        Args: { user_id: string; role: Database["public"]["Enums"]["app_role"] }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user" | "super_admin"
      booking_status: "pending" | "confirmed" | "completed" | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user", "super_admin"],
      booking_status: ["pending", "confirmed", "completed", "cancelled"],
    },
  },
} as const
