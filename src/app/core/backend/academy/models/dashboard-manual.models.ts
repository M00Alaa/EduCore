export interface DashboardScopeInfo {
  main_academy_id: number;
  selected_branch_id: number | null;
  is_branch_context: boolean;
  selected_date: string | null;
  date_from?: string | null;
  date_to?: string | null;
}

export interface DashboardBranchOption {
  id: number;
  name: string;
  selected: boolean;
}

export interface DashboardBranchSubscribersItem {
  branch_id: number;
  branch_name: string;
  players_count: number;
}

export interface DashboardBranchSubscribers {
  total: number;
  branches: DashboardBranchSubscribersItem[];
}

export interface DashboardSubscriptionsChart {
  categories: string[];
  revenue: number[];
  subscriptions_count: number[];
}

export interface DashboardSubscriptionsSummary {
  total: number;
  active: number;
  expired: number;
  near_expiry: number;
  incomplete: number;
  stopped: number;
  refunded: number;
}

export interface DashboardActivitiesSummary {
  active: number;
  inactive: number;
}

export interface DashboardMessagesSummary {
  total: number;
  replied: number;
  unread: number;
  not_replied: number;
}

export interface DashboardDailyRevenueItem {
  date: string;
  amount: number;
}

export interface DashboardBreakdownRow {
  key?: string | null;
  label: string;
  amount: number;
  percentage: number;
}

export interface DashboardRevenueSummary {
  total: number;
  daily: DashboardDailyRevenueItem[];
  breakdown: DashboardBreakdownRow[];
}

export interface DashboardExpensesSummary {
  total: number;
  breakdown: DashboardBreakdownRow[];
}

export interface DashboardZatcaSummary {
  enabled: boolean;
}

export interface DashboardStatisticsResponse {
  scope: DashboardScopeInfo;
  branches: DashboardBranchOption[];
  zatca: DashboardZatcaSummary;
  subscribers: DashboardBranchSubscribers;
  subscriptions_chart: DashboardSubscriptionsChart;
  subscriptions: DashboardSubscriptionsSummary;
  activities: DashboardActivitiesSummary;
  messages: DashboardMessagesSummary;
  revenue: DashboardRevenueSummary;
  expenses: DashboardExpensesSummary;
}
