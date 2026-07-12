export type BalancesReportTab = 'cash' | 'bank';

export interface BalancesReportFilters {
  date_from?: string;
  date_to?: string;
  tab?: BalancesReportTab;
  page?: number;
  per_page?: number;
}

export interface BalancesReportLabel {
  id: number;
  name: string;
  name_en: string;
}

export interface BalancesReportRow {
  id: number;
  amount: number;
  description: string;
  type: BalancesReportLabel;
  source: BalancesReportLabel;
  payment_method: BalancesReportLabel;
  created_at: string | null;
}

export interface BalancesReportPagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number | null;
  to: number | null;
}

export interface BalancesReportPayload {
  filters: {
    date_from: string | null;
    date_to: string | null;
    tab: BalancesReportTab;
  };
  summary: {
    cash_amount: number;
    bank_amount: number;
    total_amount: number;
    cash_change_percent: number;
    bank_change_percent: number;
  };
  table: {
    active_tab: BalancesReportTab;
    counts: {
      cash: number;
      bank: number;
    };
    rows: BalancesReportRow[];
    pagination: BalancesReportPagination;
  };
}

export interface BalanceTransferPayload {
  amount: number;
  from_treasury: BalancesReportTab;
  to_treasury: BalancesReportTab;
  notes?: string;
}

export interface BalanceTransferResponse {
  message: string;
  summary: {
    cash_amount: number;
    bank_amount: number;
    total_amount: number;
  };
}

export const createEmptyBalancesReportPayload = (): BalancesReportPayload => ({
  filters: {
    date_from: null,
    date_to: null,
    tab: 'cash',
  },
  summary: {
    cash_amount: 0,
    bank_amount: 0,
    total_amount: 0,
    cash_change_percent: 0,
    bank_change_percent: 0,
  },
  table: {
    active_tab: 'cash',
    counts: {
      cash: 0,
      bank: 0,
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
