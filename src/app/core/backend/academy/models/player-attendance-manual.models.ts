export interface MarkAttendancePayload {
  player_id: number;
  schedule_id: number;
  attend_date: string;       // YYYY-MM-DD
  attend_status?: 'present' | 'absent';
}

export interface SchedulePlayerAttendance {
  schedule_player_id: number;
  player_id: number;
  player_name: string;
  gender?: {
    id: number;
    key: string;
    name: string;
    name_ar?: string;
    name_en?: string;
  } | null;
  mobile: string;
  subscription: {
    id: number;
    detail_id: number;
    package_name: string;
    status: string;
    status_code: number;
    package_type: number;
    total_classes: number | null;
    remaining_classes: number | null;
    can_attend: boolean;
    attend_reason: string | null;
    requires_schedule_assignment?: boolean;
    required_days_per_week?: number | null;
    required_appointments_per_week?: number | null;
    weeks_in_period?: number | null;
    classes_total?: number | null;
    weekly_schedule_message?: string | null;
    schedule_assignment?: {
      subscription_id: number;
      detail_id: number;
    } | null;
  };
  attendance: {
    is_marked: boolean;
    attendance_id: number | null;
    attend_status: string | null;
    marked_at: string | null;
  };
  loading?: boolean;
}
