import { DeductionBeneficiaryType, DeductionType } from './deductions.model';

export interface DeductionsReportFilters {
  academy_id?: number | string;
  branch_id?: number | string;
  search?: string;
  date_from?: string;
  date_to?: string;
  type?: DeductionType;
  payment_status?: DeductionsPaymentStatus;
  package_id?: number | string;
  sport_id?: number | string;
  activity_id?: number | string;
  page?: number;
  per_page?: number;
  sort_by?: string;
  sort_direction?: 'asc' | 'desc';
}

export type DeductionsPaymentStatus = 'unpaid' | 'partially_paid' | 'paid';
export type DeductionsTreasuryId = 0 | 1;

export interface DeductionsReportTotals {
  total_amount: number;
  total_paid: number;
  remaining: number;
}

export interface DeductionsReportRow {
  id: number;
  academy_id: number;
  name: string;
  type: DeductionType;
  beneficiary_type: DeductionBeneficiaryType;
  coach_id?: number | null;
  coach_name?: string | null;
  external_beneficiary_name?: string | null;
  totals?: DeductionsReportTotals;
}

export interface DeductionsReportPagination {
  current_page: number;
  last_page?: number;
  per_page: number;
  total: number;
  from?: number | null;
  to?: number | null;
}

export interface DeductionsReportPayload {
  data: DeductionsReportRow[];
  meta?: DeductionsReportPagination;
  current_page?: number;
  per_page?: number;
  total?: number;
}

export interface DeductionPaymentPayload {
  amount: number;
  treasury_id: DeductionsTreasuryId;
  payment_date: string;
  notes?: string;
  receipt_number?: string;
}

export interface DeductionPaymentResponse {
  payment?: DeductionPaymentRow;
  remaining_amount: number;
}

export interface DeductionPaymentHistoryPayload {
  deduction: DeductionsReportRow;
  items: {
    data: DeductionPaymentRow[];
    meta?: DeductionsReportPagination;
  };
}

export interface DeductionPaymentRow {
  id: number;
  deduction_id: number;
  amount: number;
  treasury: {
    id: DeductionsTreasuryId;
    key: 'cash' | 'bank';
    name: string;
  };
  payment_date: string | null;
  notes?: string | null;
  created_by_name?: string | null;
  created_at?: string | null;
}

export const createEmptyDeductionsReportPayload = (): DeductionsReportPayload => ({
  data: [],
  meta: {
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
    from: null,
    to: null,
  },
});
