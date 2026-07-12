export interface ScheduleRow {
    id: number;
    schedule_id: number;
    day_schedule_ids?: Record<string, number>;
    day_current_capacities?: Record<string, number>;
    day_remaining_capacities?: Record<string, number>;
    day_attendance_marked_counts?: Record<string, number>;
    day_attendance_present_counts?: Record<string, number>;
    day_waiting_counts?: Record<string, number>;
    title: string | null;
    activity_name: string | null;
    activity_name_en: string | null;
    academy_sport_id: number;
    gender: 'male' | 'female' | 'mixed';
    days: string[]; // e.g. ['Mon', 'Thu']
    start_time: string; // 'HH:mm:ss'
    end_time: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    capacity: number;
    current_capacity: number;
    remaining_capacity: number;
    age_group_id: number | null;
    age_group_name: string | null;
    coach_id: number | null;
    coach_name: string;
    facility_id: number | null;
    facility_name: string | null;
    main_schedule_team_id: number | null;
}

export interface ScheduleListResponse {
    data: ScheduleRow[];
    total: number;
    page: number;
    page_size: number;
}

export interface ScheduleOption {
    id: number;
    name: string;
    name_en?: string;
    color?: string;
    slug?: string;
    abbr?: string;
    from?: number;
    to?: number;
    sport_id?: number;
    sport_ids?: number[];
}

export interface ScheduleOptions {
    academy_sports: ScheduleOption[];
    age_groups: ScheduleOption[];
    coaches: ScheduleOption[];
    facilities: ScheduleOption[];
    genders: ScheduleOption[];
    levels: ScheduleOption[];
    days: ScheduleOption[];
}

export interface ScheduleFilters {
    search?: string;
    gender?: string;
    academy_sport_id?: number;
    age_group_id?: number;
    day?: string | number;
    date?: string;        // single date (day view) — also used as day-of-week selector
    date_from?: string;   // range start (month / week view)
    date_to?: string;     // range end   (month / week view)
    page?: number;
    per_page?: number;
}

export interface SchedulePlayerRow {
    id: number;
    player_id: number | null;
    name: string | null;
    mobile: string | null;
    gender: string | null;
    dob: string | null;
}

export interface ScheduleDayDetailsResponse {
    schedule: ScheduleRow;
    players: SchedulePlayerRow[];
    players_count: number;
}
