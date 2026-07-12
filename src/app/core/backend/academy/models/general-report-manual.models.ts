export type GeneralReportRange =
  | 'today'
  | 'yesterday'
  | 'current_month'
  | 'this_week'
  | 'this_month'
  | 'last_month'
  | 'this_quarter'
  | 'this_year'
  | 'custom';

export type GeneralReportTab = 'subscriptions' | 'rentals' | 'products';

export interface GeneralReportFilters {
  range?: GeneralReportRange;
  date_from?: string;
  date_to?: string;
  tab?: GeneralReportTab;
  page?: number;
  per_page?: number;
}

export interface GeneralReportStatus {
  id: number;
  name: string;
  name_en: string;
  badge_class: string;
}

export interface GeneralReportRow {
  id: number;
  serial_number: number;
  receipt_number: string | null;
  payment_method: string;
  party_name: string;
  item_name: string;
  amount: number;
  total: number;
  paid: number;
  remaining: number;
  start_date: string | null;
  end_date: string | null;
  payment_date: string | null;
  status: GeneralReportStatus;
}

export interface GeneralReportPagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number | null;
  to: number | null;
}

export interface GeneralReportPayload {
  filters: {
    range: GeneralReportRange;
    date_from: string | null;
    date_to: string | null;
    tab: GeneralReportTab;
  };
  summary: {
    income_total: number;
    expenses_total: number;
    net_total: number;
    subscriptions: {
      count: number;
      amount: number;
    };
    rentals: {
      count: number;
      amount: number;
    };
    products: {
      count: number;
      amount: number;
    };
  };
  chart: {
    income: number;
    expenses: number;
  };
  table: {
    active_tab: GeneralReportTab;
    counts: {
      subscriptions: number;
      rentals: number;
      products: number;
    };
    rows: GeneralReportRow[];
    pagination: GeneralReportPagination;
  };
}

export const createEmptyGeneralReportPayload = (): GeneralReportPayload => ({
  filters: {
    range: 'today',
    date_from: null,
    date_to: null,
    tab: 'rentals',
  },
  summary: {
    income_total: 0,
    expenses_total: 0,
    net_total: 0,
    subscriptions: {
      count: 0,
      amount: 0,
    },
    rentals: {
      count: 0,
      amount: 0,
    },
    products: {
      count: 0,
      amount: 0,
    },
  },
  chart: {
    income: 0,
    expenses: 0,
  },
  table: {
    active_tab: 'rentals',
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
