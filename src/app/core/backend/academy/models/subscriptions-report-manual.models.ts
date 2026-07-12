export type SubscriptionsChartPeriod = 'daily' | 'weekly' | 'monthly';

export type SubscriptionsStatusFilter = 'active' | 'renewed' | 'near_expiry' | 'expired' | 'refunded';

export interface SubscriptionsReportFilters {
  date_from?: string;
  date_to?: string;
  chart_period?: SubscriptionsChartPeriod;
  activity?: string;
  package?: string;
  status?: SubscriptionsStatusFilter;
  search?: string;
  page?: number;
  per_page?: number;
  top_limit?: number;
}

export interface SubscriptionsFilterOption {
  value: string;
  label: string;
}

export interface SubscriptionsReportStatus {
  key: string;
  label: string;
  badge_class: string;
}

export interface SubscriptionsReportRow {
  id: number;
  subscription_id: number;
  player_name: string;
  phone: string;
  package_name: string;
  total_sessions: number;
  attended_sessions: number;
  remaining_sessions: number;
  paid: number;
  remaining: number;
  start_date: string | null;
  end_date: string | null;
  created_at: string | null;
  status: SubscriptionsReportStatus;
}

export interface SubscriptionsReportPagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number | null;
  to: number | null;
}

export interface SubscriptionsReportPayload {
  filters: {
    date_from: string | null;
    date_to: string | null;
    chart_period: SubscriptionsChartPeriod;
    activity: string | null;
    package: string | null;
    status: SubscriptionsStatusFilter | null;
    search: string | null;
    top_limit: number;
  };
  summary: {
    total: number;
    active: number;
    renewed: number;
    near_expiry: number;
    expired: number;
    refunded: number;
  };
  top: {
    activities: Array<{
      name: string;
      count: number;
    }>;
    packages: Array<{
      name: string;
      count: number;
    }>;
  };
  chart: {
    period: SubscriptionsChartPeriod;
    categories: string[];
    series: number[];
  };
  table: {
    rows: SubscriptionsReportRow[];
    pagination: SubscriptionsReportPagination;
  };
  options: {
    activities: SubscriptionsFilterOption[];
    packages: SubscriptionsFilterOption[];
    statuses: SubscriptionsFilterOption[];
  };
}

export const createEmptySubscriptionsReportPayload = (): SubscriptionsReportPayload => ({
  filters: {
    date_from: null,
    date_to: null,
    chart_period: 'monthly',
    activity: null,
    package: null,
    status: null,
    search: null,
    top_limit: 7,
  },
  summary: {
    total: 0,
    active: 0,
    renewed: 0,
    near_expiry: 0,
    expired: 0,
    refunded: 0,
  },
  top: {
    activities: [],
    packages: [],
  },
  chart: {
    period: 'monthly',
    categories: [],
    series: [],
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
    packages: [],
    statuses: [
      { value: 'active', label: 'نشطة' },
      { value: 'renewed', label: 'مجددة' },
      { value: 'near_expiry', label: 'قرب الانتهاء' },
      { value: 'expired', label: 'منتهية' },
      { value: 'refunded', label: 'مستردة' },
    ],
  },
});
