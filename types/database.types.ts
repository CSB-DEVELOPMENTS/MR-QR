export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4";
  };
  public: {
    Tables: {
      landing_page: {
        Row: {
          business_name: string | null;
          created_at: string | null;
          description: string | null;
          landingpage_id: string;
          logo_path: string | null;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          business_name?: string | null;
          created_at?: string | null;
          description?: string | null;
          landingpage_id?: string;
          logo_path?: string | null;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          business_name?: string | null;
          created_at?: string | null;
          description?: string | null;
          landingpage_id?: string;
          logo_path?: string | null;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "landing_page_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["user_id"];
          },
        ];
      };
      link: {
        Row: {
          created_at: string | null;
          landingpage_id: string;
          link: string;
          link_id: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          landingpage_id: string;
          link: string;
          link_id?: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          landingpage_id?: string;
          link?: string;
          link_id?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "link_landingpage_id_fkey";
            columns: ["landingpage_id"];
            isOneToOne: false;
            referencedRelation: "landing_page";
            referencedColumns: ["landingpage_id"];
          },
        ];
      };
      payments: {
        Row: {
          amount: number;
          created_at: string | null;
          currency: string;
          gateway_payment_id: string | null;
          gateway_response: Json | null;
          order_id: string | null;
          payment_id: string;
          user_subscription_id: string;
        };
        Insert: {
          amount: number;
          created_at?: string | null;
          currency?: string;
          gateway_payment_id?: string | null;
          gateway_response?: Json | null;
          order_id?: string | null;
          payment_id?: string;
          user_subscription_id: string;
        };
        Update: {
          amount?: number;
          created_at?: string | null;
          currency?: string;
          gateway_payment_id?: string | null;
          gateway_response?: Json | null;
          order_id?: string | null;
          payment_id?: string;
          user_subscription_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "payments_user_subscription_id_fkey";
            columns: ["user_subscription_id"];
            isOneToOne: false;
            referencedRelation: "user_subscription";
            referencedColumns: ["user_subscription_id"];
          },
        ];
      };
      qr: {
        Row: {
          created_at: string | null;
          image_url: string | null;
          is_active: boolean | null;
          qr_id: string;
          styles: Json | null;
          total_clicks: number | null;
          type: string | null;
          updated_at: string | null;
          url: string;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          image_url?: string | null;
          is_active?: boolean | null;
          qr_id?: string;
          styles?: Json | null;
          total_clicks?: number | null;
          type?: string | null;
          updated_at?: string | null;
          url: string;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          image_url?: string | null;
          is_active?: boolean | null;
          qr_id?: string;
          styles?: Json | null;
          total_clicks?: number | null;
          type?: string | null;
          updated_at?: string | null;
          url?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "qr_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["user_id"];
          },
        ];
      };
      qr_clicks: {
        Row: {
          country: string | null;
          created_at: string | null;
          device: string | null;
          id: string;
          qr_id: string;
        };
        Insert: {
          country?: string | null;
          created_at?: string | null;
          device?: string | null;
          id?: string;
          qr_id: string;
        };
        Update: {
          country?: string | null;
          created_at?: string | null;
          device?: string | null;
          id?: string;
          qr_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "qr_clicks_qr_id_fkey";
            columns: ["qr_id"];
            isOneToOne: false;
            referencedRelation: "qr";
            referencedColumns: ["qr_id"];
          },
        ];
      };
      shorten_url: {
        Row: {
          created_at: string | null;
          is_active: boolean | null;
          short_url: string;
          shorten_url_id: string;
          total_clicks: number | null;
          updated_at: string | null;
          url: string;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          is_active?: boolean | null;
          short_url: string;
          shorten_url_id?: string;
          total_clicks?: number | null;
          updated_at?: string | null;
          url: string;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          is_active?: boolean | null;
          short_url?: string;
          shorten_url_id?: string;
          total_clicks?: number | null;
          updated_at?: string | null;
          url?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "shorten_url_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["user_id"];
          },
        ];
      };
      subscription_plan: {
        Row: {
          billing_period_months: number;
          created_at: string | null;
          limits: Json;
          name: string;
          permissions: Json;
          price: number;
          subscription_id: string;
          updated_at: string | null;
        };
        Insert: {
          billing_period_months: number;
          created_at?: string | null;
          limits?: Json;
          name: string;
          permissions?: Json;
          price: number;
          subscription_id?: string;
          updated_at?: string | null;
        };
        Update: {
          billing_period_months?: number;
          created_at?: string | null;
          limits?: Json;
          name?: string;
          permissions?: Json;
          price?: number;
          subscription_id?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      usage_tracking: {
        Row: {
          action_type: string;
          created_at: string | null;
          id: string;
          metadata: Json | null;
          user_id: string;
        };
        Insert: {
          action_type: string;
          created_at?: string | null;
          id?: string;
          metadata?: Json | null;
          user_id: string;
        };
        Update: {
          action_type?: string;
          created_at?: string | null;
          id?: string;
          metadata?: Json | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "usage_tracking_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["user_id"];
          },
        ];
      };
      user_subscription: {
        Row: {
          cancel_at_period_end: boolean | null;
          created_at: string | null;
          current_period_end: string | null;
          current_period_start: string | null;
          gateway_subscription_id: string | null;
          is_active: string;
          next_billing_date: string | null;
          subscription_plan_id: string;
          updated_at: string | null;
          user_id: string;
          user_subscription_id: string;
        };
        Insert: {
          cancel_at_period_end?: boolean | null;
          created_at?: string | null;
          current_period_end?: string | null;
          current_period_start?: string | null;
          gateway_subscription_id?: string | null;
          is_active?: string;
          next_billing_date?: string | null;
          subscription_plan_id: string;
          updated_at?: string | null;
          user_id: string;
          user_subscription_id?: string;
        };
        Update: {
          cancel_at_period_end?: boolean | null;
          created_at?: string | null;
          current_period_end?: string | null;
          current_period_start?: string | null;
          gateway_subscription_id?: string | null;
          is_active?: string;
          next_billing_date?: string | null;
          subscription_plan_id?: string;
          updated_at?: string | null;
          user_id?: string;
          user_subscription_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_subscription_subscription_plan_id_fkey";
            columns: ["subscription_plan_id"];
            isOneToOne: false;
            referencedRelation: "subscription_plan";
            referencedColumns: ["subscription_id"];
          },
          {
            foreignKeyName: "user_subscription_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["user_id"];
          },
        ];
      };
      users: {
        Row: {
          created_at: string | null;
          email: string;
          first_name: string | null;
          last_name: string | null;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          email: string;
          first_name?: string | null;
          last_name?: string | null;
          updated_at?: string | null;
          user_id?: string;
        };
        Update: {
          created_at?: string | null;
          email?: string;
          first_name?: string | null;
          last_name?: string | null;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
      vcard: {
        Row: {
          company: string | null;
          contact: string | null;
          created_at: string | null;
          email: string | null;
          job_title: string | null;
          social: Json | null;
          updated_at: string | null;
          user_id: string;
          vcard_id: string;
          web_url: string | null;
        };
        Insert: {
          company?: string | null;
          contact?: string | null;
          created_at?: string | null;
          email?: string | null;
          job_title?: string | null;
          social?: Json | null;
          updated_at?: string | null;
          user_id: string;
          vcard_id?: string;
          web_url?: string | null;
        };
        Update: {
          company?: string | null;
          contact?: string | null;
          created_at?: string | null;
          email?: string | null;
          job_title?: string | null;
          social?: Json | null;
          updated_at?: string | null;
          user_id?: string;
          vcard_id?: string;
          web_url?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "vcard_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["user_id"];
          },
        ];
      };
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
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
