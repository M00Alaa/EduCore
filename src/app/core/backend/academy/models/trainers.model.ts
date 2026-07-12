export interface ApiEnvelope<T> {
    status: string;
    message?: string;
    data: T;
}

export interface ApiPaginationMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export interface ApiPaginationLinks {
    first?: string | null;
    last?: string | null;
    prev?: string | null;
    next?: string | null;
}

export interface ApiPaginatedPayload<T> {
    data: T[];
    links?: ApiPaginationLinks;
    meta?: Partial<ApiPaginationMeta>;
}

export interface PaginatedResult<T> {
    items: T[];
    meta: ApiPaginationMeta;
    links: ApiPaginationLinks;
}

export interface TrainerEntity {
    id: number;
    code?: string;
    name: string;
    password?: string | null;
    mobile?: string | null;
    email?: string | null;
    username?: string;
    gender?: 'male' | 'female';
    is_active?: boolean;
    activity?: boolean;
    reward_calculation_method?: 'session' | 'monthly' | 'hourly' | string;
    reward_value?: number;
    qualifications?: string | null;
    academic_achievements?: string | null;
    personal_achievements?: string | null;
    activities?: string | null;
    assigned_activities?: string[];
    sport_id?: number | null;
    sport_ids?: number[];
    activity_ids?: number[];
    activity_options?: Array<{ id: number; name: string }>;
    sport?: {
        id: number;
        name: string;
    } | null;
    attachments?: Array<{
        id: number;
        name?: string | null;
        type?: string | null;
        size?: number | null;
        url?: string | null;
    }>;
}

export interface TrainerPayload {
    name: string;
    mobile: string;
    email: string;
    username: string;
    password?: string;
    gender: 'male' | 'female';
    reward_calculation_method: string;
    reward_value: number;
    qualifications?: string | null;
    academic_achievements?: string | null;
    personal_achievements?: string | null;
    sport_id?: number | null;
    sport_ids?: number[];
    activity_ids?: number[];
    is_active?: boolean;
    activity?: boolean;
}

export interface TrainerLookups {
    sport_options?: Array<{ id: number; name: string }>;
    status_options?: Array<{ id: number; key: string; name: string }>;
    gender_options?: Array<{ id: number; key: string; name: string }>;
    reward_method_options?: Array<{ id: number; key: string; name: string }>;
}

export interface TrainerAttendanceDayRecord {
    id: number;
    status: 'present' | 'absent';
    hours?: number | null;
    comments?: string | null;
    check_in?: string | null;
    check_out?: string | null;
    duration?: string | null;
    can_check_out?: boolean;
    registration_method?: 'manual' | 'qr';
    registered_by?: string | null;
}

export interface TrainerAttendanceRow {
    id: number;
    name: string;
    mobile: string;
    sport?: string | null;
    days: Record<string, TrainerAttendanceDayRecord | null>;
}


export interface TrainerAttendanceResponse {
    trainers: TrainerAttendanceRow[];
    days: string[];
    date_from: string;
    date_to: string;
    total: number;
}

export interface TrainerAttendanceSummary {
    total_trainers: number;
    attended_today: number;
    pending_today: number;
    date: string;
}

export interface TrainerPendingItem {
    id: number;
    name: string;
    mobile: string;
}

export interface TrainerPendingResponse {
    pending: TrainerPendingItem[];
    attended: TrainerPendingItem[];
    date: string;
}
