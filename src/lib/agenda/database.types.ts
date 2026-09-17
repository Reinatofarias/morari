export type Database = {
  public: {
    Tables: {
      appointments: {
        Row: {
          id: string;
          date: string;
          start_time: string;
          end_time: string;
          name: string;
          whatsapp: string;
          notes: string | null;
          kind: string | null;
          status: string;
          created_at: string;
        };
      };
      availability: {
        Row: {
          weekday: number;
          enabled: boolean;
          start_time: string;
          end_time: string;
          updated_at: string;
        };
      };
      blocks: {
        Row: {
          id: string;
          date: string;
          all_day: boolean;
          start_time: string;
          end_time: string;
          reason: string | null;
          created_at: string;
        };
      };
      user_roles: {
        Row: {
          id: string;
          user_id: string;
          role: 'admin';
          created_at: string;
        };
      };
    };
    Functions: {
      booked_times: { Args: { p_date: string }; Returns: string[] };
      book_appointment: {
        Args: { p_date: string; p_start: string; p_name: string; p_whatsapp: string; p_notes?: string; p_kind?: string };
        Returns: Database['public']['Tables']['appointments']['Row'];
      };
      reschedule_appointment: {
        Args: { p_id: string; p_date: string; p_start: string };
        Returns: Database['public']['Tables']['appointments']['Row'];
      };
      has_role: { Args: { _user_id: string; _role: 'admin' }; Returns: boolean };
      claim_admin: { Args: never; Returns: boolean };
    };
  };
};
