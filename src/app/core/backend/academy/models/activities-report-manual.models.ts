export interface ActivitiesReportFilters {
    date_from?: string;
    date_to?: string;
    type?: string;
    search?: string;
    top_limit?: number;
    page?: number;
    per_page?: number;
}

export interface ActivitiesReportType {
    key: string;
    label: string;
}

export interface ActivitiesReportRow {
    index: number;
    academy_sport_id: number;
    sport_id: number;
    activity_name: string;
    type: ActivitiesReportType;
    players_count: number;
    packages_count: number;
    events: string;
}

export interface ActivitiesReportChartSeries {
    name: string;
    data: number[];
}

export interface ActivitiesReportChart {
    categories: string[];
    series: ActivitiesReportChartSeries[];
}

export interface ActivitiesReportPayload {
    filters: ActivitiesReportFilters & { page: number; per_page: number };
    summary: {
        total_activities: number;
        total_packages: number;
        total_discounts: number;
    };
    chart: ActivitiesReportChart;
    table: {
        rows: ActivitiesReportRow[];
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
        types: Array<{ value: string; label: string }>;
        activities: Array<{ value: string; label: string }>;
    };
}

export const createEmptyActivitiesReportPayload = (): ActivitiesReportPayload => ({
    filters: {
        date_from: undefined,
        date_to: undefined,
        type: 'all',
        search: undefined,
        top_limit: 18,
        page: 1,
        per_page: 10,
    },
    summary: {
        total_activities: 0,
        total_packages: 0,
        total_discounts: 0,
    },
    chart: { categories: [], series: [{ name: '', data: [] }] },
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
        types: [],
        activities: [],
    },
});
