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

export interface PlayerEntity {
    id: number;
    code: string;
    name: string;
    mobile?: string | null;
    guardian_name?: string | null;
    guardian_mobile?: string | null;
    team_name?: string | null;
    activity: boolean;
    status: {
        id: number;
        key: string;
        name: string;
    };
    guardian?: {
        id: number;
        name?: string | null;
        mobile?: string | null;
    } | null;
    team?: {
        id: number;
        slug?: string | null;
        name: string;
    } | null;
    teams?: Array<{
        id: number;
        slug?: string | null;
        name: string;
    }>;
    eligible_team_options?: Array<{
        id: number;
        key?: string | null;
        name: string;
    }>;
    profile?: {
        first_name?: string | null;
        middle_name?: string | null;
        last_name?: string | null;
        identification_number?: string | null;
        birth_date?: string | null;
        birth_place?: string | null;
        nationality?: string | null;
        address?: string | null;
        latitude?: number | null;
        longitude?: number | null;
        avatar_url?: string | null;
        gender?: {
            id: number;
            key: string;
            name: string;
        } | null;
        city?: {
            id: number;
            name: string;
        } | null;
        district?: {
            id: number;
            city_id: number;
            name: string;
        } | null;
        additional_info?: {
            national_id?: string | null;
            education_stage?: string | null;
            school_name?: string | null;
            additional_mobile?: string | null;
            previous_academy?: string | null;
            health_status?: {
                id: number;
                key: string;
                name: string;
            } | null;
            height?: number | null;
            weight?: number | null;
            body_status?: string | null;
            allergies?: string | null;
            medications?: string | null;
            chronic_diseases?: string | null;
            notes?: string | null;
        } | null;
    } | null;
}

export interface PlayerLookups {
    team_options: Array<{
        id: number;
        key: string;
        name: string;
        current_players_count?: number;
        capacity_limit?: number | null;
        gender?: {
            is_restricted?: boolean;
            has_mixed_schedule?: boolean;
            allowed_players?: Array<{
                id: number;
                key: string;
                name: string;
                name_ar?: string;
                name_en?: string;
            }>;
        };
    }>;
    status_options: Array<{ id: number; key: string; name: string }>;
    gender_options: Array<{ id: number; key: string; name: string }>;
    health_status_options: Array<{ id: number; key: string; name: string }>;
    education_stage_options: Array<{ key: string; name: string }>;
    city_options: Array<{ id: number; name: string }>;
    district_options: Array<{ id: number; city_id: number; name: string }>;
}

export interface PlayerTeamEntity {
    id: number;
    name: string;
    slug: string;
    sport?: {
        id: number;
        name: string;
    } | null;
    trainer?: {
        id: number;
        name: string;
    } | null;
    players_count: number;
    player_ids: number[];
    players: Array<{
        id: number;
        name: string;
        mobile?: string | null;
        gender?: {
            id: number;
            key: string;
            name: string;
            name_ar?: string;
            name_en?: string;
        } | null;
        parent_name?: string | null;
    }>;
    training_plan?: PlayerTeamTrainingPlanItem[];
    capacity?: {
        limit?: number | null;
        assigned_players?: number | null;
        remaining?: number | null;
        is_full?: boolean;
        is_exceeded?: boolean;
    };
    gender?: {
        is_restricted?: boolean;
        has_mixed_schedule?: boolean;
        allowed_players?: Array<{
            id: number;
            key: string;
            name: string;
            name_ar?: string;
            name_en?: string;
        }>;
        schedule_genders?: Array<{
            id: number;
            key: string;
            name: string;
            name_ar?: string;
            name_en?: string;
        }>;
    };
    academy_id?: number | null;
}

