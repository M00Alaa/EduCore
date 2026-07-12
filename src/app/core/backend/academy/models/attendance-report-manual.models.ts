export interface AttendanceReportFilters {
    date_from?: string;
    date_to?: string;
    academy_id?: number | string;
    activity?: string;
    status?: string;
    search?: string;
    top_limit?: number;
    page?: number;
    per_page?: number;
}

export interface AttendanceReportStatus {
    key: string;
    label: string;
    class: string;
}

export interface AttendanceReportRow {
    player_id: number;
    player_name: string;
    activity_name: string;
    total_sessions: number;
    attended: number;
    absent: number;
    attendance_rate: number;
    last_attendance: string | null;
    status: AttendanceReportStatus;
}

export interface AttendanceReportChartSeries {
    name: string;
    data: number[];
}

export interface AttendanceReportChart {
    labels: string[];
    series: number[];
}

export interface AttendanceReportStackedChart {
    categories: string[];
    series: AttendanceReportChartSeries[];
}

export interface AttendanceReportPayload {
    filters: AttendanceReportFilters & { page: number; per_page: number };
    summary: {
        total_attendance: number;
        total_absent: number;
        attendance_rate: number;
        first_timers: number;
        irregular_players: number;
    };
    charts: {
        donut: AttendanceReportChart;
        stacked: AttendanceReportStackedChart;
    };
    table: {
        rows: AttendanceReportRow[];
        pagination: {
            current_page: number;
            last_page: number;
            per_page: number;
            total: number;
            from: number | null;
            to: number | null;
        };
    };
    options?: {
        activities: Array<{ value: string; label: string }>;
        statuses: Array<{ value: string; label: string }>;
    };
}

export const createEmptyAttendanceReportPayload = (): AttendanceReportPayload => ({
    filters: {
        date_from: undefined,
        date_to: undefined,
        activity: undefined,
        status: 'all',
        search: undefined,
        top_limit: 18,
        page: 1,
        per_page: 10,
    },
    summary: {
        total_attendance: 0,
        total_absent: 0,
        attendance_rate: 0,
        first_timers: 0,
        irregular_players: 0,
    },
    charts: {
        donut: { labels: [], series: [] },
        stacked: { categories: [], series: [{ name: '', data: [] }] },
    },
    table: {
        rows: [],
        pagination: {
            current_page: 1,
            last_page: 1,
            per_page: 10,
            total: 0,
            from: null,
            to: null,
        },
    },
    options: {
        activities: [],
        statuses: [],
    },
});
