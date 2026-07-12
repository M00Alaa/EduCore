export type ExpensesReportTab = 'categories' | 'activities';

export interface ExpensesReportFilters {
  date_from?: string;
  date_to?: string;
  tab?: ExpensesReportTab;
  page?: number;
  per_page?: number;
  top_limit?: number;
}

export interface ExpensesReportSummarySection {
  count: number;
  amount: number;
  change_percent: number;
}

export interface ExpensesTopItem {
  name: string;
  amount: number;
  count: number;
  percent: number;
  color: string;
}

export interface ExpensesTopSection {
  total_amount: number;
  items: ExpensesTopItem[];
}

export interface ExpensesReportRowTreasury {
  id: number;
  key: 'cash' | 'bank';
  name: string;
  name_ar: string;
  name_en: string;
}

export interface ExpensesReportRow {
  id: number;
  receipt_number: string | null;
  statement: string;
  description: string;
  classification: string;
  treasury: ExpensesReportRowTreasury;
  amount: number;
  date_expenses: string | null;
  date_expenses_iso: string | null;
  created_at: string | null;
}

export interface ExpensesReportPagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number | null;
  to: number | null;
}

export interface ExpensesReportPayload {
  filters: {
    date_from: string | null;
    date_to: string | null;
    tab: ExpensesReportTab;
    top_limit: number;
  };
  summary: {
    total_amount: number;
    categories: ExpensesReportSummarySection;
    activities: ExpensesReportSummarySection;
  };
  top: {
    categories: ExpensesTopSection;
    activities: ExpensesTopSection;
  };
  table: {
    active_tab: ExpensesReportTab;
    counts: {
      categories: number;
      activities: number;
    };
    rows: ExpensesReportRow[];
    pagination: ExpensesReportPagination;
  };
}

export const createEmptyExpensesReportPayload = (): ExpensesReportPayload => ({
  filters: {
    date_from: null,
    date_to: null,
    tab: 'categories',
    top_limit: 7,
  },
  summary: {
    total_amount: 0,
    categories: {
      count: 0,
      amount: 0,
      change_percent: 0,
    },
    activities: {
      count: 0,
      amount: 0,
      change_percent: 0,
    },
  },
  top: {
    categories: {
      total_amount: 0,
      items: [],
    },
    activities: {
      total_amount: 0,
      items: [],
    },
  },
  table: {
    active_tab: 'categories',
    counts: {
      categories: 0,
      activities: 0,
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
