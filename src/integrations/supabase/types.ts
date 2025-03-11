export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
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
          bathrooms: number
          bedrooms: number
          created_at: string | null
          date: string | null
          email: string | null
          entry_code: string | null
          extras: string[] | null
          first_name: string | null
          floor: string | null
          frequency: string
          hours: number
          id: string
          last_name: string | null
          phone: string | null
          postal_code: string
          service_type: string
          special_instructions: string | null
          status: Database["public"]["Enums"]["booking_status"] | null
          total_price: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          access_instructions?: string | null
          access_method?: string | null
          address?: string | null
          bathrooms: number
          bedrooms: number
          created_at?: string | null
          date?: string | null
          email?: string | null
          entry_code?: string | null
          extras?: string[] | null
          first_name?: string | null
          floor?: string | null
          frequency: string
          hours: number
          id?: string
          last_name?: string | null
          phone?: string | null
          postal_code: string
          service_type: string
          special_instructions?: string | null
          status?: Database["public"]["Enums"]["booking_status"] | null
          total_price?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          access_instructions?: string | null
          access_method?: string | null
          address?: string | null
          bathrooms?: number
          bedrooms?: number
          created_at?: string | null
          date?: string | null
          email?: string | null
          entry_code?: string | null
          extras?: string[] | null
          first_name?: string | null
          floor?: string | null
          frequency?: string
          hours?: number
          id?: string
          last_name?: string | null
          phone?: string | null
          postal_code?: string
          service_type?: string
          special_instructions?: string | null
          status?: Database["public"]["Enums"]["booking_status"] | null
          total_price?: number | null
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
      customers: {
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
      check_is_admin:
        | {
            Args: Record<PropertyKey, never>
            Returns: boolean
          }
        | {
            Args: {
              user_id: string
            }
            Returns: boolean
          }
      check_question_spam_protection: {
        Args: {
          p_email: string
          p_ip_address: string
        }
        Returns: boolean
      }
      has_role: {
        Args: {
          user_id: string
          role: Database["public"]["Enums"]["app_role"]
        }
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
