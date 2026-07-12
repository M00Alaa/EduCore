export interface FacilitiesReportFilters {
    date_from?: string;
    date_to?: string;
    /** Preferred: filter by the facility primary key. */
    facility_id?: number;
    /** Legacy: filter by facility name (kept for backward compatibility). */
    facility?: string;
    academy_id?: number | string;
    type?: string;
    status?: string;
    /** Filter by booking type: internal | external | training. */
    booking_type?: string;
    search?: string;
    chart_period?: string;
    top_limit?: number;
    page?: number;
    per_page?: number;
}

export interface FacilityStatus {
    key: string;
    label: string;
    class: string;
}

export interface FacilityRow {
    id: number;
    name: string;
    type: string;
    capacity: number;
    status: FacilityStatus;
    external_booking: boolean;
    bookings_count: number;
    revenue_amount: number;
}

export interface FacilitiesReportChartSeries {
    name: string;
    data: number[];
}

export interface FacilitiesReportChart {
    period: string;
    categories: string[];
    series: FacilitiesReportChartSeries[];
}

export interface BookingTypeDistributionItem {
    key: string;
    label: string;
    count: number;
    percentage: number;
}

export interface FacilitiesReportPayload {
    filters: FacilitiesReportFilters & { page: number; per_page: number };
    summary: {
        total_facilities: number;
        booked_facilities: number;
        available_facilities: number;
        total_revenue: number;
        peak_hour: { label: string | null, bookings_count: number };
        most_used_facility: {
            id: number | null;
            name: string | null;
            usage_count: number;
        };
        booking_type_distribution?: BookingTypeDistributionItem[];
    };
    charts: {
        revenue: FacilitiesReportChart;
        occupancy: FacilitiesReportChart;
        usage_split: {
            labels: string[];
            series: number[];
        };
        booking_type_distribution?: BookingTypeDistributionItem[];
    };
    table: {
        rows: FacilityRow[];
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
        facilities: Array<{ value: string; label: string }>;
        types: Array<{ value: string; label: string }>;
        statuses: Array<{ value: string; label: string }>;
        chart_periods: Array<{ value: string; label: string }>;
        booking_types?: Array<{ value: string; label: string }>;
    };
}

export const createEmptyFacilitiesReportPayload = (): FacilitiesReportPayload => ({
    filters: {
        date_from: undefined,
        date_to: undefined,
        facility: undefined,
        type: undefined,
        status: undefined,
        search: undefined,
        chart_period: 'monthly',
        top_limit: 7,
        page: 1,
        per_page: 10,
    },
    summary: {
        total_facilities: 0,
        booked_facilities: 0,
        available_facilities: 0,
        total_revenue: 0,
        peak_hour: { label: null, bookings_count: 0 },
        most_used_facility: {
            id: null,
            name: null,
            usage_count: 0,
        },
    },
    charts: {
        revenue: { period: 'monthly', categories: [], series: [{ name: '', data: [] }] },
        occupancy: { period: 'monthly', categories: [], series: [{ name: '', data: [] }] },
        usage_split: { labels: [], series: [] },
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
        facilities: [],
        types: [],
        statuses: [],
        chart_periods: [],
        booking_types: [],
    },
});