export interface PlayerTeamTrainingPlanItem {
    schedule_id: number;
    academy_sport_id?: number | null;
    day?: {
        id?: number;
        key?: string;
        abbr?: string;
        name?: string;
        name_ar?: string;
        name_en?: string;
    } | null;
    start_time?: string | null;
    end_time?: string | null;
    time?: string | null;
    gender?: {
        id?: number;
        key?: string;
        name?: string;
    } | null;
    level?: {
        id?: number;
        key?: string;
        name?: string;
    } | null;
    capacity?: number | null;
    age_group?: {
        id?: number;
        name?: string;
    } | null;
    coach?: {
        id?: number;
        name?: string;
    } | null;
    facility?: {
        id?: number;
        name?: string;
    } | null;
    sport?: {
        id?: number;
        name?: string;
    } | null;
}

export interface PlayerTeamLookups {
    sport_options: Array<{ id: number; name: string }>;
    trainer_options: Array<{ id: number; name: string }>;
    player_options: Array<{
        id: number;
        name: string;
        mobile?: string | null;
        parent_name?: string | null;
        gender?: {
            id: number;
            key: string;
            name: string;
            name_ar?: string;
            name_en?: string;
        } | null;
    }>;
}

export interface PlayerAppointmentEntity {
    id: number;
    date?: string | null;
    time?: string | null;
    start_time?: string | null;
    end_time?: string | null;
    type?: string | null;
    sport?: {
        id: number;
        name: string;
    } | null;
    team?: {
        id: number;
        name: string;
    } | null;
    attendance_status?: {
        key: string;
        name: string;
    } | null;
}

export interface PlayerAwardEntity {
    id: number;
    title?: string | null;
    description?: string | null;
    date?: string | null;
    type?: {
        id: number;
        key: string;
        name: string;
    } | null;
    tournament_name?: string | null;
    position?: string | null;
}

export interface PlayerAwardPayload {
    type?: number;
    title: string;
    description?: string | null;
    date?: string | null;
    tournament_name?: string | null;
    position?: string | null;
}

export interface PlayerTeamPayload {
    name: string;
    sport_id?: number | null;
    trainer_id?: number | null;
    player_ids?: number[];
}

export interface AssignPlayerToTeamPayload {
    team_id: number;
    join_date?: string | null;
}

export interface GuardianLookupResponse {
    exists: boolean;
    guardian?: {
        id: number;
        name: string;
        mobile: string;
    } | null;
}

export interface PlayerPayload {
    guardian: {
        id?: number | null;
        name: string;
        mobile: string;
        id_number?: string | null;
        id_type?: number | null;
        additional_mobile_1?: string | null;
        additional_mobile_2?: string | null;
    };
    player: {
        name: string;
        mobile: string;
        additional_mobile?: string | null;
        birth_date?: string | null;
        gender?: string | null;
        nationality?: string | null;
        birth_place?: string | null;
        identification_number?: string | null;
        city_id?: number | null;
        district_id?: number | null;
        latitude?: number | null;
        longitude?: number | null;
        address?: string | null;
        school_name?: string | null;
        education_stage?: string | null;
        health_status?: string | number | null;
        previous_academy?: string | null;
        height?: number | null;
        weight?: number | null;
        body_status?: string | null;
        allergies?: string | null;
        medications?: string | null;
        chronic_diseases?: string | null;
        notes?: string | null;
        image_binary?: string | null;
    };
    status?: 'active' | 'inactive' | string;
}

export interface PlayerViewModel {
    id: number;
    name: string;
    guardian_name: string;
    mobile: string;
    guardianMobile: string;
    team: string;
    appointments: string;
    trophies: string;
    activity: boolean;
    source: PlayerEntity;
}

export interface TeamPlayerView {
    id: number;
    name: string;
    mobile?: string | null;
    parent_name?: string | null;
    gender?: {
        id: number;
        key: string;
        name: string;
        name_ar?: string;
        name_en?: string;
    } | null;
}

export interface TeamViewModel {
    id: number;
    name: string;
    sport: string;
    coach: string;
    playersCount: number;
    playerIds: number[];
    source: PlayerTeamEntity;
}
