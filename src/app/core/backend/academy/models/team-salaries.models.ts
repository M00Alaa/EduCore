export type TeamSalaryTargetType = 'trainer' | 'staff';
export type TeamSalaryAdjustmentKind = 'addition' | 'deduction';
export type TeamSalaryHistoryEntryType = 'payment' | 'adjustment';
export type TeamSalaryHistoryActionKey =
  | 'salary_payment'
  | 'partial_payment'
  | 'salary_settlement'
  | 'bonus_addition'
  | 'deduction_addition';
export type TeamSalaryTreasuryId = 0 | 1;

export interface TeamSalaryPeriod {
  period_year: number;
  period_month: number;
  period_start: string;
  period_end: string;
  days_in_month: number;
  elapsed_days: number;
  accrual_ratio: number;
}

export interface TeamSalaryAmounts {
  base_due: number;
  additions: number;
  deductions: number;
  due: number;
  paid: number;
  remaining: number;
}

export interface TeamSalaryWorkDuration {
  days: number;
  hours: number | null;
  label: string | null;
}

export interface TeamSalaryReportRow {
  target_type: TeamSalaryTargetType;
  target_id: number;
  name: string;
  job_title: string | null;
  sport_id: number | null;
  sport_name: string | null;
  reward_calculation_method: string | null;
  reward_calculation_method_id: number | null;
  reward_value: number | null;
  monthly_reward: number | null;
  work_duration: TeamSalaryWorkDuration;
  amounts: TeamSalaryAmounts;
  can_pay: boolean;
  is_active: boolean;
}

export interface TeamSalaryStaffRow {
  id: number;
  academy_id: number;
  name: string;
  job_title: string | null;
  monthly_reward: number;
  is_active: boolean;
  created_at?: string | null;
  updated_at?: string | null;
  deleted_at?: string | null;
}

export interface TeamSalaryPaymentRow {
  id: number;
  academy_id: number;
  target_type: TeamSalaryTargetType;
  target_id: number;
  target_name: string | null;
  target_job_title: string | null;
  target_sport_name: string | null;
  amount: number;
  treasury_id: TeamSalaryTreasuryId;
  payment_date: string;
  period_year: number;
  period_month: number;
  notes: string | null;
  expense: {
    id: number;
    title: string;
    amount: number;
    receipt_number: string | null;
    date_expenses: string | null;
  } | null;
  created_by_name: string | null;
  created_at: string | null;
}

export interface TeamSalaryAdjustmentRow {
  id: number;
  academy_id: number;
  target_type: TeamSalaryTargetType;
  target_id: number;
  target_name: string | null;
  target_job_title: string | null;
  target_sport_name: string | null;
  kind: TeamSalaryAdjustmentKind;
  amount: number;
  reason: string | null;
  effective_date: string;
  period_year: number;
  period_month: number;
  created_by_name: string | null;
  created_at: string | null;
}

export interface TeamSalaryHistoryRow {
  id: number;
  academy_id: number;
  target_type: TeamSalaryTargetType;
  target_id: number;
  target_name: string | null;
  target_job_title: string | null;
  target_sport_name: string | null;
  entry_type: TeamSalaryHistoryEntryType;
  action_type_key: TeamSalaryHistoryActionKey;
  action_type_label: string;
  amount: number;
  reason: string | null;
  action_date: string | null;
  performed_at: string | null;
  performed_by_name: string | null;
  receipt_number: string | null;
  expense: {
    id: number;
    title: string;
    amount: number;
    receipt_number: string | null;
    date_expenses: string | null;
  } | null;
  remaining_after: number | null;
  period_year: number | null;
  period_month: number | null;
}

export interface TeamSalaryPaginated<T> {
  data: T[];
  current_page?: number;
  per_page?: number;
  total?: number;
  meta?: {
    current_page?: number;
    per_page?: number;
    total?: number;
  };
}

export interface TeamSalaryReportPayload {
  period: TeamSalaryPeriod | null;
  items: TeamSalaryPaginated<TeamSalaryReportRow>;
}

export interface TeamSalaryReportFilters {
  search?: string;
  target_type?: 'all' | TeamSalaryTargetType;
  target_id?: number;
  period_year?: number;
  period_month?: number;
  as_of_date?: string;
  is_active?: boolean;
  sort_by?: string;
  sort_direction?: string;
  page?: number;
  per_page?: number;
}

export interface TeamSalarySettlementFilters {
  search?: string;
  target_type?: TeamSalaryTargetType;
  target_id?: number;
  kind?: TeamSalaryAdjustmentKind;
  period_year?: number;
  period_month?: number;
  as_of_date?: string;
  date_from?: string;
  date_to?: string;
  page?: number;
  per_page?: number;
}

export interface TeamSalaryPaymentPayload {
  target_type: TeamSalaryTargetType;
  target_id: number;
  amount: number;
  treasury_id: TeamSalaryTreasuryId;
  payment_date: string;
  period_year?: number;
  period_month?: number;
  notes?: string | null;
  receipt_number?: string | null;
}

export interface TeamSalaryAdjustmentPayload {
  target_type: TeamSalaryTargetType;
  target_id: number;
  kind: TeamSalaryAdjustmentKind;
  amount: number;
  reason: string;
  effective_date?: string;
  period_year?: number;
  period_month?: number;
}

export interface TeamSalaryStaffPayload {
  name: string;
  job_title?: string | null;
  monthly_reward: number;
  is_active?: boolean;
}

export function emptyTeamSalaryReportPayload(): TeamSalaryReportPayload {
  return {
    period: null,
    items: { data: [] },
  };
}
