export interface PlayersReportFilters {
    tab?: 'with' | 'without' | 'all';
    date_from?: string;
    date_to?: string;
    chart_period?: 'daily' | 'weekly' | 'monthly';
    activity?: string;
    status?: string;
    search?: string;
    top_limit?: number;
    page?: number;
    per_page?: number;
}

export interface PlayersReportStatus {
    key: string;
    label: string;
}

export interface PlayersReportRow {
    player_id: number;
    name: string;
    phone: string;
    activity_name: string;
    package_name: string;
    start_date: string | null;
    end_date: string | null;
    status: PlayersReportStatus;
}

export interface PlayersReportChartSeries {
    name: string;
    data: number[];
}

export interface PlayersReportChart {
    period: string;
    categories: string[];
    series: PlayersReportChartSeries[];
}

export interface RegularityPlayer {
    player_id: number;
    name: string;
    absences: number;
    sessions: number;
}

export interface PlayersReportPayload {
    filters: PlayersReportFilters & { page: number; per_page: number };
    summary: {
        total_players: number;
        subscribed_players: number;
        unsubscribed_players: number;
    };
    chart: PlayersReportChart;
    activities_chart: PlayersReportChart;
    top: {
        most_regular: RegularityPlayer[];
        least_regular: RegularityPlayer[];
    };
    tab_counts: {
        with: number;
        without: number;
    };
    table: {
        rows: PlayersReportRow[];
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

export const createEmptyPlayersReportPayload = (): PlayersReportPayload => ({
    filters: {
        tab: 'all',
        date_from: undefined,
        date_to: undefined,
        chart_period: 'monthly',
        activity: undefined,
        status: 'all',
        search: undefined,
        top_limit: 7,
        page: 1,
        per_page: 10,
    },
    summary: {
        total_players: 0,
        subscribed_players: 0,
        unsubscribed_players: 0,
    },
    chart: { period: 'monthly', categories: [], series: [{ name: '', data: [] }] },
    activities_chart: { period: 'monthly', categories: [], series: [{ name: '', data: [] }] },
    top: {
        most_regular: [],
        least_regular: [],
    },
    tab_counts: {
        with: 0,
        without: 0,
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
