export type RevenuesReportTab = 'subscriptions' | 'rentals' | 'products';

export interface RevenuesReportFilters {
  date_from?: string;
  date_to?: string;
  tab?: RevenuesReportTab;
  page?: number;
  per_page?: number;
  top_limit?: number;
}

export interface RevenuesReportSummarySection {
  count: number;
  amount: number;
  change_percent: number;
}

export interface RevenuesTopItem {
  name: string;
  amount: number;
  count: number;
}

export interface RevenuesTopSection {
  total_amount: number;
  items: RevenuesTopItem[];
}

export interface RevenuesReportRowStatus {
  id: number;
  name: string;
  name_en: string;
  badge_class: string;
}

export interface RevenuesReportRow {
  id: number;
  serial_number: number;
  player_name: string;
  item_name: string;
  total: number;
  paid: number;
  remaining: number;
  start_date: string | null;
  end_date: string | null;
  created_at: string | null;
  status: RevenuesReportRowStatus;
}

export interface RevenuesReportPagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number | null;
  to: number | null;
}

export interface RevenuesReportPayload {
  filters: {
    date_from: string | null;
    date_to: string | null;
    tab: RevenuesReportTab;
    top_limit: number;
  };
  summary: {
    total_amount: number;
    subscriptions: RevenuesReportSummarySection;
    rentals: RevenuesReportSummarySection;
    products: RevenuesReportSummarySection;
  };
  top: {
    activities: RevenuesTopSection;
    facilities: RevenuesTopSection;
    products: RevenuesTopSection;
  };
  table: {
    active_tab: RevenuesReportTab;
    counts: {
      subscriptions: number;
      rentals: number;
      products: number;
    };
    rows: RevenuesReportRow[];
    pagination: RevenuesReportPagination;
  };
}

export const createEmptyRevenuesReportPayload = (): RevenuesReportPayload => ({
  filters: {
    date_from: null,
    date_to: null,
    tab: 'subscriptions',
    top_limit: 7,
  },
  summary: {
    total_amount: 0,
    subscriptions: {
      count: 0,
      amount: 0,
      change_percent: 0,
    },
    rentals: {
      count: 0,
      amount: 0,
      change_percent: 0,
    },
    products: {
      count: 0,
      amount: 0,
      change_percent: 0,
    },
  },
  top: {
    activities: {
      total_amount: 0,
      items: [],
    },
    facilities: {
      total_amount: 0,
      items: [],
    },
    products: {
      total_amount: 0,
      items: [],
    },
  },
  table: {
    active_tab: 'subscriptions',
    counts: {
      subscriptions: 0,
      rentals: 0,
      products: 0,
    },
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
});
