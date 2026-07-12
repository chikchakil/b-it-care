export type UserRole = "admin" | "staff";

export type Profile = {
  id: string;
  user_id: string;
  full_name: string | null;
  email: string;
  role: UserRole;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type LeadStatus =
  | "new"
  | "contacted"
  | "call_scheduled"
  | "proposal_pending"
  | "converted"
  | "not_relevant";

export type Lead = {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  business_name: string;
  message: string;
  source: string;
  status: LeadStatus;
  assigned_to: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<Profile, "id" | "created_at">>;
        Relationships: [];
      };
      leads: {
        Row: Lead;
        Insert: Omit<Lead, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<Lead, "id" | "created_at">>;
        Relationships: [
          {
            foreignKeyName: "leads_assigned_to_fkey";
            columns: ["assigned_to"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      user_role: UserRole;
      lead_status: LeadStatus;
    };
    CompositeTypes: Record<string, never>;
  };
};

export const leadStatusLabels: Record<LeadStatus, string> = {
  new: "חדש",
  contacted: "חזרנו ללקוח",
  call_scheduled: "נקבעה שיחה",
  proposal_pending: "ממתין להצעת מחיר",
  converted: "נסגר כלקוח",
  not_relevant: "לא רלוונטי"
};
